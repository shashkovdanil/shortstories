import Router from 'next/router'
import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { Form } from 'react-final-form'

import { Button, ErrorMessage, Input, Logo } from '.'
import {
  CHECK_USER_EXIST_MUTATION,
  REQUEST_RESET_MUTATION,
} from '../lib/mutations'
import { login } from '../lib/validators'
import DebouncingValidatingField from './debouncing-validating-field'
import authFormStyles from './styles/auth-form.module.css'
import styles from './styles/request-reset-form.module.css'

function RequestResetForm() {
  const [email, setEmail] = useState('')

  return (
    <Mutation fetchPolicy="no-cache" mutation={REQUEST_RESET_MUTATION}>
      {(requestReset, { error, loading }) => (
        <Form
          onSubmit={async values => {
            const { data } = await requestReset({
              variables: { ...values },
            })
            setEmail(data.requestReset.email)
          }}
          render={({ handleSubmit, submitting }) => (
            <form className={authFormStyles.form} onSubmit={handleSubmit}>
              <button
                onClick={() => {
                  Router.back()
                }}
                className={authFormStyles.back}
                type="button"
              >
                <img alt="Назад" src="/images/icons/left-arrow.svg" />
              </button>
              <Logo />
              <ErrorMessage error={error} />
              {email ? (
                <div className={authFormStyles['success-message']}>
                  <h3>Запрос отправлен</h3>
                  <p>
                    Проверьте письмо по&nbsp;адресу <span>{email}</span>{' '}
                    и&nbsp;сбросьте пароль.
                  </p>
                </div>
              ) : (
                <>
                  <Mutation
                    fetchPolicy="no-cache"
                    mutation={CHECK_USER_EXIST_MUTATION}
                  >
                    {checkUserExist => (
                      <DebouncingValidatingField
                        name="login"
                        validate={value => login(value, checkUserExist)}
                      >
                        {({ input, meta }) => (
                          <Input
                            {...input}
                            error={meta.error && meta.touched && meta.error}
                            label="Логин"
                            name="login"
                            rootClassName={styles.login}
                            type="text"
                          />
                        )}
                      </DebouncingValidatingField>
                    )}
                  </Mutation>

                  <div className={authFormStyles['button-wrapper']}>
                    <Button
                      className={styles['back-button']}
                      onClick={Router.back}
                    >
                      Назад
                    </Button>
                    <Button
                      black
                      disabled={submitting}
                      loading={loading}
                      type="submit"
                    >
                      Восстановить
                    </Button>
                  </div>
                </>
              )}
            </form>
          )}
        />
      )}
    </Mutation>
  )
}

export default RequestResetForm
