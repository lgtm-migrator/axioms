import { next } from '../../generator/next'
import { isRight } from '../../guard/is-right'
import type { Maybe } from '../../type/maybe'
import { Nothing } from '../../type/maybe'
import type { Traversable, Traverser } from '../../type/traversable'
import { take } from '../take'

export function splitAt<T>(at: number, xs: Traversable<T>): [T[], Traverser<T>] {
    const takeIterator = take(at, xs)
    const first = []
    let it = next(takeIterator)
    while (isRight(it)) {
        first.push(it.right)
        it = next(takeIterator)
    }
    const rest = it.left
    return [first, rest]
}

export function splitLast<T>(xs: Traversable<T>): [T[], Maybe<T>] {
    const array = [...xs]
    const last = array.length > 0 ? array.pop()! : Nothing
    return [array, last]
}
