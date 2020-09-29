export function negate<Args extends unknown[]>(fn: (...args: Args) => boolean): (...args: Args) => boolean {
    function negated(...args: Args) {
        return !fn(...args)
    }
    return negated
}
