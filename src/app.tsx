import React, { useRef } from 'react'
import './app.less'
import { Todo } from './components/todo/todo'

export const App = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      if (inputRef.current!.value !== '') {
        console.log(1)
      }
      inputRef.current!.value = ''
    }
  }

  return (
    <div className="app">
      <div className="form">
        <input className="input" type="text" ref={inputRef} onKeyDown={handleKeyDown}/>
        <button className="addButton">Добавить</button>
      </div>
      {/*{todos.map(todo => <Todo todo={todo} key={todo.id}/>)}*/}
      <Todo/>
    </div>
  )
}