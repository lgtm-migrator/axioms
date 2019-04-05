import { isDefined } from './is-defined'

export type KeyOf<O> = O extends any[] ? number : (O extends { [k: string]: any } ? keyof O : never)
export type ValueOf<O, K extends KeyOf<O>> = O extends undefined | null
    ? undefined
    : (O extends Array<infer I> ? I | undefined : (K extends keyof O ? O[K] : undefined))

// Five arguments
export function varget<
    O extends { [k: string]: any | undefined },
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
export function varget<
    O extends { [k: string]: any | undefined },
    K1 extends KeyOf<O>,
    K2 extends KeyOf<ValueOf<O, K1>>,
    K3 extends KeyOf<ValueOf<ValueOf<O, K1>, K2>>,
    K4 extends KeyOf<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>>,
    K5 extends KeyOf<ValueOf<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>, K4>>,
    F extends
        | Partial<ValueOf<ValueOf<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>, K4>, K5>>
        | undefined = undefined
>(
    obj: O | undefined | null,
    key: [K1, K2, K3, K4, K5],
    fallback?: F
): ValueOf<ValueOf<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>, K4>, K5> | F

// Four arguments
export function varget<
    O extends { [k: string]: any | undefined },
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
export function varget<
    O extends { [k: string]: any | undefined },
    K1 extends KeyOf<O>,
    K2 extends KeyOf<ValueOf<O, K1>>,
    K3 extends KeyOf<ValueOf<ValueOf<O, K1>, K2>>,
    K4 extends KeyOf<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>>,
    F extends Partial<ValueOf<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>, K4>> | undefined = undefined
>(
    obj: O | undefined | null,
    key: [K1, K2, K3, K4],
    fallback?: F
): ValueOf<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>, K4> | F

// Three arguments
export function varget<
    O extends { [k: string]: any | undefined },
    K1 extends KeyOf<O>,
    K2 extends KeyOf<ValueOf<O, K1>>,
    K3 extends KeyOf<ValueOf<ValueOf<O, K1>, K2>>,
    F extends Partial<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>> = ValueOf<
        ValueOf<ValueOf<O, K1>, K2>,
        K3
    >
>(
    obj: O | undefined | null,
    key: [K1, K2, K3],
    fallback: NonNullable<F>
): NonNullable<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3> | F>
export function varget<
    O extends { [k: string]: any | undefined },
    K1 extends KeyOf<O>,
    K2 extends KeyOf<ValueOf<O, K1>>,
    K3 extends KeyOf<ValueOf<ValueOf<O, K1>, K2>>,
    F extends Partial<ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>> | undefined = undefined
>(
    obj: O | undefined | null,
    key: [K1, K2, K3],
    fallback?: F
): ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3> extends undefined
    ? ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3> | F
    : ValueOf<ValueOf<ValueOf<O, K1>, K2>, K3>

// Two arguments
export function varget<
    O extends { [k: string]: any | undefined },
    K1 extends KeyOf<O>,
    K2 extends KeyOf<ValueOf<O, K1>>,
    F extends Partial<ValueOf<ValueOf<O, K1>, K2>> = ValueOf<ValueOf<O, K1>, K2>
>(
    obj: O | undefined | null,
    key: [K1, K2],
    fallback: NonNullable<F>
): NonNullable<ValueOf<ValueOf<O, K1>, K2> | F>
export function varget<
    O extends { [k: string]: any | undefined },
    K1 extends KeyOf<O>,
    K2 extends KeyOf<ValueOf<O, K1>>,
    F extends Partial<ValueOf<ValueOf<O, K1>, K2>> | undefined = undefined
>(obj: O | undefined | null, key: [K1, K2], fallback?: F): ValueOf<ValueOf<O, K1>, K2> | F

// Single argument
export function varget<
    O extends { [k: string]: any | undefined },
    K extends KeyOf<O>,
    F extends Partial<ValueOf<O, K>> = ValueOf<O, K>
>(obj: O | undefined | null, key: [K], fallback: NonNullable<F>): NonNullable<ValueOf<O, K> | F>
export function varget<
    O extends { [k: string]: any | undefined },
    K extends KeyOf<O>,
    F extends Partial<ValueOf<O, K>> | undefined = undefined
>(obj: O | undefined | null, key: [K], fallback?: F): ValueOf<O, K> | F

export function varget<O, K extends string | number>(obj: O, k: K[] | string, fallback?: any): any

export function varget<O, F>(obj: O, key: Array<string | number> | string, fallback?: F): any {
    let out: any = obj
    for (const k of key) {
        if (isDefined(out) && typeof out === 'object' && k in out) {
            out = out[k]
        } else {
            return fallback
        }
    }
    return out
}
