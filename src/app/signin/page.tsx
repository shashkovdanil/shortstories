'use client'

import { CenterWrapper } from '@/components'
import SigninForm from '@/components/signin-form'
import { useSearchParams } from 'next/navigation'

function SigninPage() {
  const searchParams = useSearchParams()

  return (
    <CenterWrapper>
      <SigninForm returnUrl={searchParams.get('returnUrl')} />
    </CenterWrapper>
  )
}

export default SigninPage
