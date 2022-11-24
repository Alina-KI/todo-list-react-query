import React from 'react'
import './editTodoModal.less'
import { Form } from '../form/form'
import { TodoItem } from '../../types/todoItem'
import { useInternalClick } from '../../hooks/use-internal-click'

type Props = {
  todo: TodoItem
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

/** Модальное окно для изменения данных
 * @constructor
 * @param {TodoItem} todo - Текущая задача для изменения
 * @param {boolean} isOpen - Условие на открытие модального окна
 * @param {(isOpen: boolean) => void} setIsOpen - Изменение условия открытия модального окна
 * @return {jsx} разметка страницы
 * */
export const EditTodoModal = ({ todo, isOpen, setIsOpen }: Props) => {
  useInternalClick('formEditTodoModal', {
      onExternalClick: () => setIsOpen(false)
    }
  )

  return (
    isOpen
      ?
      <div className="editTodoModal">
        <div className="formEditTodoModal">
          <Form buttonText="Изменить" todo={todo} closeModal={() => setIsOpen(false)}/>
        </div>
      </div>
      :
      null
  )
}