export function chunk<T>(arr: Readonly<T[]>, size = 1): T[][] {
    size = Math.max(size, 1)
    const cache: T[][] = []
    const tmp = [...arr]
    while (tmp.length) {
        cache.push(tmp.splice(0, size))
    }
    return cache
}
