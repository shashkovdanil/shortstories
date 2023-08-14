import cn from 'classnames'
import React from 'react'

import styles from './styles/share-button.module.css'

function ShareButton({ className = '', href, icon, title }) {
  return (
    <a
      aria-label={title}
      className={cn(styles.button, className)}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div>
        <div aria-hidden="true">
          <img alt={title} src={icon} />
        </div>
      </div>
    </a>
  )
}

export default ShareButton
