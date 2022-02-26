import type { Traversable } from '../../type'

export function all<T>(predicate: (x: T) => boolean, xs: Traversable<T>): boolean {
    for (const x of xs) {
        if (!predicate(x)) {
            return false
        }
    }
    return true
}

export const every = all
