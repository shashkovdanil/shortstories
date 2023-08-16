import { SEND_MAGIC_LINK_MUTATION } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'
import { valibotResolver } from '@hookform/resolvers/valibot'
import cn from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { email, object, string } from 'valibot'

import { Button, ErrorMessage, Input, Logo } from '.'
import authFormStyles from './styles/auth-form.module.css'
import styles from './styles/signin-form.module.css'

type Props = {
  returnUrl?: string
}

const schema = object({
  email: string('Email is required', [email('Email is invalid')]),
})

function SigninForm({ returnUrl }: Props) {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    resolver: valibotResolver(schema),
  })

  const [send, { error, loading }] = useMutation(SEND_MAGIC_LINK_MUTATION, {
    onCompleted: () => {
      if (returnUrl) {
        router.replace(`/${returnUrl}`)
        return
      }
    },
  })
  const router = useRouter()

  const onSubmit = handleSubmit(({ email }: typeof schema.types.output) => {
    send({
      variables: {
        email,
      },
    })
  })

  return (
    <form className={cn(authFormStyles.form)} noValidate onSubmit={onSubmit}>
      <button
        onClick={() => {
          router.back()
        }}
        className={authFormStyles.back}
        type="button"
      >
        <Image
          alt="Back"
          height={28}
          src="/images/icons/left-arrow.svg"
          width={28}
        />
      </button>
      <Logo />
      <ErrorMessage error={error} />
      <Input
        {...register('email')}
        error={errors.email?.message}
        inputmode="email"
        label="E-mail"
        name="email"
        rootClassName={styles.login}
        type="email"
      />
      <div className={authFormStyles['button-with-error']}>
        <Button black loading={loading} type="submit">
          Send magic link
        </Button>
      </div>
    </form>
  )
}

export default SigninForm
