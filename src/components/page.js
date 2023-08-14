import React, { useEffect } from 'react'
import Meta from './meta'

function Page({ children }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => {
          console.log('service worker registration successful') // eslint-disable-line no-console
        })
        .catch(err => {
          console.warn('service worker registration failed', err.message) // eslint-disable-line no-console
        })
    }
  })

  return (
    <>
      <Meta />
      {children}
    </>
  )
}

export default Page
