import React from 'react'
import onClickOutside from 'react-onclickoutside'

import Portal from './portal'
import styles from './styles/modal.css'

function ModalContent({ children, onClose }) {
  ModalContent.handleClickOutside = onClose
  return (
    <div className={styles.content}>
      <button
        className={styles['close-button']}
        onClick={onClose}
        type="button"
      >
        <img alt="Закрыть окно" src="/images/icons/cross.svg" />
      </button>
      {children}
    </div>
  )
}

const clickOutsideConfig = {
  handleClickOutside: () => ModalContent.handleClickOutside,
}

const ModalContentWithOutsideClick = onClickOutside(
  ModalContent,
  clickOutsideConfig,
)

function Modal({ children, onClose }) {
  Modal.handleClickOutside = onClose
  return (
    <Portal selector="#modal">
      <div className={styles.overlay}>
        <ModalContentWithOutsideClick onClose={onClose}>
          {children}
        </ModalContentWithOutsideClick>
      </div>
    </Portal>
  )
}

export default Modal
