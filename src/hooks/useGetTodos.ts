import { EMPTY_LIST } from '../api/api'
import { useQuery } from '@tanstack/react-query'
import { getTodos, TODOS } from '../api/todos'

export const useGetTodos = () => {
  const { data: todos = EMPTY_LIST } = useQuery([TODOS], getTodos, {
    retry: false,
    placeholderData: EMPTY_LIST
  })

  return todos
}