import { head } from '../../array'
import { isArray } from '../../guard'
import type { Maybe, Traversable } from '../../type'
import { Nothing } from '../../type'
import { drop } from '../drop'

export function at<T extends any[]>(n: 0, xs: readonly [...T]): T extends [infer N0, ...unknown[]] ? N0 : Nothing
export function at<T extends any[]>(n: 1, xs: readonly [...T]): T extends [unknown, infer N1, ...unknown[]] ? N1 : Nothing
export function at<T extends any[]>(
    n: 2,
    xs: readonly [...T]
): T extends [unknown, unknown, infer N2, ...unknown[]] ? N2 : Nothing
export function at<T, N extends number = number>(n: N, xs: Traversable<T>): Maybe<T>
export function at<T, N extends number = number>(n: N, xs: Traversable<T>): Maybe<T> {
    if (isArray<T>(xs)) {
        return n > xs.length ? Nothing : xs[n]
    }
    // slow iterator compatible version
    return head(drop(n, xs))
}

export function first<T extends any[]>(xs: readonly [...T]): T extends [infer N0, ...unknown[]] ? N0 : Nothing
export function first<T>(xs: Traversable<T>): Maybe<T>
export function first<T>(xs: Traversable<T>): Maybe<T> {
    return at(0, xs)
}

export function second<T extends any[]>(xs: readonly [...T]): T extends [unknown, infer N1, ...unknown[]] ? N1 : Nothing
export function second<T>(xs: Traversable<T>): Maybe<T>
export function second<T>(xs: Traversable<T>): Maybe<T> {
    return at(1, xs)
}

export function third<T extends any[]>(xs: readonly [...T]): T extends [unknown, unknown, infer N2, ...unknown[]] ? N2 : Nothing
export function third<T>(xs: Traversable<T>): Maybe<T>
export function third<T>(xs: Traversable<T>): Maybe<T> {
    return at(2, xs)
}
