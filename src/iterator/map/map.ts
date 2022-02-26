import type { Traversable } from '../../type'

export function* map<T, R = T>(f: (x: T, i: number) => R, xs: Traversable<T>): Traversable<R, void> {
    let i = 0
    for (const x of xs) {
        yield f(x, i)
        ++i
    }
}
