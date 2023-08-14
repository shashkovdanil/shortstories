import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from 'react'

import { Loader } from '@/components/Loader'
import cn from 'classnames'

type Props = {
  color?: 'black' | 'violet'
  fullWidth?: boolean
  loading?: boolean
} & Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'className' | 'style'
>

export function Button({
  children,
  color = 'black',
  fullWidth = false,
  loading,
  type = 'button',
  ...rest
}: PropsWithChildren<Props>) {
  return (
    <button
      className={cn(
        'disabled:opacity-65 flex items-center justify-center gap-2 rounded font-normal text-white transition duration-200 ease-in-out focus-visible:shadow-outline focus-visible:shadow-purple-400/80 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-default',
        {
          'block h-7 bg-purple-600 px-3 text-base hover:bg-purple-700':
            color === 'violet',
          'h-10 bg-gray-700 px-3 text-lg hover:bg-purple-600 active:scale-95':
            color === 'black',
          'w-full': fullWidth,
        },
      )}
      type={type}
      {...rest}
      disabled={rest.disabled || loading}
    >
      {loading && <Loader />}
      {children}
    </button>
  )
}
