import type { Obj } from '../../type/object'
import type { BuiltinType } from '../primitives'

export type SimplifyOnce<T> = T extends BuiltinType ? T : T extends Obj<T> ? { [K in keyof T]: T[K] } : T
export type Simplify<T> = T extends BuiltinType
    ? T
    : T extends Obj<T>
    ? { [K in keyof T]: Simplify<T[K]> }
    : T extends unknown[]
    ? { [K in keyof T]: Simplify<T[K]> }
    : T
