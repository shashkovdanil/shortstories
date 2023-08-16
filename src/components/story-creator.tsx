'use client'

import { CREATE_STORY_MUTATION } from '@/graphql/mutations'
import { GENRES_QUERY, ME_QUERY, USER_QUERY } from '@/graphql/queries'
import { useApolloClient, useMutation } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import cn from 'classnames'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Field, Form } from 'react-final-form'
import ReactTextareaAutosize from 'react-textarea-autosize'

import { Button, ErrorMessage, GenreSelect } from '.'
import withDarkMode from '../hoc/with-dark-mode'
import { isEmpty, storyLength, withoutGenre } from '../lib/validators'
import storyStyles from './styles/story.module.css'
import styles from './styles/story-creator.module.css'

function StoryCreator({ mode, theme, userId }) {
  const client = useApolloClient()
  const router = useRouter()
  const {
    data: { genres = [] },
  } = useSuspenseQuery(GENRES_QUERY)
  const [createStory, { error, loading }] = useMutation(CREATE_STORY_MUTATION, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: USER_QUERY,
        variables: { id: userId },
      },
      {
        query: ME_QUERY,
        variables: { userId },
      },
    ],
  })

  return (
    <Form
      onSubmit={async values => {
        await createStory({
          variables: {
            body: values.body,
            genreId: values.genre.id,
            title: values.title,
          },
        })

        // router.push('/')
      }}
      render={({ form, handleSubmit, submitting }) => (
        <div
          className={cn(styles.wrapper, {
            [styles.dark]: mode === 'dark',
          })}
        >
          <Head>
            <title>Shortstories - написать рассказ</title>
            <meta content="Shortstories - написать рассказ" name="title" />
            <meta
              content="Shortstories - написать рассказ"
              name="description"
            />
            <meta
              content="Shortstories - написать рассказ"
              property="og:site_name"
            />
            <meta
              content="Shortstories - написать рассказ"
              property="og:title"
            />
            <meta
              content="Shortstories - написать рассказ"
              property="og:description"
            />
            <meta
              content="Shortstories - написать рассказ"
              name="twitter:title"
            />
            <meta
              content="Shortstories - написать рассказ"
              name="twitter:text:title"
            />
            <meta
              content="Shortstories - написать рассказ"
              name="twitter:description"
            />
          </Head>
          <form
            className={cn(storyStyles.story, storyStyles['form-story'], {
              dark: mode === 'dark',
            })}
            onSubmit={handleSubmit}
          >
            <ErrorMessage error={error} />
            <Field
              name="title"
              validate={value => isEmpty(value, 'Введите заголовок')}
            >
              {({ input, meta }) => (
                <div className={storyStyles.title}>
                  <input
                    {...input}
                    autoCapitalize="true"
                    autoComplete="new-password"
                    id="title"
                    name="title"
                    onChange={input.onChange}
                    placeholder="Заголовок"
                    type="text"
                  />
                  {meta.error && meta.touched && (
                    <span className={storyStyles['error-message']}>
                      {meta.error}
                    </span>
                  )}
                </div>
              )}
            </Field>
            <Field name="genre" validate={withoutGenre}>
              {({ input, meta }) => (
                <div className={storyStyles.genres}>
                  <GenreSelect
                    onSelect={genre => {
                      form.change('genre', genre)
                    }}
                    input={input}
                    isDarkMode={mode === 'dark'}
                    items={genres}
                  />
                  {meta.error && meta.touched && (
                    <span className={storyStyles['error-message']}>
                      {meta.error}
                    </span>
                  )}
                </div>
              )}
            </Field>
            <Field name="body">
              {({ input, meta }) => (
                <div className={storyStyles.body}>
                  <ReactTextareaAutosize
                    {...input}
                    id="body"
                    maxLength={40000}
                    name="body"
                    onChange={input.onChange}
                    placeholder="Расскажите историю..."
                  />
                  {meta.error && meta.touched && (
                    <span className={storyStyles['error-message']}>
                      {meta.error}
                    </span>
                  )}
                </div>
              )}
            </Field>
            <Button black disabled={submitting} loading={loading} type="submit">
              Опубликовать
            </Button>
          </form>
        </div>
      )}
    />
  )
}

export default withDarkMode(StoryCreator)
