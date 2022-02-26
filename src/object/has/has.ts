import type { Dict } from '../../type'

export function has<T>(k: string | keyof T, obj: T): k is keyof T
export function has<T extends Dict>(k: string | keyof T, obj: T): k is keyof T {
    return (k as string) in obj
}
