import cn from 'classnames'
import React, { useState } from 'react'

import Button from './button'
import styles from './styles/settings-sort.module.css'

const lengths = [
  { id: 'short', name: 'Короткие' },
  { id: 'middle', name: 'Средние' },
  { id: 'long', name: 'Длинные' },
]

const popular = [
  {
    icon: '/images/icons/like-fill-grey.svg',
    id: 'mostLiked',
    name: 'По лайкам',
  },
  {
    icon: '/images/icons/eye.svg',
    id: 'mostViewed',
    name: 'По просмотрам',
  },
  {
    icon: '/images/icons/comment-fill-grey.svg',
    id: 'mostCommented',
    name: 'По комментам',
  },
]

function SettingsSort({ genres, setOpen, setSort }) {
  const [selectedSort, selectSort] = useState({
    genres: [],
    length: null,
    popular: null,
  })
  return (
    <div>
      <p className={styles.title}>Выберите жанры</p>
      <div className={styles.block}>
        {genres.map(genre => (
          <button
            className={cn(styles.label, {
              [styles.selected]: selectedSort.genres.includes(genre.id),
            })}
            onClick={() => {
              selectSort({
                ...selectedSort,
                genres: selectedSort.genres.includes(genre.id)
                  ? [...selectedSort.genres].filter(g => g !== genre.id)
                  : [...selectedSort.genres, genre.id],
              })
            }}
            key={genre.id}
            type="button"
          >
            {genre.name}
          </button>
        ))}
      </div>
      <p className={styles.title}>Выберите длину рассказов</p>
      <div className={styles.block}>
        {lengths.map(l => (
          <button
            className={cn(styles.label, {
              [styles.selected]: selectedSort.length === l.id,
            })}
            onClick={() => {
              selectSort({
                ...selectedSort,
                length: selectedSort.length === l.id ? null : l.id,
              })
            }}
            key={l.id}
            type="button"
          >
            {l.name}
          </button>
        ))}
      </div>
      <p className={styles.title}>Отсортируйте по популярности</p>
      <div className={styles.block}>
        {popular.map(p => (
          <button
            className={cn(styles.label, {
              [styles.selected]: selectedSort.popular === p.id,
            })}
            onClick={() => {
              selectSort({
                ...selectedSort,
                popular: selectedSort.popular === p.id ? null : p.id,
              })
            }}
            key={p.id}
          >
            {p.name} <img alt={p.name} src={p.icon} />
          </button>
        ))}
      </div>
      <Button
        onClick={() => {
          setSort(selectedSort)
          setOpen(false)
        }}
        className={styles['accept-button']}
        violet
      >
        Применить
      </Button>
    </div>
  )
}

export default SettingsSort
