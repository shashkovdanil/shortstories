import { meFragment } from '@/graphql/fragments'
import {
  CHECK_USER_EXIST_MUTATION,
  SIGN_IN_MUTATION,
} from '@/graphql/mutations'
import { isEmpty } from '@/lib/validators'
import { useMutation } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Field, Form } from 'react-final-form'

import { Button, ErrorMessage, Input, Logo } from './'
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
  const router = useRouter()

  return (
    <Form
      onSubmit={values => {
        signIn({ variables: { ...values } }).then(() => {
          if (returnUrl) {
            router.replace(`/${returnUrl}`)
            return
          }
          router.push('/')
        })
      }}
      render={({ handleSubmit }) => (
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
          <Field
            name="login"
            validate={value => isEmpty(value, "Can't be empty")}
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
          </Field>
          <Field
            name="password"
            validate={value => isEmpty(value, "Can't be empty")}
          >
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
          <Link
            className={authFormStyles['forgotten-link']}
            href="/request-reset"
          >
            Забыли пароль?
          </Link>
          <p className={authFormStyles['signup-link']}>
            Нет аккаунта? <Link href="/signup">Зарегистрируйте</Link>.
          </p>
        </form>
      )}
    />
  )
}

export default SigninForm
