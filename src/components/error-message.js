import React from 'react'

import styles from './styles/error-message.module.css'

function ErrorMessage({ error = {} }) {
  if (!error || !error.message) return null
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, index) => (
      <div className={styles.error} key={index}>
        <p>
          <strong>Error!</strong>
          {error.extensions.message}
        </p>
      </div>
    ))
  }
  return (
    <div className={styles.error}>
      <p>
        <strong>Ошибка!</strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </div>
  )
}

export default ErrorMessage
