import { meFragment } from '@/graphql/fragments'
import { SIGN_OUT_MUTATION } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import React from 'react'

function Signout() {
  const router = useRouter()
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    update: cache => {
      cache.writeFragment({
        data: null,
        fragment: meFragment,
        id: 'Me',
      })
    },
  })

  return (
    <button
      onClick={() => {
        signout()
        router.push('/signin')
      }}
      type="button"
    >
      Выход
    </button>
  )
}

export default Signout
