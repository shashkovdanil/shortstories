import { DELETE_STORY_MUTATION } from '@/graphql/mutations'
import { USER_QUERY } from '@/graphql/queries'
import { useMutation } from '@apollo/client'
import slugify from '@sindresorhus/slugify'
import cn from 'classnames'
import Router from 'next/router'
import React from 'react'
import readingTime from 'reading-time'

import styles from './styles/item-stories.css'
import UserWithDate from './user-with-date'

function getLength(l) {
  if (l >= 1800 && l < 8000) return 'short'
  if (l >= 8000 && l < 25000) return 'middle'
  return 'long'
}

function ItemStories({
  body,
  createdAt,
  genre,
  id,
  isStoryOwner = false,
  length,
  me = {},
  stats,
  title,
  user,
}) {
  const hasLike = me ? stats.likes.some(l => l && l.id === me.id) : false
  const hasDislike = me ? stats.dislikes.some(d => d && d.id === me.id) : false
  const hasView = me ? stats.views.some(v => v && v.id === me.id) : false

  const [handleDelete] = useMutation(DELETE_STORY_MUTATION, {
    awaitRefetchQueries: true,
    refetchQueries: [
      'INDEX_QUERY',
      'ME_QUERY',
      me ? { query: USER_QUERY, variables: { id: me.id } } : undefined,
    ].filter(Boolean),
    variables: { id },
  })

  return (
    <article
      onClick={() => {
        Router.push(`/story?id=${id}`, `/story/${id}-${slugify(title)}`).then(
          () => {
            window.scrollTo(0, 0)
          },
        )
      }}
      className={styles.wrapper}
    >
      {isStoryOwner ? (
        <div className={styles['edit-and-delete']}>
          <button
            onClick={event => {
              event.stopPropagation()
              Router.push(
                `/edit-story?id=${id}`,
                `/edit-story/${id}-${slugify(title)}`,
              ).then(() => {
                window.scrollTo(0, 0)
              })
            }}
            type="button"
          >
            <img alt="Редактировать" src="/images/icons/edit.svg" />
          </button>
          <button
            onClick={event => {
              event.stopPropagation()
              handleDelete()
            }}
            type="button"
          >
            <img alt="Удалить" src="/images/icons/cross.svg" />
          </button>
        </div>
      ) : (
        <UserWithDate
          className={styles['author-block']}
          date={createdAt}
          user={user}
        />
      )}
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.labels}>
        {genre && <span className={styles.genre}>{genre.name}</span>}
        <span className={cn(styles.length, styles[getLength(length)])}>
          Время чтения {Math.ceil(readingTime(body).minutes)} мин
        </span>
      </div>
      {body
        .split('\n')
        .filter(paragraph => paragraph !== '')
        .map((paragraph, index) => (
          <p className={styles.body} key={index}>
            {paragraph}
          </p>
        ))}
      <div className={styles['bottom-bar']}>
        <div className={styles['buttons-container']}>
          <div>
            <img
              src={
                hasView
                  ? '/images/icons/watched.svg'
                  : '/images/icons/watch.svg'
              }
              alt="Просмотры"
            />
            <span>{stats.views.length}</span>
          </div>
          <div>
            <img
              src={
                hasLike
                  ? '/images/icons/like-fill-black.svg'
                  : '/images/icons/like-fill-grey.svg'
              }
              alt="Лайки"
            />
            <span>{stats.likes.length}</span>
          </div>
          <div>
            <img
              src={
                hasDislike
                  ? '/images/icons/dislike-fill-black.svg'
                  : '/images/icons/dislike-fill-grey.svg'
              }
              alt="Дизлайки"
            />
            <span>{stats.dislikes.length}</span>
          </div>
          <div>
            <img alt="Комменты" src="/images/icons/comment-fill-grey.svg" />
            <span>{stats.comments}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ItemStories
