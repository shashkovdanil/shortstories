import Link from 'next/link'
import { useEffect } from 'react'

import Nav from './nav'
import styles from './styles/header.module.css'

function Header({ me }) {
  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <div className={styles.logo}>
          <Link href="/">
            <img alt="" src="/images/logo.svg" />
          </Link>
        </div>
        <Nav me={me} />
      </div>
    </header>
  )
}

export default Header
