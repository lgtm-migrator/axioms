import { negate } from './negate'
import { pickBy } from './pick-by'

export function omitBy<O extends object>(obj: O | undefined, omitIf: (o: O[typeof k], k: keyof O) => boolean): Partial<O> {
    return pickBy(obj, negate(omitIf))
}
