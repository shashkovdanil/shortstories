import Link from 'next/link'
import React from 'react'

import styles from './styles/logo.css'

function Logo() {
  return (
    <Link href="/">
      <a className={styles.logo}>
        <img alt="" src="/images/writer.svg" />
      </a>
    </Link>
  )
}

export default Logo
