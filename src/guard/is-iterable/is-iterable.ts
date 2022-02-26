import type { Obj, Traversable } from '../../type'

export function isIterable<T, R, O extends Obj<O>>(x: O | Traversable<T, R>): x is Traversable<T, R> {
    return x !== null && (typeof x === 'string' || (typeof x === 'object' && Symbol.iterator in x))
}
