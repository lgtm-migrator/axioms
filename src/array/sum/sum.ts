import { foldl } from '../../iterator/fold'
import type { Traversable } from '../../type/traversable'

export function sum(xs: Traversable<number>): number {
    return foldl((a, b): number => a + b, 0, xs)
}
