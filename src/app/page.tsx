'use client'

import { MainStories, Modal, SettingsSort, Wrapper } from '@/components'
import { INDEX_QUERY } from '@/graphql/queries'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import cn from 'classnames'
import Link from 'next/link'
import { useState } from 'react'

import styles from '../styles/pages/index.module.css'

export default function IndexPage() {
  const [isOpen, setOpen] = useState(false)
  const [sort, setSort] = useState({
    genres: [],
    length: null,
    popular: null,
  })
  const { popular } = sort
  const mostLiked = popular === 'mostLiked'
  const mostViewed = popular === 'mostViewed'
  const mostCommented = popular === 'mostCommented'
  const variables = {
    genres: sort.genres,
    length: sort.length,
    mostCommented,
    mostLiked,
    mostViewed,
  }

  const {
    data: { genres, me, stories },
    error,
    fetchMore,
  } = useSuspenseQuery(INDEX_QUERY, {
    variables,
  })

  return (
    <>
      <div className={styles['seo-block']}>
        <div className={styles.inner}>
          <div className={styles.text}>
            <h1>Здесь вы можете читать рассказы свободных писателей</h1>
            <p>
              Откройте для себя новых авторов или{' '}
              <Link className={styles.link} href="/create-story">
                продемонстрируйте
              </Link>{' '}
              талант и станьте лучшим
            </p>
            <p>
              Для удобства чтения{' '}
              <button
                onClick={() => {
                  setOpen(true)
                }}
                className={cn(styles['settings-button'], styles.link)}
                type="button"
              >
                настройте
              </button>{' '}
              ленту
            </p>
          </div>
          <div className={styles.writer}>
            <Link href="/create-story">
              <img alt="" src="/images/writer.svg" />
            </Link>
          </div>
        </div>
      </div>
      <Wrapper isIndex me={me}>
        <MainStories
          error={error}
          fetchMore={fetchMore}
          loading={false}
          me={me}
          stories={stories}
        />
      </Wrapper>
      {isOpen && (
        <Modal
          onClose={() => {
            setOpen(false)
          }}
        >
          <SettingsSort genres={genres} setOpen={setOpen} setSort={setSort} />
        </Modal>
      )}
    </>
  )
}
