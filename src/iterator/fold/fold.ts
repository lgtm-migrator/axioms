import { isJust } from '../../guard/is-just'
import type { Maybe } from '../../type/maybe'
import { Nothing } from '../../type/maybe'
import { toTraversable } from '../../type/traversable'
import type { Traversable } from '../../type/traversable'
import { uncons } from '../uncons'

export function foldl<T, R = T>(reducer: (acc: R, val: T) => R, init: R, xs: Traversable<T>): R {
    let acc = init
    for (const x of xs) {
        acc = reducer(acc, x)
    }
    return acc
}

export function foldl1<T>(reducer: (acc: T, val: T) => T, xs: Traversable<T>): Maybe<T> {
    const [head, rest] = uncons(xs)
    // if first is undefined due to the length of the Iterable
    // the result will be an empty array
    if (isJust(head)) {
        return foldl(reducer, head, toTraversable(rest))
    }
    return Nothing
}

export const reduce = foldl
