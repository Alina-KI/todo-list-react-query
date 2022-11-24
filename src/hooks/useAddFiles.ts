import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../index'
import { useState } from 'react'
import { FileItem } from '../types/todoItem'

/** Хук на добавление файлов */
export const useAddFiles = () => {
  const [files, setFiles] = useState<File | null>()
  const [filesUrl, setFilesUrl] = useState<FileItem[]>([])

  /** Функция, которая создаёт в storage файл */
  const addedFiles = () => {
    if (!files) return
    const name = Date.now().toString()
    const storageRef = ref(storage, `files/${name}`)
    const uploadTask = uploadBytesResumable(storageRef, files)

    uploadTask.on('state_changed',
      (snapshot) => console.log(snapshot),
      (error: Error) => console.log(error.message),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFilesUrl([...filesUrl, { name, path: downloadURL }])
        })
      }
    )
  }

  return {
    setFiles,
    filesUrl,
    addedFiles
  }
}