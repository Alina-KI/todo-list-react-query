import React from 'react'
import './todo.less'
import { TodoItem } from '../../types/todo-item'

type Props = {
  todo?: TodoItem
}

export const Todo = ({ todo }: Props) => {

  return (
    <div className="todo chooseTodo" key={todo?.id}>
      <div className="top">
        <input type="checkbox" className="checkBox"/>
        <span>{todo?.text}</span>
      </div>
      <button className="button">Deleted</button>
    </div>
  )
}