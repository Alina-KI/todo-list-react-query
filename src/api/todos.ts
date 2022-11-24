import { AddTodoPayload } from '../types/addTodoPayload'
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../index'
import { TodoItem } from '../types/todoItem'

export const TODOS = 'TODOS'

export const getTodos = async () => {
  const { docs } = await getDocs(collection(db, 'todos'))
  return docs.map(doc => ({ id: doc.id, ...doc.data() })) as TodoItem[]
}

export const deleteTodos = async (id: string) => await deleteDoc(doc(db, 'todos', id))

export const addTodo = async ({ title, text, files, completionDate }: AddTodoPayload) => await addDoc(collection(db, 'todos'), {
  title,
  text,
  completionDate,
  creationDate: Date.now(),
  isSelected: false,
  files
})

export const updateTodo = async ({ id,  ...todo }: TodoItem) => {
  await updateDoc(doc(db, 'todos', id), { id, ...todo })
}