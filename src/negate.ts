export function negate<Fn extends (...args: any[]) => boolean>(fn: Fn): Fn {
    function negated(...args: any[]) {
        return !fn(...args)
    }
    return negated as Fn
}
