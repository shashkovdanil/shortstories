import cn from 'classnames'
import React from 'react'

// import Footer from './footer'
// import Header from './header'
import styles from './styles/wrapper.css'

function Wrapper({
  children,
  className = '',
  innerClassName = '',
  isIndex = false,
  me,
}) {
  return (
    <>
      {/* <Header me={me} /> */}
      <main className={cn(styles.wrapper, className)}>
        <div
          className={cn(
            styles.inner,
            { [styles.index]: isIndex },
            innerClassName,
          )}
        >
          {children}
        </div>
        {/* <Footer /> */}
      </main>
    </>
  )
}

export default Wrapper
