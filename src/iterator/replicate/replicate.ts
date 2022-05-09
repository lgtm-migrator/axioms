import { repeat } from '../../generator/repeat'
import { filterWithMemory } from '../filter'
import { take } from '../take'

export function* replicate<T>(n: number, val: T | ((i: number) => T)): Generator<T> {
    yield* take(n, repeat(val))
}

export function* replicateWithMemory<T>(
    predicate: (x: T, xs: T[], i: number, skippedInRow: number) => boolean,
    n: number,
    x: (i: number) => T
): Generator<T> {
    yield* take(n, filterWithMemory(predicate, repeat(x)))
}
