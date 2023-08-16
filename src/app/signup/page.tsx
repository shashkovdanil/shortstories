'use client'

import { CenterWrapper } from '@/components'
import SignupForm from '@/components/signup-form'
import { SEND_MAGIC_LINK_MUTATION } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'

function SignupPage() {
  const [send] = useMutation(SEND_MAGIC_LINK_MUTATION, {
    context: {
      headers: {
        'X-Last-Magic-Sent': new Date().getTime(),
      },
    },
  })

  return (
    <CenterWrapper>
      <SignupForm />
      <button
        onClick={() => {
          send({
            variables: {
              email: 'shashkovdanil@gmail.com',
            },
          })
        }}
        type="button"
      >
        Sign in with magic link
      </button>
    </CenterWrapper>
  )
}

export default SignupPage
