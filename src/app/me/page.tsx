'use client'

import { Wrapper } from '@/components'
import MeInfo from '@/components/me-info'
import { CHECK_LOGGED_IN_QUERY, ME_QUERY } from '@/graphql/queries'
import styles from '@/styles/pages/me.module.css'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { redirect } from 'next/navigation'
import 'react-image-crop/dist/ReactCrop.css'

export default function MePage() {
  const {
    data: { me },
  } = useSuspenseQuery(CHECK_LOGGED_IN_QUERY)

  console.log(me?.id)
  const { data, error, fetchMore } = useSuspenseQuery(ME_QUERY, {
    skip: !me,
    variables: { userId: me?.id },
  })

  if (!me) {
    redirect('/signin?return=me')
  }

  if (!data) return null

  console.log(data)

  return (
    <Wrapper innerClassName={styles.wrapper} me={data.me}>
      <MeInfo
        data={data}
        error={error}
        fetchMore={fetchMore}
        loading={false}
        me={data.me}
      />
    </Wrapper>
  )
}
