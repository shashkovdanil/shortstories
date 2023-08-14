import slugify from '@sindresorhus/slugify'
import cn from 'classnames'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import Router from 'next/router'
import React from 'react'

import { getPhoto } from '../lib/helpers'
import styles from './styles/user-with-date.css'

function routeToUserPage(event, user) {
  event.stopPropagation()
  Router.push(
    `/user?id=${user.id}`,
    `/user/${user.id}-${slugify(user.username)}`,
  ).then(() => {
    window.scrollTo(0, 0)
  })
}

function UserWithDate({ className = '', date, user }) {
  return (
    <div
      onClick={event => {
        routeToUserPage(event, user)
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
