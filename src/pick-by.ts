import { isDefined } from './is-defined'

export function pickBy<O extends Record<string, unknown | undefined>>(
    obj: O | undefined,
    pickIf: (v: O[typeof k], k: keyof O) => boolean
): Partial<O> {
    if (!isDefined(obj)) {
        return {}
    }
    return Object.entries(obj)
        .filter(([key, value]) => pickIf(value as O[keyof O], key as keyof O))
        .reduce<Partial<O>>((out, [key, value]) => {
            out[key as keyof O] = value as O[keyof O]
            return out
        }, {})
}
