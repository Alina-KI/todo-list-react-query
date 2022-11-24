import { deleteObject, ref } from 'firebase/storage'
import { storage } from '../index'
import { useUpdateTodo } from './useUpdateTodo'
import { FileItem, TodoItem } from '../types/todoItem'

type Props = {
  file: FileItem
  todo: TodoItem
}

export const useDeleteFile = () => {
  const updateTodo = useUpdateTodo()

  const deleteFile = async ({file, todo}: Props) => {
    const storageRef = ref(storage, `files/${file.name}`)
    console.log(storageRef)
    await deleteObject(storageRef)
    updateTodo({
      ...todo,
      files: todo.files.filter(file => file.path != file.path)
    })
  }

  return deleteFile
}