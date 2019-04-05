export function isDefined<O>(obj: O | undefined | null): obj is O {
    return obj !== undefined && obj !== null
}
