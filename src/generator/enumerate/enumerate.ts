import { map } from '../../iterator/map'
import type { Traversable } from '../../type/traversable'

export function* enumerate<T>(xs: Traversable<T>): Traversable<[number, T], void> {
    yield* map((x, i) => [i, x], xs)
}
