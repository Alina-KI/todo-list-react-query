import React, { useRef, useState } from 'react'
import './form.less'
import { useMutation } from '@tanstack/react-query'
import { addTodo, TODOS } from '../../api/todos'
import { queryClient, storage } from '../../index'
import { EMPTY_LIST } from '../../api/api'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'

export const Form = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [file, setFile] = useState<File | null>()
  const [filesUrl, setFilesUrl] = useState<string[]>([])
  const [progressPercent, setProgressPercent] = useState(0)

  const { mutate: addTodoMutation } = useMutation(addTodo, {
    onSuccess: (addedTodo) => {
      queryClient.setQueryData(
        [TODOS],
        (prev: any = EMPTY_LIST) => [addedTodo, ...prev]
      )
    }
  })

  const addedFiles = () => {
    if (!file) return
    const storageRef = ref(storage, `files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setProgressPercent(progress)
      },
      (error: Error) => console.log(error.message),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
         setFilesUrl([...filesUrl, downloadURL])
        })
      }
    )
  }

  return (
    <div className="form">
      <div className="leftBlockForm">
        <div className="blockText">
          <h2 className="title">Заголовок</h2>
          <input className="input" type="text" ref={inputRef}/>
        </div>
        <div className="blockText">
          <h2 className="title">Описание</h2>
          <textarea className="input" ref={textAreaRef}/>
        </div>
        <button className="addButton" onClick={() =>  addTodoMutation({
            title: inputRef.current!.value,
            text: textAreaRef.current!.value,
            file: filesUrl
          }
        )}>
          Добавить
        </button>
      </div>
      <div className="rightBlockForm">
        <div className='filesBlockForm'>
          <input type="file" onChange={(event) => setFile(event.target.files![0])}/>
          <button onClick={() => addedFiles()}>Добавить файл</button>
        </div>
      </div>
    </div>
  )
}