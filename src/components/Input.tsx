import type { DetailedHTMLProps, InputHTMLAttributes } from 'react'

import cn from 'classnames'
import { useMemo } from 'react'

type Props = {
  error?: string
  id: string
  label?: string
  loading?: boolean
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'className' | 'id' | 'style'
>

export function Input({ error, id, label, loading, ...rest }: Props) {
  const errorId = useMemo(() => `error-${id}`, [id])
  const hasError = useMemo(() => Boolean(error), [error])

  return (
    <div
      className={cn('relative flex flex-col', {
        'after:z-4 after:absolute after:right-3 after:top-[calc((100%_-_20px)_/_2)] after:block after:h-5 after:w-5 after:animate-spin after:rounded-full after:border-2 after:border-solid after:border-gray-900 after:border-r-transparent after:border-t-transparent after:border-opacity-50':
          loading,
      })}
    >
      {label && (
        <label
          className="absolute -top-2.5 left-4 bg-white text-sm"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        className={cn(
          'h-11 rounded border border-gray-300 bg-white px-4 text-lg transition duration-200 ease-in-out focus-visible:border-purple-600 focus-visible:outline-none',
          {
            'focus-visible:border-red-600': hasError,
            'pr-10': loading,
          },
        )}
        aria-describedby={hasError ? errorId : undefined}
        aria-invalid={hasError ? true : undefined}
        id={id}
        {...rest}
      />
      {error && (
        <span
          className="absolute top-full mt-1 text-sm text-red-600"
          id={errorId}
        >
          {error}
        </span>
      )}
    </div>
  )
}
