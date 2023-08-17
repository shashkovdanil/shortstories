import { SEND_MAGIC_LINK_MUTATION } from '@/graphql/mutations'
import { Button } from '@/newComponents/Button'
import { Input } from '@/newComponents/Input'
import { Logo } from '@/newComponents/Logo'
import { useMutation } from '@apollo/client'
import { valibotResolver } from '@hookform/resolvers/valibot'
import cn from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { email, object, string } from 'valibot'

import { ErrorMessage } from '.'
import authFormStyles from './styles/auth-form.module.css'

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
  } = useForm<typeof schema.types.output>({
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
    <div className={cn(authFormStyles.form)}>
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
      <div className="mb-8 flex justify-center">
        <Logo />
      </div>
      <ErrorMessage error={error} />
      <form noValidate onSubmit={onSubmit}>
        <Input
          {...register('email')}
          validation={{
            error: errors.email?.message,
          }}
          id="email"
          inputMode="email"
          label="Email"
          placeholder="example@mail.com"
          type="email"
        />
        <Button full loading={loading} type="submit">
          Send magic link
        </Button>
      </form>
    </div>
  )
}

export default SigninForm
