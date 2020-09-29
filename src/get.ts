import { varget as baseGet } from './varget'

export type KeyOf<O> = O extends unknown[] ? number : O extends object ? keyof O : never
export type ValueOf<O, K extends KeyOf<O>> = O extends undefined | null
    ? undefined
    : O extends Array<infer I>
    ? I | undefined
    : K extends keyof O
    ? O[K]
    : undefined

// Five arguments
export function get<
    O extends object,
    K1 extends KeyOf<O>,
    K2 extends KeyOf<ValueOf<O, K1>>,
    K3 extends KeyOf<ValueOf<ValueOf<O, K1>, K2>>,
    K4 extends KeyOf<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>>,
    K5 extends KeyOf<ValueOf<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>, K4>>,
    F extends Partial<ValueOf<ValueOf<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>, K4>, K5>> = ValueOf<
        ValueOf<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>, K4>,
        K5
    >
>(
    obj: O | undefined | null,
    key: [K1, K2, K3, K4, K5],
    fallback: NonNullable<F>
): NonNullable<ValueOf<ValueOf<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>, K4>, K5> | F>
export function get<
    O extends object,
    K1 extends KeyOf<O>,
    K2 extends KeyOf<ValueOf<O, K1>>,
    K3 extends KeyOf<ValueOf<ValueOf<O, K1>, K2>>,
    K4 extends KeyOf<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>>,
    K5 extends KeyOf<ValueOf<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>, K4>>,
    F extends Partial<ValueOf<ValueOf<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>, K4>, K5>> = ValueOf<
        ValueOf<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>, K4>,
        K5
    >
>(
    obj: O | undefined | null,
    key: [K1, K2, K3, K4, K5],
    fallback?: F
): ValueOf<ValueOf<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>, K4>, K5> | F

// Four arguments
export function get<
    O extends object,
    K1 extends KeyOf<O>,
    K2 extends KeyOf<ValueOf<O, K1>>,
    K3 extends KeyOf<ValueOf<ValueOf<O, K1>, K2>>,
    K4 extends KeyOf<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>>,
    F extends Partial<ValueOf<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>, K4>> = ValueOf<
        ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>,
        K4
    >
>(
    obj: O | undefined | null,
    key: [K1, K2, K3, K4],
    fallback: NonNullable<F>
): NonNullable<ValueOf<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>, K4> | F>
export function get<
    O extends object,
    K1 extends KeyOf<O>,
    K2 extends KeyOf<ValueOf<O, K1>>,
    K3 extends KeyOf<ValueOf<ValueOf<O, K1>, K2>>,
    K4 extends KeyOf<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>>,
    F extends Partial<ValueOf<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>, K4>> = ValueOf<
        ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>,
        K4
    >
>(obj: O | undefined | null, key: [K1, K2, K3, K4], fallback?: F): ValueOf<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>, K4> | F

// Three arguments
export function get<
    O extends object,
    K1 extends KeyOf<O>,
    K2 extends KeyOf<ValueOf<O, K1>>,
    K3 extends KeyOf<ValueOf<ValueOf<O, K1>, K2>>,
    F extends Partial<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>> = ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>
>(
    obj: O | undefined | null,
    key: [K1, K2, K3],
    fallback: NonNullable<F>
): NonNullable<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3> | F>
export function get<
    O extends object,
    K1 extends KeyOf<O>,
    K2 extends KeyOf<ValueOf<O, K1>>,
    K3 extends KeyOf<ValueOf<ValueOf<O, K1>, K2>>,
    F extends Partial<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>> = ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>
>(obj: O | undefined | null, key: [K1, K2, K3], fallback?: F): ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3> | F

// Two arguments
export function get<
    O extends object,
    K1 extends KeyOf<O>,
    K2 extends KeyOf<ValueOf<O, K1>>,
    F extends Partial<ValueOf<ValueOf<O, K1>, K2>> = ValueOf<ValueOf<O, K1>, K2>
>(obj: O | undefined | null, key: [K1, K2], fallback: NonNullable<F>): NonNullable<ValueOf<ValueOf<O, K1>, K2> | F>
export function get<
    O extends object,
    K1 extends KeyOf<O>,
    K2 extends KeyOf<ValueOf<O, K1>>,
    F extends Partial<ValueOf<ValueOf<O, K1>, K2>> = ValueOf<ValueOf<O, K1>, K2>
>(obj: O | undefined | null, key: [K1, K2], fallback?: F): ValueOf<ValueOf<O, K1>, K2> | F

// Single argument
export function get<O extends object, K extends KeyOf<O>, F extends Partial<ValueOf<O, K>> = ValueOf<O, K>>(
    obj: O | undefined | null,
    key: [K],
    fallback: NonNullable<F>
): NonNullable<ValueOf<O, K> | F>
export function get<O extends object, K extends KeyOf<O>, F extends Partial<ValueOf<O, K>> = ValueOf<O, K>>(
    obj: O | undefined | null,
    key: [K],
    fallback?: F
): ValueOf<O, K> | F

export function get<O, T>(obj: O, key: Array<string | number>, fallback?: T): unknown | T {
    return baseGet(obj, key, fallback)
}
