import type { Dict, Obj } from '../../type'

export function isObject(obj: unknown): obj is Dict<unknown>
export function isObject<T>(obj: Obj<T> | unknown): obj is Obj<T>
export function isObject<T>(obj: Obj<T> | unknown): obj is Obj<T> {
    return obj !== undefined && obj !== null && typeof obj === 'object' && !Array.isArray(obj)
}
