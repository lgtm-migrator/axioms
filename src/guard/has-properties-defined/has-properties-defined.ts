import { all } from '../../iterator/all'
import type { KeyOf, RequireKeys } from '../../type/keys'
import type { Traversable } from '../../type/traversable'

export function hasPropertiesDefined<T, K extends KeyOf<T>>(keys: Traversable<K> | Traversable<string>) {
    return (obj: RequireKeys<T, K> | T): obj is RequireKeys<T, K> => all((key) => obj[key] !== undefined, keys as K[])
}
