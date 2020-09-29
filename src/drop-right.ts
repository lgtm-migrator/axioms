export function dropRight<T>(array: ReadonlyArray<T>, count = 1): T[] {
    return array.slice(0, array.length - Math.min(count, array.length))
}
