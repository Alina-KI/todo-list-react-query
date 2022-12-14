import { useMutation } from '@tanstack/react-query'
import { addTodo, TODOS } from '../api/todos'
import { queryClient } from '../index'

/** Хук на добавление задачи */
export const useAddTodo = () => {
  const { mutate: addTodoMutation } = useMutation(addTodo, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([TODOS])
    }
  })

  return addTodoMutation
}