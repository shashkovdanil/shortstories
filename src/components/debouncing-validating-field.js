'use client'

import React, { useRef } from 'react'
import { Field } from 'react-final-form'

function DebouncingValidatingField(props) {
  const timeoutRef = useRef(null)

  function validate(...args) {
    return new Promise(resolve => {
      if (timeoutRef.current) {
        timeoutRef.current()
      }

      const timerId = setTimeout(() => {
        resolve(props.validate(...args))
      }, 400)

      timeoutRef.current = () => {
        clearTimeout(timerId)
        resolve()
      }
    })
  }

  return <Field {...props} validate={validate} />
}

export default DebouncingValidatingField
