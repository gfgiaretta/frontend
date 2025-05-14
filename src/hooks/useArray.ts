import { useState } from 'react'

export function useArray<T>(initial: T[] = []) {
  const [array, setArray] = useState<T[]>(initial)

  return {
    array,
    set: setArray,
    push: (item: T) => setArray((a) => [...a, item]),
    removeAt: (index: number) =>
      setArray((a) => a.filter((_, i) => i !== index)),
    remove: (item: T) => setArray((a) => a.filter((i) => i !== item)),
    clear: () => setArray([]),
    updateAt: (index: number, newItem: T) =>
      setArray((a) => a.map((item, i) => (i === index ? newItem : item))),
    length: array.length,
    contains: (item: T) => array.includes(item),
    indexOf: (item: T) => array.indexOf(item),
  }
}
