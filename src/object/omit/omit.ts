import type { Dict, NoUndefinedFields, SimplifyOnce } from '../../type'
import { entriesOf } from '../entries-of'
import { pickBy } from '../pick'

export function omitUndefined<T extends Dict>(obj: T): NoUndefinedFields<T> {
    return pickBy(([, v]) => v !== undefined, obj) as unknown as NoUndefinedFields<T>
}

export function omitSymbols<T>(obj: T): { [k in keyof T]: k extends symbol ? never : T[k] } {
    return Object.fromEntries(Object.entries(obj)) as { [k in keyof T]: k extends symbol ? never : T[k] }
}

export function omit<T extends Dict, K extends keyof T>(obj: T, keys: readonly K[]): SimplifyOnce<Omit<T, K>> {
    return Object.fromEntries(entriesOf(obj).filter(([k]) => !keys.includes(k as K))) as SimplifyOnce<Omit<T, K>>
}
