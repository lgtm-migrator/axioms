import type { Traversable } from '../../type'

export function any<T>(predicate: (x: T) => boolean, xs: Traversable<T>): boolean {
    for (const x of xs) {
        if (predicate(x)) {
            return true
        }
    }
    return false
}

export const some = any
