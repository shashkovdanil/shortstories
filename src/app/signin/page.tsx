'use client'

import SigninForm from '@/components/signin-form'
import { useSearchParams } from 'next/navigation'

function SigninPage() {
  const searchParams = useSearchParams()

  return (
    <>
      <header />
      <main className="grid place-items-center">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,380px))]">
          <SigninForm returnUrl={searchParams.get('returnUrl')} />
        </div>
      </main>
      <footer />
    </>
  )
}

export default SigninPage
