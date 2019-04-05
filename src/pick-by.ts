import { isDefined } from './is-defined'

export function pickBy<O extends object>(
    obj: O | undefined,
    pickIf: (v: O[typeof k], k: keyof O) => boolean
): Partial<O> {
    if (!isDefined(obj)) {
        return {}
    }
    return Object.entries(obj)
        .filter(([key, value]) => pickIf(value, key as keyof O))
        .reduce<Partial<O>>((out, [key, value]) => {
            out[key as keyof O] = value
            return out
        }, {})
}
