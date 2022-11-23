import React from 'react'
import './todo.less'
import { TodoItem } from '../../types/todo-item'

type Props = {
  todo?: TodoItem
}

export const Todo = ({ todo }: Props) => {

  return (
    <div className={`todo ${true && `chooseTodo`}`} key={todo?.id}>
      {/*<div className="top">*/}
        <input type="checkbox" className="checkBox"/>
        <div className='todoTextBlock'>
          <h2 className='text'>hjkhi{todo?.title}</h2>
          <h3 className='text'>hjkhi{todo?.text}</h3>
        </div>
      {/*</div>*/}
      <button className="button">Deleted</button>
    </div>
  )
}