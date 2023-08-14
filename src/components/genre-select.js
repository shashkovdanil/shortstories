import cn from 'classnames'
import Downshift from 'downshift'
import React from 'react'

import styles from './styles/genre-select.module.css'

const filterResult = (item, inputValue) =>
  !inputValue || item.name.toLowerCase().includes(inputValue.toLowerCase())

function GenreSelect({ input, isDarkMode, items, onSelect }) {
  const getFilteredItems = inputValue =>
    items.filter(item => filterResult(item, inputValue))

  return (
    <Downshift
      {...input}
      initialSelectedItem={input.value}
      itemToString={item => (item ? item.name : '')}
      onChange={onSelect}
      onInputValueChange={input.onChange}
    >
      {({
        getItemProps,
        getMenuProps,
        getRootProps,
        getToggleButtonProps,
        highlightedIndex,
        inputValue,
        isOpen,
        selectedItem,
      }) => (
        <div {...getRootProps({ className: styles.wrapper })}>
          <button {...getToggleButtonProps({ className: styles.trigger })}>
            {selectedItem ? (
              selectedItem.name
            ) : (
              <p className={styles.placeholder}>Нажмите, чтобы выбрать жанр</p>
            )}
          </button>
          <ul
            {...getMenuProps({
              className: cn(styles.list, {
                [styles.darkList]: isDarkMode,
                [styles.hideList]:
                  !isOpen || !getFilteredItems(inputValue).length,
              }),
            })}
          >
            {isOpen
              ? items.map((item, index) => (
                  <li
                    {...getItemProps({
                      className: cn(styles.listItem, {
                        [styles.darkListItem]: isDarkMode,
                        [styles.selectedListItem]: highlightedIndex === index,
                      }),
                      index,
                      item,
                      key: item.name,
                    })}
                  >
                    {item.name}
                  </li>
                ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  )
}

export default GenreSelect
