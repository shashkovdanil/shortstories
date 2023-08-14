import Link from 'next/link'
import React from 'react'

import Signout from './signout'
import styles from './styles/nav.module.css'

function Nav({ me }) {
  const isLoggedIn = !!me
  return (
    <>
      <div className={styles['mobile-menu']}>
        <input className={styles.checkbox} id="toggle" type="checkbox" />
        {/* eslint-disable-next-line */}
        <label className={styles.button} htmlFor="toggle">
          <span className={styles.icon}>&nbsp;</span>
        </label>
        <div className={styles.background}>&nbsp;</div>
        <nav className={styles.content}>
          <ul>
            {isLoggedIn && (
              <>
                <li>
                  <Link className={styles.write} href="/create-story">
                    Написать рассказ&nbsp;
                    <span aria-label="emoji" role="img">
                      ✍️
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/me">Профиль</Link>
                </li>
                <li>
                  <Signout />
                </li>
              </>
            )}
            {!isLoggedIn && (
              <>
                <li>
                  <Link className={styles.signup} href="/signup">
                    Регистрация
                  </Link>
                </li>
                <li>
                  <Link href="/signin">Вход</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <nav className={styles.nav}>
        {isLoggedIn && (
          <>
            <Link className={styles.write} href="/create-story">
              Написать рассказ&nbsp;
              <span aria-label="emoji" role="img">
                ✍️
              </span>
            </Link>
            <Link href="/me">Профиль</Link>
            <Signout />
          </>
        )}
        {!isLoggedIn && (
          <>
            <Link className={styles.signup} href="/signup">
              Регистрация
            </Link>
            <Link href="/signin">Вход</Link>
          </>
        )}
      </nav>
    </>
  )
}

export default Nav
