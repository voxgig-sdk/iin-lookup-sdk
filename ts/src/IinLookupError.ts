
import { Context } from './Context'


class IinLookupError extends Error {

  isIinLookupError = true

  sdk = 'IinLookup'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  IinLookupError
}

