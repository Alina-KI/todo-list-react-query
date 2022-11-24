import React from 'react'
import './filesTodoModal.less'
import { TodoItem } from '../../types/todoItem'
import { useDeleteFile } from '../../hooks/useDeleteFile'

type Props = {
  todo: TodoItem
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

/** Модальное окно для просмотра и удаление файлов(картинок)
 * @constructor
 * @param {TodoItem} todo - Текущая задача для изменения
 * @param {boolean} isOpen - Условие на открытие модального окна
 * @param {(isOpen: boolean) => void} setIsOpen - Изменение условия открытия модального окна
 * @return {jsx} разметка страницы
 * */
export const FilesTodoModal = ({ todo, isOpen, setIsOpen }: Props) => {
  const deleteFile = useDeleteFile()

  return (
    isOpen
      ?
      <div className="filesTodoModal">
        <div className="formFilesTodoModal">
          {todo.files.map(file =>
            <button className="downloadFileButton" key={file.name}
                    onClick={() => deleteFile({ file: file, todo: todo })}>
              <img className="image" src={file.path} alt=""/>
            </button>
          )}
          <button className='cross' onClick={() => setIsOpen(false)}>X</button>
        </div>
      </div>
      :
      null
  )
}