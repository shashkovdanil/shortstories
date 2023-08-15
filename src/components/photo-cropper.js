import { meFragment, userFragment } from '@/graphql/fragments'
import { POST_PHOTO_MUTATION } from '@/graphql/mutations'
import { useMutation } from '@apollo/client'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import ReactCrop, { makeAspectCrop } from 'react-image-crop'

import Button from './button'
import styles from './styles/photo-cropper.module.css'

const Dropzone = dynamic(() => import('react-dropzone'), { ssr: false })

const imageMaxSize = 10000000 // bytes
const acceptedFileTypes =
  'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes
  .split(',')
  .map(type => type.trim())

function validateFiles(files) {
  if (files && files.length > 0) {
    const { size, type } = files[0]
    if (size > imageMaxSize) {
      console.error('Размер файла должен быть меньше 10 МБ') // eslint-disable-line
      return false
    }
    if (!acceptedFileTypesArray.includes(type)) {
      console.error('Можно выбрать только изображение') // eslint-disable-line
      return false
    }
    return true
  }
  return null
}

function PhotoCropper({ cb, userId }) {
  const [img, setImg] = useState(null)
  const [file, setFile] = useState(null)
  const [previewImg, setPreviewImg] = useState({
    naturalHeight: 0,
    naturalWidth: 0,
  })
  const [crop, setCrop] = useState({
    aspect: 1 / 1,
    height: 120,
    width: 120,
    x: 0,
    y: 0,
  })

  const onDrop = acceptedFiles => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const isVerified = validateFiles(acceptedFiles)
      if (isVerified) {
        const [firstFile] = acceptedFiles
        const reader = new FileReader()
        setFile(firstFile)
        reader.addEventListener(
          'load',
          () => {
            setImg(reader.result)
          },
          false,
        )
        reader.readAsDataURL(firstFile)
      }
    }
  }

  const [postPhoto, { loading }] = useMutation(POST_PHOTO_MUTATION, {
    update: (cache, mutationResult) => {
      const me = cache.readFragment({
        fragment: meFragment,
        id: 'Me',
      })
      const user = cache.readFragment({
        fragment: userFragment,
        id: `User:${userId}`,
      })
      cache.writeFragment({
        data: {
          ...me,
          photo: mutationResult.data.postPhoto.photo,
        },
        fragment: meFragment,
        id: 'Me',
      })

      if (Object.keys(user).length > 0) {
        cache.writeFragment({
          data: {
            ...user,
            photo: mutationResult.data.postPhoto.photo,
          },
          fragment: userFragment,
          id: `User:${userId}`,
        })
      }
    },
    variables: {
      file,
      height: crop.height * (previewImg.naturalHeight / previewImg.height),
      width: crop.width * (previewImg.naturalWidth / previewImg.width),
      x: crop.x * (previewImg.naturalWidth / previewImg.width),
      y: crop.y * (previewImg.naturalHeight / previewImg.height),
    },
  })

  return (
    <section className={styles.wrapper}>
      {img === null ? (
        <Dropzone
          accept={acceptedFileTypes}
          maxSize={imageMaxSize}
          multiple={false}
          onDrop={onDrop}
        >
          {({ getInputProps, getRootProps }) => (
            <div {...getRootProps({ className: styles.dropzone })}>
              <input {...getInputProps()} />
              <img alt="Загрузите изображение" src="/images/icons/upload.svg" />
              <p>Загрузите изображение</p>
            </div>
          )}
        </Dropzone>
      ) : (
        <div className={styles.crop}>
          <ReactCrop
            onChange={cropObj => {
              setCrop(cropObj)
            }}
            onImageLoaded={image => {
              setCrop(
                makeAspectCrop(
                  {
                    aspect: 1 / 1,
                    height: 120,
                    width: 120,
                    x: 0,
                    y: 0,
                  },
                  image.naturalWidth / image.naturalHeight,
                ),
              )
              setPreviewImg(image)
            }}
            crop={crop}
            keepSelection
            minHeight={120}
            minWidth={120}
            src={img}
          />
          <div className={styles.buttons}>
            <button
              onClick={() => {
                setImg(null)
              }}
              className={styles['other-photo-button']}
              type="button"
            >
              Другое фото
            </button>
            <Button
              onClick={async () => {
                await postPhoto()
                cb()
              }}
              black
              loading={loading}
            >
              Сохранить
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}

export default PhotoCropper
