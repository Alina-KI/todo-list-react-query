import { useMutation } from '@tanstack/react-query'
import { TODOS, updateTodo } from '../api/todos'
import { queryClient } from '../index'
import { TodoItem } from '../types/todoItem'
import { EMPTY_LIST } from '../api/api'

/** Хук, который изменяет данные в задачи
 * @constructor
 * @param {() => {}} closeModal - Функция, которая закрывает модальное окно
 * */
export const useUpdateTodo = (closeModal?: () => void) => {
  const { mutate: updateTodoMutation } = useMutation(updateTodo, {
    onSuccess: (updatedTodo, { id, ...todo }) => {
      queryClient.setQueryData(
        [TODOS],
        (prev: TodoItem[] = EMPTY_LIST) => prev.map(item => {
          if (item.id === id)
            return { id, ...todo }
          return item
        })
      )
      if (closeModal) {
        closeModal()
      }
    }
  })

  return updateTodoMutation
}