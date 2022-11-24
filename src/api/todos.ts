import { AddTodoPayload } from '../types/addTodoPayload'
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../index'
import { TodoItem } from '../types/todoItem'

export const TODOS = 'TODOS'

/** Функция запроса к базе данных на получение данных */
export const getTodos = async () => {
  const { docs } = await getDocs(collection(db, 'todos'))
  return docs.map(doc => ({ id: doc.id, ...doc.data() })) as TodoItem[]
}

/** Функция запроса к базе данных на удаление данных
 * @constructor
 * @param {string} id - id задачи
 * */
export const deleteTodos = async (id: string) => await deleteDoc(doc(db, 'todos', id))

/** Функция запроса к базе данных на добавление данных
 * @constructor
 * @param {string} title - Загаловок
 * @param {string} text - Описание
 * @param {FileItem} files - Файлы
 * @param {string} completionDate - Дата завершения задачи
 * */
export const addTodo = async ({ title, text, files, completionDate }: AddTodoPayload) => await addDoc(collection(db, 'todos'), {
  title,
  text,
  completionDate,
  creationDate: Date.now(),
  isSelected: false,
  files
})

/** Функция запроса к базе данных на изменение данных
 * @constructor
 * @param {TodoItem} todo - Деструктуризацией берётся id и все остальные данные из задачи
 * */
export const updateTodo = async ({ id,  ...todo }: TodoItem) => {
  await updateDoc(doc(db, 'todos', id), { id, ...todo })
}