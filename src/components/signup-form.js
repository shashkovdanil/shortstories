import Link from 'next/link'
import Router from 'next/router'
import React from 'react'
import { adopt } from 'react-adopt'
import { Mutation } from 'react-apollo'
import { Field, Form } from 'react-final-form'

import { Button, ErrorMessage, Input, Logo } from '.'
import {
  CHECK_USER_EXIST_MUTATION,
  SIGN_UP_MUTATION,
} from '../../src/lib/mutations'
import {
  confirmationPassword,
  isEmail,
  password,
  username,
} from '../../src/lib/validators'
import { meFragment } from '../lib/fragments'
import DebouncingValidatingField from './debouncing-validating-field'
import authFormStyles from './styles/auth-form.css'
import styles from './styles/signup-form.css'

const Composed = adopt({
  checkUserExistMutation: ({ render }) => (
    <Mutation fetchPolicy="no-cache" mutation={CHECK_USER_EXIST_MUTATION}>
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  ),
  signUpMutation: ({ render }) => (
    <Mutation
      update={(cache, mutationResult) => {
        cache.writeFragment({
          data: mutationResult.data.signUp,
          fragment: meFragment,
          id: 'Me',
        })
      }}
      mutation={SIGN_UP_MUTATION}
    >
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  ),
})

function SignupForm() {
  return (
    <Composed>
      {({ checkUserExistMutation, signUpMutation }) => (
        <Form
          onSubmit={async values => {
            await signUpMutation.mutation({ variables: { ...values } })
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
              <ErrorMessage error={signUpMutation.result.error} />
              <DebouncingValidatingField
                validate={value =>
                  username(value, checkUserExistMutation.mutation)
                }
                name="username"
              >
                {({ input, meta }) => (
                  <Input
                    {...input}
                    error={meta.error && meta.touched && meta.error}
                    label="Псевдоним"
                    name="username"
                    rootClassName={styles.username}
                    type="text"
                  />
                )}
              </DebouncingValidatingField>
              <DebouncingValidatingField
                validate={value =>
                  isEmail(value, checkUserExistMutation.mutation)
                }
                name="email"
              >
                {({ input, meta }) => (
                  <Input
                    {...input}
                    error={meta.error && meta.touched && meta.error}
                    label="E-mail"
                    name="email"
                    rootClassName={styles['with-margin']}
                    type="email"
                  />
                )}
              </DebouncingValidatingField>
              <Field name="password" validate={password}>
                {({ input, meta }) => (
                  <Input
                    {...input}
                    error={meta.error && meta.touched && meta.error}
                    label="Пароль"
                    name="password"
                    rootClassName={styles['with-margin']}
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
                  loading={signUpMutation.result.loading}
                  type="submit"
                >
                  Зарегистрироваться
                </Button>
              </div>
              <p className={authFormStyles['signup-link']}>
                Уже есть аккаунт?{' '}
                <Link href="/signin">
                  <a>Войдите</a>
                </Link>
                .
              </p>
            </form>
          )}
        />
      )}
    </Composed>
  )
}

export default SignupForm
