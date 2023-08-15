import Link from 'next/link'
import React from 'react'

import styles from './styles/logo.module.css'

function Logo() {
  return (
    <Link className={styles.logo} href="/">
      <img alt="" src="/images/writer.svg" />
    </Link>
  )
}

export default Logo
