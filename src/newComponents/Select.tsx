'use client'

import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from 'react'

import {
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
  autoUpdate,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTypeahead,
} from '@floating-ui/react'
import cn from 'classnames'
import {
  createContext,
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'

type SelectContextValue = {
  activeIndex: null | number
  getItemProps: ReturnType<typeof useInteractions>['getItemProps']
  handleSelect: (index: null | number) => void
  selectedIndex: null | number
}

export const SelectContext = createContext<SelectContextValue>(
  {} as SelectContextValue,
)

type Attributes = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type Props = {
  className?: string
  onChange: (value: string) => void
  placeholder?: string
} & Attributes

export const Select = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  (
    { children, className = '', onChange, placeholder = 'Select...', ...rest },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState<null | number>(null)
    const [selectedIndex, setSelectedIndex] = useState<null | number>(null)
    const [selectedLabel, setSelectedLabel] = useState<null | string>(null)

    const { context, floatingStyles, refs } = useFloating({
      onOpenChange: setIsOpen,
      open: isOpen,
      placement: 'bottom-start',
      whileElementsMounted: autoUpdate,
    })

    const elementsRef = useRef<Array<HTMLElement | null>>([])
    const labelsRef = useRef<Array<null | string>>([])

    const handleSelect = useCallback(
      (index: null | number) => {
        setSelectedIndex(index)
        setIsOpen(false)

        if (index !== null) {
          const value = labelsRef.current[index]
          setSelectedLabel(value)
          onChange(value)
        }
      },
      [onChange],
    )

    function handleTypeaheadMatch(index: null | number) {
      if (isOpen) {
        setActiveIndex(index)
      } else {
        handleSelect(index)
      }
    }

    const listNav = useListNavigation(context, {
      activeIndex,
      listRef: elementsRef,
      loop: true,
      onNavigate: setActiveIndex,
      selectedIndex,
    })
    const typeahead = useTypeahead(context, {
      activeIndex,
      listRef: labelsRef,
      onMatch: handleTypeaheadMatch,
      selectedIndex,
    })
    const click = useClick(context)
    const dismiss = useDismiss(context)
    const role = useRole(context, { role: 'listbox' })

    const { getFloatingProps, getItemProps, getReferenceProps } =
      useInteractions([listNav, typeahead, click, dismiss, role])

    const contextValue = useMemo(
      () => ({
        activeIndex,
        getItemProps,
        handleSelect,
        selectedIndex,
      }),
      [activeIndex, selectedIndex, getItemProps, handleSelect],
    )

    const label = selectedLabel ?? placeholder

    const mergedRef = useMergeRefs([ref, refs.setReference])

    return (
      <>
        <button
          ref={mergedRef}
          {...rest}
          {...getReferenceProps()}
          className={cn({
            [className]: className,
            'rounded border-2 border-solid border-gray-300 px-3 py-2 text-base transition-[border] focus-visible:border-brand focus-visible:outline-none':
              !className,
          })}
          title={label}
          type="button"
        >
          {label}
        </button>
        <SelectContext.Provider value={contextValue}>
          {isOpen && (
            <FloatingPortal>
              <FloatingFocusManager context={context} modal={false}>
                <div
                  ref={refs.setFloating}
                  style={floatingStyles}
                  {...getFloatingProps()}
                  className="flex max-h-48 w-40 flex-col overflow-y-auto rounded-lg border border-gray-200 bg-white p-2 drop-shadow-xl focus:outline-none focus-visible:outline-none"
                >
                  <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                    {children}
                  </FloatingList>
                </div>
              </FloatingFocusManager>
            </FloatingPortal>
          )}
        </SelectContext.Provider>
      </>
    )
  },
)

Select.displayName = 'Select'
