import { isDefined } from './is-defined'

export function pick<O extends object, K extends keyof O>(obj: O, ...keys: K[]): Pick<O, K>
export function pick<O extends object, K extends keyof O>(
    obj: O | undefined,
    ...keys: K[]
): Partial<Pick<O, K>>
export function pick<O extends object, K extends keyof O>(
    obj: O | undefined,
    ...keys: K[]
): Partial<Pick<O, K>> {
    if (!isDefined(obj)) {
        return {}
    }
    return keys.reduce<Partial<O>>((out, key) => {
        if (key in obj) {
            out[key] = obj[key]
        }
        return out
    }, {}) as Pick<O, K>
}
