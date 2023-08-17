import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from 'react'

import cn from 'classnames'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

type Attributes = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type Props = { full?: boolean } & Exclude<Attributes, 'className' | 'style'>

export const Button = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  ({ children, full, type = 'button', ...rest }, ref) => {
    const innerRef = useRef<HTMLButtonElement>(null)

    useImperativeHandle(ref, () => innerRef.current)

    useEffect(() => {
      let observer: ResizeObserver | undefined

      if (innerRef.current) {
        const observer = new ResizeObserver(entries => {
          entries.forEach(entry => {
            const isOverflow =
              entry.target.scrollWidth > entry.target.clientWidth

            if (isOverflow) {
              entry.target.setAttribute('title', entry.target.textContent)
            } else {
              entry.target.removeAttribute('title')
            }
          })
        })

        observer.observe(innerRef.current)
      }

      return () => {
        observer?.disconnect()
      }
    }, [])

    return (
      <button
        className={cn(
          'select-none overflow-hidden text-ellipsis whitespace-nowrap rounded bg-slate-800 px-3 py-2 text-base text-white transition-all hover:bg-purple-600 focus-visible:outline-none focus-visible:ring-4 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60',
          {
            'w-full': full,
          },
        )}
        ref={innerRef}
        type={type}
        {...rest}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
