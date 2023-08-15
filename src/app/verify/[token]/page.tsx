'use client'

import { CenterWrapper } from '@/components'
import Verify from '@/components/verify'

export default function VerifyPage({ params }: { params: { token: string } }) {
  return (
    <CenterWrapper>
      <Verify token={params.token} />
    </CenterWrapper>
  )
}
