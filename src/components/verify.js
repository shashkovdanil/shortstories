import { meFragment } from '@/graphql/fragments'
import { VERIFY_MUTATION } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'
import React, { useEffect } from 'react'

import { ErrorMessage, Loader, Logo } from '.'
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
  const [verifyUser, result] = useMutation(VERIFY_MUTATION, {
    update: (cache, mutationResult) => {
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
    },
    variables: { token },
  })

  return (
    <div className={styles.block}>
      <Logo />
      {!token ? (
        <h3>Ошибка! Не пытайтесь верифицировать аккаунт без токена!</h3>
      ) : (
        <Success verify={verifyUser} {...result} />
      )}
    </div>
  )
}

export default Result
