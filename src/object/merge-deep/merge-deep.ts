import { isObject } from '../../guard'

export function mergeDeep<T, U>(target: T, source: U): T | U {
    const output: Record<string, unknown> = Object.assign({}, target)
    if (isObject(target) && isObject(source)) {
        for (const key of Object.keys(source)) {
            const obj = source[key]
            if (isObject(obj)) {
                if (!(key in target)) {
                    Object.assign(output, { [key]: obj })
                } else {
                    output[key] = mergeDeep(target[key], obj)
                }
            } else {
                Object.assign(output, { [key]: obj })
            }
        }
    }
    return output as T | U
}
