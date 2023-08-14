import Router from 'next/router'
import React from 'react'
import { Mutation } from 'react-apollo'
import { Field, Form } from 'react-final-form'

import { Button, ErrorMessage, Input, Logo } from '.'
import { meFragment } from '../lib/fragments'
import { RESET_PASSWORD_MUTATION } from '../lib/mutations'
import { confirmationPassword, password } from '../lib/validators'
import authFormStyles from './styles/auth-form.css'
import styles from './styles/reset-form.css'

function ResetPasswordForm({ token }) {
  return (
    <Mutation
      update={(cache, mutationResult) => {
        cache.writeFragment({
          data: mutationResult.data.resetPassword,
          fragment: meFragment,
          id: 'Me',
        })
      }}
      mutation={RESET_PASSWORD_MUTATION}
    >
      {(reset, { error, loading }) => (
        <Form
          onSubmit={async values => {
            await reset({ variables: { ...values, token } })
            Router.push('/')
          }}
          render={({ handleSubmit, submitting, values }) => (
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
              <Field name="password" validate={password}>
                {({ input, meta }) => (
                  <Input
                    {...input}
                    error={meta.error && meta.touched && meta.error}
                    label="Пароль"
                    name="password"
                    rootClassName={styles.password}
                    type="password"
                  />
                )}
              </Field>
              <Field
                name="passwordConfirmation"
                validate={value => confirmationPassword(value, values.password)}
              >
                {({ input, meta }) => (
                  <Input
                    {...input}
                    error={meta.error && meta.touched && meta.error}
                    label="Подтвердите пароль"
                    name="passwordConfirmation"
                    rootClassName={styles['with-margin']}
                    type="password"
                  />
                )}
              </Field>
              <div className={authFormStyles['button-with-error']}>
                <Button
                  black
                  disabled={submitting}
                  loading={loading}
                  type="submit"
                >
                  Сбросить
                </Button>
              </div>
            </form>
          )}
        />
      )}
    </Mutation>
  )
}

export default ResetPasswordForm