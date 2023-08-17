import type { DetailedHTMLProps, InputHTMLAttributes } from 'react'

import cn from 'classnames'
import { forwardRef, useMemo } from 'react'

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
} & Exclude<Attributes, 'className' | 'id' | 'style'>

type ErrorInputAttributes = Pick<
  Attributes,
  'aria-describedby' | 'aria-invalid'
>

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ id, label, validation, ...rest }, ref) => {
    const errorId = useMemo(() => `${id}-error`, [id])
    const errorAttributes = useMemo(() => {
      let errorAttributes: ErrorInputAttributes = {}

      if (validation?.error) {
        errorAttributes = {
          'aria-describedby': errorId,
          'aria-invalid': true,
        }
      }

      return errorAttributes
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
          className="w-full rounded border-2 border-solid border-gray-300 px-3 py-2 text-base transition-[border] focus-visible:border-purple-600 focus-visible:outline-none"
          id={id}
          ref={ref}
          {...errorAttributes}
          {...rest}
        />
        {validation?.error && (
          <div className="absolute mt-1 text-sm/none text-red-600" id={errorId}>
            {validation.error}
          </div>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
