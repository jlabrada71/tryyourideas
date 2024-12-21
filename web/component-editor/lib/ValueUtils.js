import { EditorStyles } from "./EditorConstants"
export function removeTag(value, tagDelimiter = '-') {
  if (! tagDelimiter.endsWith('-')) tagDelimiter = tagDelimiter + '-'
  return value === EditorStyles.UNSET ? value : value.substring(value.indexOf(tagDelimiter) + tagDelimiter.length)
}

export function taggedValue(value, tag) {
  return value === EditorStyles.UNSET ? value : `${tag}-${value}`
}