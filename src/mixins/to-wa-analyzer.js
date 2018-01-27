import singleKVObject from '../libs/single-kv-object'
import ToWa from '../components/ToWa'

export default function toWaAnalyzer (propName) {
  return {
    beforeCreate () {
      this.ToWa = ToWa
    },
    computed: {
      _toWaObject () {
        return singleKVObject(this[propName])
      },
      operator () {
        return this._toWaObject.key
      },
      lrOrExes () {
        return this._toWaObject.value
      },
      isLogical () {
        return ToWa.isLogical(this.operator)
      },
      isOperator () {
        return ToWa.isOperator(this.operator)
      },
    }
  }
}
