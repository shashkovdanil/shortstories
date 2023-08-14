import dynamic from 'next/dynamic'
import React, { useState } from 'react'

import { getPhoto } from '../lib/helpers'
import PhotoCropper from './photo-cropper'
import styles from './styles/edit-photo.css'

const Modal = dynamic(() => import('./modal'), { ssr: false })

function EditPhoto({ me }) {
  const [isOpen, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => {
          setOpen(true)
        }}
        className={styles.button}
        type="button"
      >
        <img
          alt={me.username}
          className={styles.avatar}
          src={getPhoto(me.photo)}
        />
        <div className={styles.blur}>
          <img
            alt=""
            className={styles['photo-icon']}
            src="/images/icons/photo.svg"
          />
        </div>
      </button>
      {isOpen && (
        <Modal
          onClose={() => {
            setOpen(false)
          }}
        >
          <PhotoCropper
            cb={() => {
              setOpen(false)
            }}
            userId={me.id}
          />
        </Modal>
      )}
    </>
  )
}

export default EditPhoto
