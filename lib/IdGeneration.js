export function getNextId(items) {
  const max = items.reduce((a, v) => Number(v.id) > a ? Number(v.id) : a, 0)
  return max + 1
}