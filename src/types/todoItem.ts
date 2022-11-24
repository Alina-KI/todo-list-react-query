export type TodoItem = {
  id: string
  title: string
  text: string
  isSelected: boolean
  completionDate: string
  creationDate: number
  files: FileItem[]
}

export type FileItem = {
  name: string
  path: string
}