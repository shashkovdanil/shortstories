import React, { useState } from 'react'

import { BigLoader, ErrorMessage, ListStories } from '.'
import styles from './styles/me-info.module.css'
import { AccountEdit, AccountInfo } from './user-info'

function MeInfo({ data, error, fetchMore, loading, me }) {
  const [tab, setTab] = useState('written')
  const [isEdit, setEdit] = useState(false)
  const stories = tab === 'written' ? data.writtenStories : data.favStories

  function renderStories(stories) {
    return !stories.edges.length ? (
      <p className={styles['no-stories']}>Нет рассказов</p>
    ) : (
      <ListStories
        {...stories}
        fetchMore={fetchMore}
        me={me}
        userId={tab === 'written' ? me.id : null}
      />
    )
  }

  if (loading) return <BigLoader />
  if (error) return <ErrorMessage error={error} />

  return (
    <>
      <div className={styles.wrapper}>
        {isEdit ? (
          <AccountEdit me={me} setEdit={setEdit} />
        ) : (
          <AccountInfo me={me} setEdit={setEdit} />
        )}
      </div>
      <div className={styles.tabs}>
        <button
          onClick={() => {
            setTab('written')
          }}
          className={tab === 'written' ? styles.active : ''}
          role="tab"
          type="button"
        >
          Написанные
        </button>
        <button
          onClick={() => {
            setTab('favs')
          }}
          className={tab === 'favs' ? styles.active : ''}
          role="tab"
          type="button"
        >
          Понравившиеся
        </button>
      </div>
      {renderStories(stories)}
    </>
  )
}

export default MeInfo
