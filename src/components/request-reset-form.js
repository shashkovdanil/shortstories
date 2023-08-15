import {
  CHECK_USER_EXIST_MUTATION,
  REQUEST_RESET_MUTATION,
} from '@/graphql/mutations'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Form } from 'react-final-form'

import { Button, ErrorMessage, Input, Logo } from '.'
import { login } from '../lib/validators'
import DebouncingValidatingField from './debouncing-validating-field'
import authFormStyles from './styles/auth-form.module.css'
import styles from './styles/request-reset-form.module.css'

function RequestResetForm() {
  const [email, setEmail] = useState('')
  const router = useRouter()

  const [requestReset, { error, loading }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      fetchPolicy: 'no-cache',
    },
  )
  const [checkUserExists] = useMutation(CHECK_USER_EXIST_MUTATION, {
    fetchPolicy: 'no-cache',
  })

  return (
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
              router.back()
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
              <DebouncingValidatingField
                name="login"
                validate={value => login(value, checkUserExists)}
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
              <div className={authFormStyles['button-wrapper']}>
                <Button className={styles['back-button']} onClick={router.back}>
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
  )
}

export default RequestResetForm
