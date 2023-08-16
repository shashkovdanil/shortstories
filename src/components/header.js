'use client'

import Link from 'next/link'

import Nav from './nav'
import styles from './styles/header.module.css'

function Header() {
  return (
    <header className="flex items-center bg-slate-100 py-4">
      <div className={styles.bar}>
        <div className={styles.logo}>
          <Link href="/">
            <img alt="" src="/images/logo.svg" />
          </Link>
        </div>
        <Nav />
      </div>
    </header>
  )
}

export default Header
