import { drop } from '../../iterator/drop'
import type { Traversable } from '../../type/traversable'

export function* scanl<T, R>(reducer: (acc: R, val: T) => R, init: R, vals: Traversable<T>) {
    let acc = init
    yield acc
    for (const x of vals) {
        acc = reducer(acc, x)
        yield acc
    }
    return acc
}

export function* scanl1<T>(reducer: (acc: T, val: T) => T, vals: Traversable<T>) {
    yield* scanl(reducer, vals[Symbol.iterator]().next().value as T, drop(1, vals))
}
