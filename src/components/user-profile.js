import React from 'react'

import { BigLoader, ErrorMessage, ListStories } from '.'
import styles from './styles/user-profile.module.css'
import { UserInfo } from './user-info'

function UserProfile({ error, fetchMore, loading, me, stories, user }) {
  if (error) return <ErrorMessage error={error} />
  if (loading) return <BigLoader />
  return (
    <div>
      <div className={styles.wrapper} style={{ backgroundColor: '#fcfcfc' }}>
        <UserInfo user={user} />
      </div>
      {!stories.edges.length ? (
        <p className={styles['no-stories']}>Нет рассказов</p>
      ) : (
        <ListStories me={me} {...stories} fetchMore={fetchMore} />
      )}
    </div>
  )
}

export default UserProfile
