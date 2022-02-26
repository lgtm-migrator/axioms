import { mapValues } from '../..'
import { evaluate } from '../../function'
import { isDefined } from '../../guard'
import { isLeft } from '../../guard/is-left'
import { unique } from '../../iterator'
import type { Dict, Obj } from '../../type'
import type { Either } from '../../type/either'
import { Nothing } from '../../type/maybe'

export interface Memoized<T> {
    (): T
    clear: () => void
}

export function memoize<T>(getter: T | (() => T)): Memoized<T> {
    let value: Either<unknown, T> = { left: Nothing }
    const memoized: Memoized<T> = () => {
        if (isLeft(value)) {
            value = { right: evaluate(getter) }
        }
        return value.right
    }

    memoized.clear = () => {
        value = { left: Nothing }
    }
    return memoized
}

export type MemoizeAttributes<T extends Dict<() => unknown>> = { [K in keyof T]: Memoized<T[K]> }
export function memoizeAttributes<T extends Dict<() => unknown>>(x: T): MemoizeAttributes<T> {
    return mapValues(memoize, x) as MemoizeAttributes<T>
}

export function memoizeGetters<T extends Obj<T> & { clear?: never }>(x: T): Omit<T, 'clear'> & { clear: (k: keyof T) => void } {
    const memoized = [...unique([...Object.keys(x), ...Object.getOwnPropertyNames(x)])].reduce<Partial<Omit<T, 'clear'>>>(
        (y, k) => {
            const prop = Object.getOwnPropertyDescriptor(x, k)
            if (isDefined(prop)) {
                Object.defineProperty(y, k, 'get' in prop ? { ...prop, get: memoize(() => prop?.get?.() as unknown) } : prop)
            }
            return y
        },
        {}
    ) as Omit<T, 'clear'> & { clear: (k: keyof T) => void }
    memoized.clear = (k: keyof T) => {
        const prop = Object.getOwnPropertyDescriptor(memoized, k)
        ;(prop?.get as Memoized<unknown>)?.clear?.()
    }

    return memoized
}
