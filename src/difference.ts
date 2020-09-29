export function difference<T>(array: ReadonlyArray<T>, other: ReadonlyArray<T>): T[] {
    return array.filter((c) => !other.includes(c))
}
