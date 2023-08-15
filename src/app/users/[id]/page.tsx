'use client'

import { Wrapper } from '@/components'
import UserProfile from '@/components/user-profile'
import { USER_QUERY } from '@/graphql/queries'
import styles from '@/styles/pages/user.module.css'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import React from 'react'

function User({ params }: { params: { id: string } }) {
  const { data, error, fetchMore } = useSuspenseQuery(USER_QUERY, {
    variables: {
      id: +params.id,
    },
  })

  return (
    <Wrapper innerClassName={styles.wrapper} me={data.me}>
      <UserProfile
        error={error}
        fetchMore={fetchMore}
        loading={false}
        me={data.me}
        stories={data.stories}
        user={data.user}
      />
    </Wrapper>
  )
}

export default User
