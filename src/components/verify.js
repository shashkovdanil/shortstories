import React, { useEffect } from 'react'
import { Mutation } from 'react-apollo'

import { ErrorMessage, Loader, Logo } from '.'
import { meFragment } from '../lib/fragments'
import { VERIFY_MUTATION } from '../lib/mutations'
import styles from './styles/verify.module.css'

function Success({ data, error, loading, verify }) {
  useEffect(() => {
    verify()
  }, [verify])

  return (
    <div>
      <ErrorMessage error={error} />
      {loading && <Loader />}
      {data && (
        <h3>
          Ваш аккаунт подтвержден{' '}
          <span aria-label="emoji" role="img">
            🔥
          </span>
          . Нажмите на перышко, чтобы перейти к чтению рассказов
        </h3>
      )}
    </div>
  )
}

function Result({ token }) {
  return (
    <div className={styles.block}>
      <Logo />
      {!token ? (
        <h3>Ошибка! Не пытайтесь верифицировать аккаунт без токена!</h3>
      ) : (
        <Mutation
          update={(cache, mutationResult) => {
            const me = cache.readFragment({
              fragment: meFragment,
              id: 'Me',
            })
            cache.writeFragment({
              data: {
                ...me,
                ...mutationResult.data.verifyUser,
              },
              fragment: meFragment,
              id: 'Me',
            })
          }}
          mutation={VERIFY_MUTATION}
          variables={{ token }}
        >
          {(verifyUser, result) => <Success verify={verifyUser} {...result} />}
        </Mutation>
      )}
    </div>
  )
}

export default Result
