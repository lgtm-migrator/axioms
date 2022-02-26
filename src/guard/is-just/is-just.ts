import type { Maybe, Just } from '../../type/maybe'
import { nothingSymbolStr } from '../../type/maybe/maybe'

export function isJust<T>(x: Maybe<T>): x is Just<T> {
    return typeof x !== 'symbol' || Symbol.keyFor(x) !== nothingSymbolStr
}
