import { head } from '../../array'
import { isArray } from '../../guard'
import type { Maybe, Traversable } from '../../type'
import { Nothing } from '../../type'
import { drop } from '../drop'

export type Nth<N extends number, T> = T extends readonly any[] ? T[N] : never

export function at<T>(n: 0, xs: T): T extends readonly [infer N0, ...unknown[]] ? N0 : Nothing
export function at<T>(n: 1, xs: T): T extends readonly [unknown, infer N1, ...unknown[]] ? N1 : Nothing
export function at<T>(n: 2, xs: T): T extends readonly [unknown, unknown, infer N2, ...unknown[]] ? N2 : Nothing
export function at<T, N extends number = number>(n: N, xs: Traversable<T>): Maybe<T>
export function at<T, N extends number = number>(n: N, xs: Traversable<T>): Maybe<T> {
    if (isArray<T>(xs)) {
        return n > xs.length ? Nothing : xs[n]
    }
    // slow iterator compatible version
    return head(drop(n, xs))
}

export function first<T>(xs: T): T extends readonly [infer N0, ...unknown[]] ? N0 : Nothing
export function first<T>(xs: Traversable<T>): Maybe<T>
export function first<T>(xs: Traversable<T>): Maybe<T> {
    return at(0, xs)
}

export function second<T>(xs: readonly [unknown, T, ...unknown[]]): T
export function second<T>(xs: Traversable<T>): Maybe<T>
export function second<T>(xs: Traversable<T>): Maybe<T> {
    return at(1, xs)
}

export function third<T>(xs: readonly [unknown, unknown, T, ...unknown[]]): T
export function third<T>(xs: Traversable<T>): Maybe<T>
export function third<T>(xs: Traversable<T>): Maybe<T> {
    return at(2, xs)
}
