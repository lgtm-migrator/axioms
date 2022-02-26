import type { InfiniteGenerator, Traversable } from '../../type'

export function filter<T>(by: (x: T) => boolean, xs: InfiniteGenerator<T>): InfiniteGenerator<T>
export function filter<S extends T, T>(by: (x: T) => x is S, xs: Traversable<T>): Traversable<S>
export function filter<T>(by: (x: T) => boolean, xs: Traversable<T>): Traversable<T>
export function* filter<T>(by: (x: T) => boolean, xs: Traversable<T>) {
    for (const x of xs) {
        if (by(x)) {
            yield x
        }
    }
}

export function filterWithMemory<S extends T, T>(by: (x: T, xs: S[], i: number) => x is S, xs: Traversable<T>): Traversable<S>
export function filterWithMemory<T>(by: (x: T, xs: T[], i: number) => boolean, xs: Traversable<T>): Traversable<T>
export function* filterWithMemory<T>(by: (x: T, xs: T[], i: number) => boolean, xs: Traversable<T>) {
    const memory: T[] = []
    let i = 0
    for (const x of xs) {
        if (by(x, memory, i++)) {
            memory.push(x)
            yield x
        }
    }
}
