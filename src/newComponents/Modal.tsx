'use client'

import type { PropsWithChildren, ReactElement } from 'react'

import { Icon } from '@/newComponents/Icon'
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useId,
  useInteractions,
  useRole,
  useTransitionStatus,
} from '@floating-ui/react'
import cn from 'classnames'
import { cloneElement, useState } from 'react'

type Props = {
  description: string
  fullScreen?: boolean
  label: string
  reference: ReactElement
}

export function Modal({
  children,
  description,
  fullScreen,
  label,
  reference,
}: PropsWithChildren<Props>) {
  const [isOpen, setIsOpen] = useState(false)

  const { context, refs } = useFloating({
    onOpenChange: setIsOpen,
    open: isOpen,
  })
  const { isMounted, status } = useTransitionStatus(context)

  const click = useClick(context)
  const dismiss = useDismiss(context, {
    outsidePressEvent: 'mousedown',
  })
  const role = useRole(context)

  const { getFloatingProps, getReferenceProps } = useInteractions([
    click,
    dismiss,
    role,
  ])

  const labelId = useId()
  const descriptionId = useId()

  const referenceElement = cloneElement(reference, {
    ...getReferenceProps({
      ref: refs.setReference,
    }),
  })

  return (
    <>
      {referenceElement}
      {isMounted && (
        <FloatingPortal>
          <FloatingOverlay
            className={cn(
              'bg-background/90 grid place-items-center backdrop-blur-sm backdrop-opacity-0 transition-all duration-300 ease-in-out',
              {
                'backdrop-opacity-100': status === 'open',
              },
            )}
            lockScroll
          >
            <FloatingFocusManager context={context}>
              <div
                className={cn(
                  'relative transform rounded-lg bg-white p-4 opacity-0 shadow-lg transition-all duration-300 ease-in-out',
                  {
                    'h-full w-full rounded-none p-0 shadow-none': fullScreen,
                    'scale-90 opacity-0': status === 'close',
                    'scale-100 opacity-100': status === 'open',
                    'w-full max-w-lg': !fullScreen,
                  },
                )}
                aria-describedby={descriptionId}
                aria-labelledby={labelId}
                ref={refs.setFloating}
                {...getFloatingProps()}
              >
                <h2 className="sr-only" id={labelId}>
                  {label}
                </h2>
                <p className="sr-only" id={descriptionId}>
                  {description}
                </p>
                {children}
                <button
                  className={cn('p-1', {
                    'fixed bottom-2 right-2': fullScreen,
                  })}
                  onClick={() => setIsOpen(false)}
                  type="button"
                >
                  <Icon name="ri-close-line" />
                </button>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        </FloatingPortal>
      )}
    </>
  )
}
