import type { Dict } from '../../type'

export function has<T>(obj: T, k: string | keyof T): k is keyof T
export function has<T extends Dict>(obj: T, k: string | keyof T): k is keyof T {
    return (k as string) in obj
}
