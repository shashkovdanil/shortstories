'use client'

import { CenterWrapper } from '@/components'
import ResetForm from '@/components/reset-form'

function ResetPage({ params }: { params: { token: string } }) {
  return (
    <CenterWrapper>
      <ResetForm token={params.token} />
    </CenterWrapper>
  )
}

export default ResetPage
