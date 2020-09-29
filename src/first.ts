export function first<T>(array: ReadonlyArray<T> | undefined | null, count = 1): T[] {
    return (array ?? []).slice(0, Math.max(0, count))
}
