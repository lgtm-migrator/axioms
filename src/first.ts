export function first<T>(array: ReadonlyArray<T> | undefined | null, count: number = 1): T[] {
    return (array || []).slice(0, Math.max(0, count))
}
