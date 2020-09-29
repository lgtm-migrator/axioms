export function drop<T>(array: ReadonlyArray<T>, count = 1): T[] {
    return array.slice(Math.max(count, 0))
}
