import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  MouseEvent,
  PropsWithChildren,
} from 'react'

import cn from 'classnames'
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'

type Attributes = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type Props = {
  full?: boolean
  loading?: boolean
  loadingLabel?: string
} & Exclude<Attributes, 'className' | 'style'>

type LoadingAttributes = Pick<
  Attributes,
  'aria-busy' | 'aria-label' | 'aria-live' | 'onClick'
>

export const Button = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  (
    {
      children,
      full,
      loading,
      loadingLabel = 'Loading... Please wait.',
      type = 'button',
      ...rest
    },
    ref,
  ) => {
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

    const loadingAttributes = useMemo(() => {
      let attributes: LoadingAttributes = {}

      if (loading) {
        attributes = {
          'aria-busy': true,
          'aria-label': loadingLabel,
          'aria-live': 'polite',
          onClick: event => {
            event.preventDefault()
          },
        }
      }

      return attributes
    }, [loading, loadingLabel])

    return (
      <>
        <button
          className={cn(
            'flex select-none justify-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap rounded bg-slate-800 px-3 py-2 text-base text-white transition-all hover:bg-purple-600 focus-visible:outline-none focus-visible:ring-4 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60',
            {
              'w-full': full,
            },
          )}
          ref={innerRef}
          type={type}
          {...rest}
          {...loadingAttributes}
        >
          {loading && (
            <svg
              aria-hidden={true}
              className="h-5 w-5 animate-spin text-white"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
              />
            </svg>
          )}
          {children}
        </button>
      </>
    )
  },
)

Button.displayName = 'Button'
