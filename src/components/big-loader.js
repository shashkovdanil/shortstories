import cn from 'classnames'
import React from 'react'

import styles from './styles/big-loader.module.css'

function BigLoader({ className = '' }) {
  return (
    <div className={cn(styles.loader, className)}>
      <div />
    </div>
  )
}

export default BigLoader
