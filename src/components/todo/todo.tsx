import React, { useState } from 'react'
import './todo.less'
import { TodoItem } from '../../types/todoItem'
import { useUpdateTodo } from '../../hooks/useUpdateTodo'
import { useDeleteTodo } from '../../hooks/useDeleteTodo'
import { EditTodoModal } from '../editTodoModal/editTodoModal'
import dayjs from 'dayjs'
import { FilesTodoModal } from '../filesTodoModal/filesTodoModal'

type Props = {
  todo: TodoItem
}

/** Отображение Задачи
 * @constructor
 * @param {TodoItem} todo - Текущая задача для отображения
 * @return {jsx} разметка страницы
 * */
export const Todo = ({ todo }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenFilesModal, setIsOpeFilesModal] = useState(false)
  const updateTodo = useUpdateTodo()
  const deleteTodo = useDeleteTodo()
  const isSelected = todo.isSelected || dayjs(todo.completionDate) <= dayjs()

  return (
    <div className={`todo ${isSelected && `chooseTodo`}`} key={todo?.id}>
      <input
        type="checkbox" checked={isSelected}
        onChange={() => updateTodo({ ...todo, isSelected: !todo.isSelected })}/>
      <div className="todoTextBlock" onDoubleClick={() => setIsOpenModal(true)}>
        <h2 className="textTodo">{todo.title}</h2>
        <h3 className="textTodo">{todo.text}</h3>
        <span className='textTodo'>{dayjs(todo.completionDate).format('ddd, MMM D, YYYY h:mm A')}</span>
      </div>
      <button className="showFilesButtonTodo" onClick={() => setIsOpeFilesModal(true)}>Посмотреть Файлы</button>
      <button className="deleteButtonTodo" onClick={() => deleteTodo(todo.id)}>Удалить</button>
      <EditTodoModal todo={todo} isOpen={isOpenModal} setIsOpen={setIsOpenModal}/>
      <FilesTodoModal todo={todo} isOpen={isOpenFilesModal} setIsOpen={setIsOpeFilesModal}/>
    </div>
  )
}