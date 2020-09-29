import { omitBy } from './omit-by'

export type Omit<O, K extends keyof O> = Pick<O, Exclude<keyof O, K>>

export function omit<O extends Record<string, unknown | undefined>, K extends keyof O>(obj: O, ...keys: K[]): Omit<O, K>
export function omit<O extends Record<string, unknown | undefined>, K extends keyof O>(
    obj: O | undefined,
    ...keys: K[]
): Partial<Omit<O, K>>
export function omit<O extends Record<string, unknown | undefined>, K extends keyof O>(
    obj: O | undefined,
    ...keys: K[]
): Partial<Omit<O, K>> {
    return omitBy(obj, (_, k) => keys.includes(k as K)) as Omit<O, K>
}
