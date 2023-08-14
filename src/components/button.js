import cn from 'classnames'
import React from 'react'

import Loader from './loader'
import styles from './styles/button.module.css'

function Button({
  black,
  children,
  className = '',
  disabled = false,
  loading = false,
  onClick,
  style = {},
  type = 'button',
  violet,
}) {
  return (
    <button
      className={cn(
        styles.button,
        {
          [styles.black]: black,
          [styles.loading]: loading,
          [styles.violet]: violet,
        },
        className,
      )}
      disabled={disabled || loading}
      onClick={onClick}
      style={style}
      type={type}
    >
      {loading ? <Loader /> : children}
    </button>
  )
}

export default Button
