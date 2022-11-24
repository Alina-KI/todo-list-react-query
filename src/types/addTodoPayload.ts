import { FileItem } from './todoItem'

export type AddTodoPayload = {
  title: string
  text: string
  files: FileItem[]
  completionDate: string
}