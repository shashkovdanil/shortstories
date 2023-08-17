'use client'

import { Footer, Header, MainStories, Modal, SettingsSort } from '@/components'
import { INDEX_QUERY } from '@/graphql/queries'
import { Input } from '@/newComponents/Input'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import cn from 'classnames'
import Image from 'next/image'
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
    fetchPolicy: 'no-cache',
    variables,
  })

  return (
    <>
      <Header />
      <main>
        <div className="mb-12 bg-slate-100 py-12">
          <div className={styles.inner}>
            <div className={styles.text}>
              <h1 className="text-balance font-bold">
                Here you can read short stories by freelance writers
              </h1>
              <p className="text-balance">
                Discover new authors or{' '}
                <Link className={styles.link} href="/create-story">
                  showcase your talent
                </Link>
              </p>
              <p className="text-balance">
                <button
                  onClick={() => {
                    setOpen(true)
                  }}
                  className={cn(styles['settings-button'], styles.link)}
                  type="button"
                >
                  Customize
                </button>{' '}
                the feed for easy reading
              </p>
            </div>
            <div className="hidden flex-1 items-center justify-center md:flex">
              <Link aria-label="Go to Write Story page" href="/create-story">
                <Image
                  alt="Write Story"
                  height={100}
                  src="/images/writer.svg"
                  width={100}
                />
              </Link>
            </div>
          </div>
        </div>
        <MainStories
          error={error}
          fetchMore={fetchMore}
          loading={false}
          me={me}
          stories={stories}
        />
      </main>

      <Footer />
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
