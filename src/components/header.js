import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { configure, done, start } from 'nprogress'
import { useEffect } from 'react'

import Nav from './nav'
import styles from './styles/header.css'

configure({ showSpinner: false })

function Header({ me }) {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', start)
    router.events.on('routeChangeComplete', done)
    router.events.on('routeChangeError', done)

    return () => {
      router.events.off('routeChangeStart', start)
      router.events.off('routeChangeComplete', done)
      router.events.off('routeChangeError', done)
    }
  }, [router])

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <div className={styles.logo}>
          <Link href="/">
            <img alt="" src="/images/logo.svg" />
          </Link>
        </div>
        {/* <Nav me={me} /> */}
      </div>
    </header>
  )
}

export default Header
