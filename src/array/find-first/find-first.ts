import type { Traversable, Maybe } from '../../type'
import { Nothing } from '../../type'

export function findFirst<T>(by: (item: T) => boolean, arr: Traversable<T>): Maybe<T> {
    for (const item of arr) {
        if (by(item)) {
            return item
        }
    }
    return Nothing
}
