import React, { useRef } from 'react'
import './form.less'
import { useAddTodo } from '../../hooks/useAddTodo'
import { useAddFiles } from '../../hooks/useAddFiles'
import { TodoItem } from '../../types/todoItem'
import { useUpdateTodo } from '../../hooks/useUpdateTodo'
import dayjs from 'dayjs'

type Props = {
  buttonText: string
  todo?: TodoItem
  closeModal?: () => void
}

export const Form = ({ todo, buttonText, closeModal }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const dateInputRef = useRef<HTMLInputElement>(null)
  const addTodo = useAddTodo()
  const updateTodo = useUpdateTodo(closeModal)
  const { filesUrl, setFiles, addedFiles } = useAddFiles()
  const isUpdate = !!todo

  return (
    <div className="form">
      <div className="blockForm">
        <div className="leftBlockForm">
          <div className="blockTextForm">
            <h2 className="titleForm">Заголовок</h2>
            <input className="inputForm" type="text" ref={inputRef} placeholder={todo?.title}/>
          </div>
          <div className="blockTextForm">
            <h2 className="titleForm">Описание</h2>
            <textarea className="inputForm" ref={textAreaRef} placeholder={todo?.text}/>
          </div>
        </div>
        <div className="rightBlockForm">
          <input className="dateInputForm" type="datetime-local" ref={dateInputRef}
                 placeholder={dayjs(todo?.completionDate).format('ddd, MMM D, YYYY h:mm A')}/>
          <div className="filesBlockForm">
            <input className="fileInputForm" type="file" min="2022-11-07T00:00"
                   onChange={(event) => setFiles(event.target.files![0])}/>
            <button className="addFileButtonForm" onClick={() => addedFiles()}>Добавить файл</button>
          </div>
        </div>
      </div>
      <button className="addButtonForm" onClick={() => {
        isUpdate
          ? updateTodo({
            ...todo,
            title: inputRef.current!.value === '' ? todo.title : inputRef.current!.value,
            text: textAreaRef.current!.value === '' ? todo.text : textAreaRef.current!.value,
            completionDate: dateInputRef.current!.value === '' ? todo.completionDate : dateInputRef.current!.value,
            files: [...todo.files, ...filesUrl]
          })
          : addTodo({
              title: inputRef.current!.value,
              text: textAreaRef.current!.value,
              completionDate: dateInputRef.current!.value === '' ? Date.now().toString() : dateInputRef.current!.value,
              files: filesUrl
            }
          )
        inputRef.current!.value = ''
        textAreaRef.current!.value = ''
        dateInputRef.current!.value = ''
      }}>
        {buttonText}
      </button>
    </div>
  )
}