import type { DetailedHTMLProps, TextareaHTMLAttributes } from 'react'

import cn from 'classnames'
import { forwardRef, useEffect, useRef, useState } from 'react'

type Attributes = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

export const Textarea = forwardRef<HTMLTextAreaElement, Attributes>(
  ({ rows = 1, ...rest }, ref) => {
    const refForAutoHeight = useRef<HTMLTextAreaElement>(null)
    const [height, setHeight] = useState<null | number>(null)

    useEffect(() => {
      const resizeObserver = new ResizeObserver(entries => {
        setHeight(entries[0].target.scrollHeight)
      })

      resizeObserver.observe(refForAutoHeight.current)

      return () => {
        resizeObserver.disconnect()
      }
    }, [])

    return (
      <div className="relative w-full">
        <textarea
          ref={ref}
          {...rest}
          className={cn(
            rest.className,
            'resize-none overflow-hidden transition-[height]',
          )}
          onChange={e => {
            rest.onChange?.(e)
            refForAutoHeight.current.value = e.currentTarget.value
            requestAnimationFrame(() => {
              setHeight(refForAutoHeight.current.scrollHeight)
            })
          }}
          onScroll={e => {
            e.currentTarget.scrollTop = 0
          }}
          rows={rows}
          style={{ height: height || 'auto' }}
        />
        <textarea
          className={cn(
            rest.className,
            'pointer-events-none invisible absolute left-0 top-0 -z-10',
          )}
          aria-hidden
          ref={refForAutoHeight}
          rows={rows}
        />
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'
