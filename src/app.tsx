import React  from 'react'
import './app.less'
import { Form } from './components/form/form'
import { Todo } from './components/todo/todo'
import { TodoItem } from './types/todoItem'
import { useGetTodos } from './hooks/useGetTodos'

/** Основная страница
 *  @constructor
 *  @return {jsx} разметка страницы
 * */
export const App = () => {
  const todos = useGetTodos()

  return (
    <div className="app">
      <Form buttonText='Добавить'/>
      <div className="todoBlock">
        {
          todos
          .sort((a: TodoItem, b: TodoItem) => b.creationDate - a.creationDate)
          .map(todo => <Todo todo={todo} key={todo.id}/>)
        }
      </div>
    </div>
  )
}