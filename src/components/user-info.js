import cn from 'classnames'
import React from 'react'
import { Mutation } from 'react-apollo'
import { Field, Form } from 'react-final-form'
import Textarea from 'react-textarea-autosize'

import { meFragment } from '../lib/fragments'
import { getPhoto } from '../lib/helpers'
import {
  CHECK_USER_EXIST_MUTATION,
  UPDATE_ACCOUNT_MUTATION,
} from '../lib/mutations'
import EditPhoto from './edit-photo'
import styles from './styles/user-info.module.css'

export function UserInfo({ user }) {
  return (
    <section className={styles.wrapper}>
      <div>
        <div className={styles.username}>{user.username}</div>
        <div className={styles.info}>{user.info}</div>
      </div>
      <img
        alt={user.username}
        className={styles.avatar}
        src={getPhoto(user.photo)}
      />
    </section>
  )
}

export function AccountInfo({ me, setEdit }) {
  return (
    <section className={styles.wrapper}>
      <div>
        <div className={styles.edit}>
          <div className={styles.username}>{me.username}</div>
          <button
            onClick={() => {
              setEdit(true)
            }}
            aria-label="Редактировать"
            className={cn(styles.button, styles['edit-button'])}
            type="button"
          >
            Редактировать
          </button>
        </div>
        <div className={styles.email}>{me.email}</div>
        <div className={styles.info}>{me.info}</div>
      </div>
      <img
        alt={me.username}
        className={styles.avatar}
        src={getPhoto(me.photo)}
      />
    </section>
  )
}

export function AccountEdit({ me, setEdit }) {
  async function usernameValidation(value, check, initialValue) {
    if (!value) return 'Введите псевдоним'
    if (value !== initialValue) {
      const { data } = await check({ variables: { login: value } })
      if (data.checkUserExist) {
        return 'Псевдоним уже занят'
      }
    }
  }

  function infoValidation(value) {
    if (value.length < 8) return 'Слишком мало информации'
  }

  return (
    <section className={styles.wrapper}>
      <Mutation
        update={(cache, mutationResult) => {
          const me = cache.readFragment({
            fragment: meFragment,
            id: 'Me',
          })
          cache.writeFragment({
            data: {
              ...me,
              ...mutationResult.data.updateUser,
            },
            fragment: meFragment,
            id: 'Me',
          })
        }}
        mutation={UPDATE_ACCOUNT_MUTATION}
      >
        {update => (
          <Form
            initialValues={{
              info: me.info || '',
              username: me.username,
            }}
            onSubmit={async values => {
              await update({
                variables: { info: values.info, username: values.username },
              })
              setEdit(false)
            }}
          >
            {({ handleSubmit }) => (
              <form className={styles['edit-form']} onSubmit={handleSubmit}>
                <div>
                  <Mutation mutation={CHECK_USER_EXIST_MUTATION}>
                    {check => (
                      <Field
                        validate={value =>
                          usernameValidation(value, check, me.username)
                        }
                        name="username"
                      >
                        {({ input, meta }) => (
                          <div className={styles['field-wrapper']}>
                            <input
                              {...input}
                              className={cn({
                                [styles.error]: meta.error && meta.touched,
                              })}
                              placeholder="Псевдоним"
                              type="text"
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    )}
                  </Mutation>
                  <Field name="info" validate={infoValidation}>
                    {({ input, meta }) => (
                      <div className={styles['field-wrapper']}>
                        <Textarea
                          {...input}
                          className={cn({
                            [styles.error]: meta.error && meta.touched,
                          })}
                          maxLength={255}
                          placeholder="Краткое био..."
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div className={styles.buttons}>
                  <button
                    aria-label="Сохранить"
                    className={cn(styles.button, styles['save-button'])}
                    type="submit"
                  >
                    Сохранить
                  </button>
                  <button
                    onClick={() => {
                      setEdit(false)
                    }}
                    aria-label="Отменить"
                    className={cn(styles.button, styles['cancel-button'])}
                    type="button"
                  >
                    Отменить
                  </button>
                </div>
              </form>
            )}
          </Form>
        )}
      </Mutation>
      <EditPhoto me={me} />
    </section>
  )
}
