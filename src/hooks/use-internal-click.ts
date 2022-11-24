import { useEffect } from 'react'

/** Тип функции для клика*/
type MouseEventHandler = (e: MouseEvent) => void

/** Типы для кликов внутрии и снаружи элемента*/
type Args = {
  onInternalClick?: MouseEventHandler,
  onExternalClick?: MouseEventHandler
}

/**
 * При каждом клике на элемент, в зависимости от того внутрениий или внешний клик, вызывает прокинутую функцию.
 * @constructor
 * @param {string} className - Класс по которому будет определяться элемент, в котором нужно отслеживать клики.
 * @param {Args} onInternalClick - Внутренний клик.
 * @param {Args} onExternalClick - Внешний клик.
 */
export const useInternalClick = (className: string, { onInternalClick, onExternalClick }: Args) => {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const isInternalClick = !!(e.target as Element).closest(`.${className}`)
      if (isInternalClick) {
        onInternalClick?.(e)
      } else {
        onExternalClick?.(e)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}