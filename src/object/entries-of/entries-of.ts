export type EntriesOf<T> = T extends Array<infer I> ? Array<[string, I]> : Array<{ [k in keyof T]: [k, T[k]] }[keyof T]>
export function entriesOf<T>(obj: T): EntriesOf<T> {
    return Object.entries(obj) as EntriesOf<T>
}
