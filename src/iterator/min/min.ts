import { isJust } from '../../guard'
import type { ComparablePrimitive, Just, Maybe, Traversable } from '../../type'
import { Nothing } from '../../type'
import { foldl1 } from '../fold'
import { map } from '../map'

export function min<T extends ComparablePrimitive, Ts extends readonly [T, ...T[]]>(xs: Ts): Just<Ts[number]>
export function min<T extends ComparablePrimitive, Ts extends [T, ...T[]]>(xs: Ts): Just<Ts[number]>
export function min<T extends ComparablePrimitive>(xs: Traversable<T>): Maybe<T>
export function min<T extends ComparablePrimitive>(xs: Traversable<T>): Maybe<T> {
    return foldl1((a, b) => (b < a ? b : a), xs)
}

export function minBy<T, Ts extends readonly [T, ...T[]]>(f: (item: T) => ComparablePrimitive, xs: Ts): Just<Ts[number]>
export function minBy<T, Ts extends [T, ...T[]]>(f: (item: T) => ComparablePrimitive, xs: Ts): Just<Ts[number]>
export function minBy<T>(f: (item: T) => ComparablePrimitive, xs: Traversable<T>): Maybe<T>
export function minBy<T>(f: (item: T) => ComparablePrimitive, xs: Traversable<T>): Maybe<T> {
    const xMin = foldl1(
        (acc, x) => (x[1] < acc[1] ? x : acc),
        map((x) => [x, f(x)] as const, xs)
    )
    return isJust(xMin) ? xMin[0] : Nothing
}
