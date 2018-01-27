export default function singleKVObject (obj) {
  if (obj.constructor !== Object) {
    throw new Error('not Object')
  }

  const key = Object.keys(obj)[0]
  const value = obj[key]

  return { key, value }
}
