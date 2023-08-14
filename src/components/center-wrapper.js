import cn from 'classnames'
import React from 'react'

import styles from './styles/center-wrapper.module.css'

function CenterWrapper({ children, className = '' }) {
  return (
    <main className={cn(styles.wrapper, className)}>
      <div className={styles.inner}>
        <div className={styles.columns}>{children}</div>
      </div>
    </main>
  )
}

export default CenterWrapper
