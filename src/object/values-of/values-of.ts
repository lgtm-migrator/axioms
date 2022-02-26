import type { EmptyObj, KeyOf } from '../../type'

export function valuesOf<T extends EmptyObj>(obj: T): T extends Array<infer I> ? I : Array<T[KeyOf<T>]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
    return Object.values(obj) as any
}
