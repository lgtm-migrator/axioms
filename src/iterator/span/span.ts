import { next } from '../../generator/next'
import { isRight } from '../../guard/is-right'
import type { Traversable, Traverser } from '../../type/traversable'
import { takeWhile } from '../take'

export function span<T, R>(predicate: (x: T) => boolean, xs: Traversable<T, R>): [T[], Traverser<T, R>] {
    const takeIterator = takeWhile(predicate, xs)
    const first = []
    let it = next(takeIterator)
    while (isRight(it)) {
        first.push(it.right)
        it = next(takeIterator)
    }
    const rest = it.left
    return [first, rest]
}
