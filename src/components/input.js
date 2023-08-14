import cn from 'classnames'
import React from 'react'

import styles from './styles/input.module.css'

function Input({
  disabled = false,
  error = '',
  errorClassName = '',
  errorStyles = {},
  inputClassName = '',
  inputStyles = {},
  label = '',
  labelClassName = '',
  labelStyles = {},
  loading = false,
  name,
  placeholder = '',
  readOnly = false,
  rootClassName = '',
  rootStyles = {},
  type = 'text',
  ...rest
}) {
  return (
    <div
      className={cn(styles.root, { [styles.loading]: loading }, rootClassName)}
      style={rootStyles}
    >
      {label && (
        <label
          className={cn(styles.label, labelClassName)}
          htmlFor={name}
          style={labelStyles}
        >
          {label}
        </label>
      )}
      <input
        {...rest}
        className={cn(styles.input, inputClassName)}
        disabled={disabled}
        id={name}
        name={name}
        placeholder={placeholder}
        readOnly={readOnly}
        style={inputStyles}
        type={type}
      />
      {error && (
        <span className={cn(styles.error, errorClassName)} style={errorStyles}>
          {error}
        </span>
      )}
    </div>
  )
}

export default Input
