import type { Traversable } from '../../type/traversable'
import { foldl } from '../fold'

export function groupBy<T, K extends PropertyKey>(group: (val: T) => K, xs: Traversable<T>): Record<K, T[]> {
    return foldl(
        (r, v) => {
            const k = group(v)
            r[k] ??= []
            r[k].push(v)
            return r
        },
        {} as Record<K, T[]>,
        xs
    )
}
