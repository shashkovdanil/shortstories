import type { DetailedHTMLProps, InputHTMLAttributes } from 'react'

import cn from 'classnames'
import { forwardRef, useMemo } from 'react'

import { ValidationError } from './ValidationError'

type Attributes = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type Validation = {
  error?: string
}

type Props = {
  id: string
  label: string
  validation?: Validation
} & Omit<Attributes, 'className' | 'id' | 'style'>

type ErrorInputAttributes = Pick<
  Attributes,
  'aria-describedby' | 'aria-invalid'
>

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ id, label, validation, ...rest }, ref) => {
    const errorId = useMemo(() => `${id}-error`, [id])
    const errorAttributes = useMemo(() => {
      let attributes: ErrorInputAttributes = {}

      if (validation?.error) {
        attributes = {
          'aria-describedby': errorId,
          'aria-invalid': true,
        }
      }

      return attributes
    }, [validation, errorId])

    return (
      <div
        className={cn('relative w-full', {
          'mb-6': Boolean(validation),
        })}
      >
        <label className="mb-1 block w-max text-sm/none" htmlFor={id}>
          {label}
        </label>
        <input
          className="w-full rounded border-2 border-solid border-gray-300 px-3 py-2 text-base transition-[border] focus-visible:border-brand focus-visible:outline-none"
          id={id}
          ref={ref}
          {...errorAttributes}
          {...rest}
        />
        {validation?.error && (
          <ValidationError id={errorId}>{validation.error}</ValidationError>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
