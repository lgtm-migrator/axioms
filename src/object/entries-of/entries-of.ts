export function entriesOf<T>(obj: T): T extends Array<infer I> ? Array<[string, I]> : Array<[keyof T, T[keyof T]]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return Object.entries(obj) as any
}
