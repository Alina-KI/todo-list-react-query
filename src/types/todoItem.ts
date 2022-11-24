/** Тип Todo (Задачи) */
export type TodoItem = {
  id: string
  title: string
  text: string
  isSelected: boolean
  completionDate: string
  creationDate: number
  files: FileItem[]
}

/** Тип файла */
export type FileItem = {
  name: string
  path: string
}