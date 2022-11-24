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