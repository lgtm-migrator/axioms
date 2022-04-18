import type { EmptyObj } from '../object'
import type { SimplifyOnce } from '../simplify'

export type KeyOf<T> = T extends unknown ? keyof T : never
export type KeysOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T]
export type RequiredKeys<T> = Exclude<KeysOfType<T, Exclude<T[keyof T], undefined>>, undefined>
export type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>
export type RequireKeys<T extends EmptyObj, K extends PropertyKey> = T extends infer S
    ? SimplifyOnce<Omit<S, K> & Required<Pick<S, K & keyof S>>> extends infer U
        ? U extends Record<K, unknown>
            ? U
            : never
        : never
    : never
