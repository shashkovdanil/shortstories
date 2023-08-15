import { STORY_QUERY } from '@/graphql/queries'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import cn from 'classnames'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

import { BigLoader, ErrorMessage, Reaction, ShareButton, UserWithDate } from '.'
import withDarkMode from '../hoc/with-dark-mode'
import Comments from './comments'
import storyStyles from './styles/story.module.css'
import styles from './styles/story-reader.module.css'

function StoryReader({ id, mode, theme, viewStory }) {
  const { data, error } = useSuspenseQuery(STORY_QUERY, {
    variables: { id, limit: 10 },
  })

  const [href, setHref] = useState(null)
  useEffect(() => {
    setHref(window.location.href)
    const viewTimer = setTimeout(viewStory, 22000) // Просмотр засчитывается только после 22 секунд
    return () => {
      clearTimeout(viewTimer)
    }
  }, [viewStory])

  if (error) return <ErrorMessage error={error} />
  if (!data.story) return <p>Рассказа не существует</p>
  const { comments, me, story } = data
  return (
    <div
      className={cn(styles['story-wrapper'], {
        [styles.dark]: mode === 'dark',
      })}
    >
      <div
        className={cn(storyStyles.story, {
          [storyStyles.dark]: mode === 'dark',
        })}
      >
        <Head>
          <title>Shortstories - читать рассказ «{story.title}»</title>
          <meta
            content={`Shortstories - читать рассказ «${story.title}»`}
            name="title"
          />
          <meta
            content={`Читать рассказ «${story.body.slice(0, 100)}...»`}
            name="description"
          />
          <meta
            content={`Shortstories - читать рассказ «${story.title}»`}
            property="og:site_name"
          />
          <meta
            content={`Shortstories - читать рассказ «${story.title}»`}
            property="og:title"
          />
          <meta
            content={`Читать рассказ «${story.body.slice(0, 100)}...»`}
            property="og:description"
          />
          <meta
            content={`Shortstories - читать рассказ «${story.title}»`}
            name="twitter:title"
          />
          <meta
            content={`Shortstories - читать рассказ «${story.title}»`}
            name="twitter:text:title"
          />
          <meta
            content={`Читать рассказ «${story.body.slice(0, 100)}...»`}
            name="twitter:description"
          />
        </Head>
        <UserWithDate date={story.createdAt} user={story.user} />
        <h1 className={storyStyles.title}>{story.title}</h1>
        {story.body
          .split('\n')
          .filter(paragraph => paragraph !== '')
          .map((paragraph, index) => (
            <p className={storyStyles.body} key={index}>
              {paragraph}
            </p>
          ))}
      </div>
      {me && (
        <div className={styles['story-toolbar']}>
          <div className={styles['reaction-buttons']}>
            <div className={styles.reactions}>
              <Reaction
                active={story.stats.likes.some(l => l.id === me.id)}
                dark={mode === 'dark'}
                id={id}
                qty={story.stats.likes.length}
                state="like"
              />
              <Reaction
                active={story.stats.dislikes.some(d => d.id === me.id)}
                dark={mode === 'dark'}
                id={id}
                qty={story.stats.dislikes.length}
                state="dislike"
              />
            </div>
            <div className={styles.sharing}>
              <ShareButton
                className={styles.share}
                href={`https://vk.com/share.php?url=${href}&title=${story.title}&utm_source=share2`}
                icon="/images/icons/vk.svg"
                title="Поделиться VK"
              />
              <ShareButton
                className={styles.share}
                href={`https://twitter.com/intent/tweet/?text=${story.title}&url=${href}`}
                icon="/images/icons/twitter.svg"
                title="Поделиться в Twitter"
              />
              <ShareButton
                className={styles.share}
                href={`https://www.facebook.com/sharer/sharer.php?u=${href}&t=${story.title}`}
                icon="/images/icons/fb.svg"
                title="Поделиться в Facebook"
              />
            </div>
          </div>
        </div>
      )}
      <Comments
        comments={comments}
        id={id}
        isDarkMode={mode === 'dark'}
        me={me}
      />
    </div>
  )
}

export default withDarkMode(StoryReader)
