import React from 'react'
import './todo.less'
import { TodoItem } from '../../types/todoItem'
import { useMutation } from '@tanstack/react-query'
import { deleteTodos, TODOS, updateTodo } from '../../api/todos'
import { queryClient } from '../../index'
import { EMPTY_LIST } from '../../api/api'

type Props = {
  todo: TodoItem
}

export const Todo = ({ todo }: Props) => {
  const { mutate: updateTodoMutation } = useMutation(updateTodo, {
    onSuccess: (updatedTodo, { id }) => {
      queryClient.setQueryData(
        [TODOS],
        (prev: TodoItem[] = EMPTY_LIST) => prev.map(item => {
          if (item.id === id)
            return { ...item, isSelected: !item.isSelected }
          return item
        })
      )
    }
  })

  const { mutate: deleteTodoMutation } = useMutation(deleteTodos, {
    onSuccess: (deletedTodo, id) => {
      queryClient.setQueryData(
        [TODOS],
        (prev: TodoItem[] = EMPTY_LIST) => prev.filter(item => item.id !== id)
      )
    }
  })

  return (
    <div className={`todo ${todo.isSelected && `chooseTodo`}`} key={todo?.id}>
      <input
        type="checkbox" defaultChecked={todo.isSelected || todo.completionDate === Date.now()}
        onClick={() => updateTodoMutation({ ...todo, isSelected: !todo.isSelected })}/>
      <div className="todoTextBlock">
        <h2 className="text">{todo.title}</h2>
        <h3 className="text">{todo.text}</h3>
      </div>
      <button className="button" onClick={() => deleteTodoMutation(todo.id)}>
        Deleted
      </button>
    </div>
  )
}