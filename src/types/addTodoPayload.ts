import { FileItem } from './todoItem'

/** Тип Todo (Задачи) для изменения Todo (Задачи)*/
export type AddTodoPayload = {
  title: string
  text: string
  files: FileItem[]
  completionDate: string
}