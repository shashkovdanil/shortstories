import slugify from '@sindresorhus/slugify'
import cn from 'classnames'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import { useRouter } from 'next/navigation'
import React from 'react'

import { getPhoto } from '../lib/helpers'
import styles from './styles/user-with-date.module.css'

function UserWithDate({ className = '', date, user }) {
  const router = useRouter()

  return (
    <div
      onClick={event => {
        event.stopPropagation()
        router.push(`/users/${user.id}`, {
          scroll: false,
        })
      }}
      className={cn('author', styles.wrapper, className)}
      role="link"
      tabIndex={-1}
    >
      <img
        alt={user.username}
        className={styles.avatar}
        src={getPhoto(user.photo)}
      />
      <div className={styles['name-with-date']}>
        <span className={styles.name}>{user.username}</span>
        <span className={styles.date}>
          {format(new Date(date), 'MMM d, yyyy', { locale: ru })}
        </span>
      </div>
    </div>
  )
}

export default UserWithDate
