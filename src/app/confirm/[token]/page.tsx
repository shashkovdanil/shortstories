'use client'

import { ErrorMessage } from '@/components'
import { MAGIC_LINK_MUTATION_AUTH } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ConfirmPage({ params }: { params: { token: string } }) {
  const router = useRouter()

  const [auth, { error }] = useMutation(MAGIC_LINK_MUTATION_AUTH, {
    onCompleted: () => {
      router.replace('/')
    },
    variables: {
      token: params.token,
    },
  })

  useEffect(() => {
    auth()
  }, [])

  if (error) {
    return (
      <div>
        <ErrorMessage error={error} />
        <Link href="/signin">Go to Sign In</Link>
      </div>
    )
  }

  return <p className="text-3xl font-bold">Verification...</p>
}
