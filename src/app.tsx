import React  from 'react'
import './app.less'
import { Form } from './components/form/form'
import { useQuery } from '@tanstack/react-query'
import { getTodos, TODOS } from './api/todos'
import { EMPTY_LIST } from './api/api'
import { Todo } from './components/todo/todo'
import { TodoItem } from './types/todoItem'

export const App = () => {
  const { data: todos = EMPTY_LIST } = useQuery([TODOS], getTodos, {
    retry: false,
    placeholderData: EMPTY_LIST
  })

  return (
    <div className="app">
      <Form/>
      <div className="todoBlock">
        {
          todos
          .sort((a: TodoItem, b: TodoItem) => a.creationDate - b.creationDate)
          .map(todo => <Todo todo={todo} key={todo.id}/>)
        }
      </div>
    </div>
  )
}