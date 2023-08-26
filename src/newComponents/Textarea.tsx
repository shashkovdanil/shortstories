import type { DetailedHTMLProps, TextareaHTMLAttributes } from 'react'

import cn from 'classnames'
import { forwardRef, useRef, useState } from 'react'

type Attributes = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

const rows = 1

export const Textarea = forwardRef<HTMLTextAreaElement, Attributes>(
  (props, ref) => {
    const refForAutoHeight = useRef<HTMLTextAreaElement>(null)
    const [height, setHeight] = useState<null | number>(null)

    return (
      <div className="relative w-full">
        <textarea
          ref={ref}
          {...props}
          className={cn(
            props.className,
            'resize-none overflow-hidden transition-[height] focus-visible:outline-none',
          )}
          onChange={e => {
            props.onChange?.(e)
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
            props.className,
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
