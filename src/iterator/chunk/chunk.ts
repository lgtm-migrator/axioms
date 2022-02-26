import { toTraversable } from '../../type/traversable'
import type { Traversable } from '../../type/traversable'
import { itrampoline } from '../../util/trampoline'
import type { RecurrentGenerator } from '../../util/trampoline'
import { splitAt } from '../split'

function _chunk<T>(size: number, xs: Traversable<T>): RecurrentGenerator<T[]> {
    const [init, rest] = splitAt(size, xs)
    return [init, init.length > 0 ? () => _chunk(size, toTraversable(rest)) : undefined]
}

export function* chunk<T>(size: number, xs: Traversable<T>): Generator<T[]> {
    yield* itrampoline(_chunk)(size, xs)
}
