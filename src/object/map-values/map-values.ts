import { entriesOf } from '../entries-of'

export function mapValues<T, Mapper extends (v: T[keyof T], k: keyof T) => unknown>(
    mapper: Mapper,
    obj: T
): {
    [K in keyof T]: Mapper extends (v: T[K], k: K) => infer O ? O : never
} {
    return Object.fromEntries(entriesOf(obj).map(([k, v]) => [k, mapper(v as T[keyof T], k as keyof T)])) as {
        [K in keyof T]: Mapper extends (v: T[K], k: K) => infer O ? O : never
    }
}
