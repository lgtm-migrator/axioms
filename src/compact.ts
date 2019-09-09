import { isDefined } from '~/is-defined'

export function compact<T>(array: ReadonlyArray<T | undefined>): T[] {
    return array.filter(x => isDefined(x)) as T[]
}
