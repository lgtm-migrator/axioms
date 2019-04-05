export function isString(x: string | any): x is string {
    return typeof x === 'string'
}
