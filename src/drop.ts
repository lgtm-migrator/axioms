export function drop<T>(array: ReadonlyArray<T>, count: number = 1): T[] {
    return array.slice(Math.max(count, 0))
}
