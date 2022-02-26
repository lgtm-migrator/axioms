import type { Maybe } from '../../type'
import { Nothing } from '../../type'
import type { Traversable } from '../../type/traversable'
import { reverse } from '../reverse'

export function findLast<T>(by: (item: T) => boolean, arr: Traversable<T>): Maybe<T> {
    for (const item of reverse(arr)) {
        if (by(item)) {
            return item
        }
    }
    return Nothing
}
