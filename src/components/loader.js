import cn from 'classnames'
import React from 'react'

import styles from './styles/loader.module.css'

function Loader({ className = '' }) {
  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={styles.outer} />
      <div className={styles.inner} />
    </div>
  )
}

export default Loader
