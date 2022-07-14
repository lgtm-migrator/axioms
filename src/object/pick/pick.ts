import type { Dict, KeyOf, SimplifyOnce } from '../../type'
import { entriesOf } from '../entries-of'

export type DistributivePick<T, K extends KeyOf<T>> = T extends infer S ? Pick<S, K & keyof S> : never

export function pickBy<T extends Dict, Predicate extends ([key, value]: [key: keyof T, value: T[keyof T]]) => boolean>(
    predicate: Predicate,
    obj: T
): Partial<T> {
    return Object.fromEntries(
        entriesOf(obj).filter(([k, v]) => predicate([k, v] as [key: keyof T, value: T[keyof T]]))
    ) as Partial<T>
}

export function pick<T extends Dict, K extends keyof T>(obj: T, keys: readonly K[]): SimplifyOnce<Pick<T, K>>
export function pick<T extends Dict, K extends KeyOf<T>>(obj: T, keys: readonly K[]): SimplifyOnce<DistributivePick<T, K>>
export function pick<T extends Dict, K extends KeyOf<T>>(obj: T, keys: readonly K[]): SimplifyOnce<DistributivePick<T, K>> {
    return Object.fromEntries(entriesOf(obj).filter(([k]) => keys.includes(k as K))) as SimplifyOnce<DistributivePick<T, K>>
}
