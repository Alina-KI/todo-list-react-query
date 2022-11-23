import React, { useRef } from 'react'
import './form.less'

export const Form = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  return (
    <div className="form">
      <div className="blockText">
        <h1 className="title">Заголовок</h1>
        <input className="input" type="text" ref={inputRef}/>
      </div>
      <div className="blockText">
        <h2 className="title">Описание</h2>
        <textarea className="input" ref={textAreaRef}/>
      </div>
      <button className="addButton">Добавить</button>
    </div>
  )
}