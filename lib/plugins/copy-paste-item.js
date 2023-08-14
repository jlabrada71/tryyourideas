import { clone } from '@/lib/editor/utils.js'
import { getNextChildId, recalculateChildrenIds } from '@/lib/editor/components.js'

const clipboard = []

export function copyItem(item) {
  clipboard[0]  = clone(item)
}

export function isClipboardEmpty() {
  return !clipboard[0] 
} 

export function pasteInto(item) {
  const newItem = clone(clipboard[0])
  newItem.id = getNextChildId(item)
  recalculateChildrenIds(newItem)
  item.children.push(newItem)
}

export function pasteStyleInto(item) {
  const newItem = clone(clipboard[0])
  item.classes = newItem.classes
  item.currentClass = newItem.currentClass
}
