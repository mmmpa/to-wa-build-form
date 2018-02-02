import Vue from 'vue'
import ToWaSet from './ToWaSet'
import singleKVObject from '../libs/single-kv-object'

const ToWa = ToWaSet

ToWa.configure = function ({ ops, cols, defaultTable }) {
  // eslint-disable-next-line no-param-reassign
  const opsMap = ops.reduce((a, v) => (a[v.value] = v, a), {})
  // eslint-disable-next-line no-param-reassign
  const colsMap = cols.reduce((a, v) => (a[v.value] = v, a), {})
  Object.assign(this, { ops, cols, opsMap, colsMap, defaultTable })
}

ToWa.normalize = function (data) {
  if (data === null || data.constructor !== Object) {
    return data
  }

  const { key, value } = singleKVObject(data)

  if (ToWa.isLogical(key)) {
    return { [key]: value.map(v => ToWa.normalize(v)) }
  }

  if (value[0].constructor === Object) {
    const { key: k, value: v } = singleKVObject(value[0])
    return ToWa.isCol(k) && v[0] === ToWa.defaultTable
      ? [v[1], value[1]]
      : data
  }

  return value[0] === ToWa.defaultTable
    ? data
    : [{ col: value[0] }, value[1]]
}

ToWa.prepare = function (data) {
  if (data.constructor !== Object) {
    return data
  }

  const { key, value } = singleKVObject(data)

  if (ToWa.isLogical(key)) {
    return { [key]: value.map(v => ToWa.prepare(v)) }
  }

  return value[0].constructor === Object
    ? data
    : { [key]: [{ col: [ToWa.defaultTable, value[0]] }, value[1]] }
}

ToWa.isCol = function (op) {
  return op === 'col'
}

ToWa.isOperator = function (op) {
  return !!ToWa.opsMap[op]
}

ToWa.isLogical = function (op) {
  return ToWa.isOperator(op) && ToWa.opsMap[op].type === 'logical'
}

Vue.component('ToWa', ToWa)

export default ToWa
