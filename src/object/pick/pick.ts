import type { Dict, SimplifyOnce } from '../../type'
import { entriesOf } from '../entries-of'

export function pickBy<T extends Dict, Predicate extends ([key, value]: [key: keyof T, value: T[keyof T]]) => boolean>(
    predicate: Predicate,
    obj: T
): Partial<T> {
    return Object.fromEntries(
        entriesOf(obj).filter(([k, v]) => predicate([k, v] as [key: keyof T, value: T[keyof T]]))
    ) as Partial<T>
}

export function pick<T extends Dict, K extends keyof T>(obj: T, keys: readonly K[]): SimplifyOnce<Pick<T, K>> {
    return Object.fromEntries(entriesOf(obj).filter(([k]) => keys.includes(k as K))) as SimplifyOnce<Pick<T, K>>
}
