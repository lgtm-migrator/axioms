import type { EmptyObj } from '../object'

// @todo: names maybe something with stricten/relax
export type NoUndefinedFields<T extends EmptyObj> = {
    [P in keyof T]-?: Exclude<T[P], undefined>
}

export type NoNullableFields<T extends EmptyObj> = {
    [P in keyof T]-?: Exclude<T[P], null | undefined>
}
