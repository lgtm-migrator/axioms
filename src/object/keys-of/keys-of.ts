import type { EmptyObj, KeyOf } from '../../type'

export function keysOf<T extends EmptyObj>(obj: T): T extends Array<infer _I> ? Array<string> : Array<KeyOf<T>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return Object.keys(obj) as any
}
