import { useMutation } from '@tanstack/react-query'
import { deleteTodos, TODOS } from '../api/todos'
import { queryClient } from '../index'
import { TodoItem } from '../types/todoItem'
import { EMPTY_LIST } from '../api/api'

export const useDeleteTodo = () => {
  const { mutate: deleteTodoMutation } = useMutation(deleteTodos, {
    onSuccess: (deletedTodo, id) => {
      queryClient.setQueryData(
        [TODOS],
        (prev: TodoItem[] = EMPTY_LIST) => prev.filter(item => item.id !== id)
      )
    }
  })
  return deleteTodoMutation
}