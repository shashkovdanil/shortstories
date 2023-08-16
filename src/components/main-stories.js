import React from 'react'

import BigLoader from './big-loader'
import ErrorMessage from './error-message'
import ListStories from './list-stories'
import styles from './styles/main-stories.module.css'

function MainStories({ error, fetchMore, loading, me, stories }) {
  if (loading) return <BigLoader />
  if (error) return <ErrorMessage error={error} />
  if (!stories?.edges?.length)
    return (
      <div>
        <h2 className={styles['no-stories']}>Нет рассказов :(</h2>
      </div>
    )
  return <ListStories {...stories} fetchMore={fetchMore} me={me} />
}

export default MainStories
