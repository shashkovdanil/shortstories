import { meFragment } from '@/graphql/fragments'
import {
  CHECK_USER_EXIST_MUTATION,
  SIGN_IN_MUTATION,
} from '@/graphql/mutations'
import { useMutation } from '@apollo/client'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react'
import { Field, Form } from 'react-final-form'

import { Button, ErrorMessage, Input, Logo } from '.'
import { login, password } from '../lib/validators'
import DebouncingValidatingField from './debouncing-validating-field'
import authFormStyles from './styles/auth-form.module.css'
import styles from './styles/signin-form.module.css'

function SigninForm({ returnUrl }) {
  const [signIn, { error, loading }] = useMutation(SIGN_IN_MUTATION, {
    update: (cache, mutationResult) => {
      cache.writeFragment({
        data: mutationResult.data.signIn,
        fragment: meFragment,
        id: 'Me',
      })
    },
  })
  const [checkUserExists] = useMutation(CHECK_USER_EXIST_MUTATION, {
    fetchPolicy: 'no-cache',
  })

  return (
    <Form
      onSubmit={values => {
        signIn({ variables: { ...values } }).then(() => {
          if (returnUrl) {
            Router.replace(`/${returnUrl}`)
            return
          }
          Router.push('/')
        })
      }}
      render={({ handleSubmit }) => (
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
                rootClassName={styles.password}
                type="password"
              />
            )}
          </Field>
          <div className={authFormStyles['button-with-error']}>
            <Button black loading={loading} type="submit">
              Войти
            </Button>
          </div>
          <Link href="/request-reset">
            <a className={authFormStyles['forgotten-link']}>Забыли пароль?</a>
          </Link>
          <p className={authFormStyles['signup-link']}>
            Нет аккаунта?{' '}
            <Link href="/signup">
              <a>Зарегистрируйте</a>
            </Link>
            .
          </p>
        </form>
      )}
    />
  )
}

export default SigninForm
