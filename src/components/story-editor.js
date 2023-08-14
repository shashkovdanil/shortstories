import cn from 'classnames'
import Router from 'next/router'
import React from 'react'
import { Mutation } from 'react-apollo'
import { Field, Form } from 'react-final-form'
import ReactTextareaAutosize from 'react-textarea-autosize'

import { Button, ErrorMessage, GenreSelect } from '.'
import { EDIT_STORY_MUTATION } from '../../src/lib/mutations'
import { USER_QUERY } from '../../src/lib/queries'
import { isEmpty, storyLength, withoutGenre } from '../../src/lib/validators'
import withDarkMode from '../hoc/with-dark-mode'
import storyStyles from './styles/story.module.css'
import styles from './styles/story-editor.module.css'

function StoryEditor({ genres, id, mode, story, theme, userId }) {
  console.log(story)
  return (
    <Mutation
      refetchQueries={[
        'INDEX_QUERY',
        'ME_QUERY',
        { query: USER_QUERY, variables: { id: userId } },
      ]}
      awaitRefetchQueries
      mutation={EDIT_STORY_MUTATION}
    >
      {(editStory, { error, loading }) => (
        <Form
          initialValues={{
            body: story.body,
            genre: story.genre,
            title: story.title,
          }}
          onSubmit={async values => {
            await editStory({
              variables: {
                body: values.body,
                genreId: values.genre.id,
                id,
                title: values.title,
              },
            })
            Router.push('/me')
          }}
          render={({ form, handleSubmit, submitting }) => (
            <div
              className={cn(styles.wrapper, {
                [styles.dark]: mode === 'dark',
              })}
            >
              <form
                className={cn(storyStyles.story, storyStyles['form-story'], {
                  [storyStyles.dark]: mode === 'dark',
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
                <Field name="body" validate={storyLength}>
                  {({ input, meta }) => (
                    <div className={storyStyles.body}>
                      <ReactTextareaAutosize
                        {...input}
                        id="body"
                        maxLength={40000}
                        name="body"
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
                <Button
                  black
                  disabled={submitting}
                  loading={loading}
                  type="submit"
                >
                  Редактировать
                </Button>
              </form>
            </div>
          )}
        />
      )}
    </Mutation>
  )
}

export default withDarkMode(StoryEditor)
