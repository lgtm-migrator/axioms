import type { Traversable } from '../../type'
import { toTraverser } from '../../type'

import deepEqual from 'fast-deep-equal/es6'

export function allEqual<T>(xs: Traversable<T>, as: Traversable<T>, eq: (a: T, b: T) => boolean = equal): boolean {
    const ixs = toTraverser(xs)
    const ias = toTraverser(as)

    let xv = ixs.next()
    let av = ias.next()
    for (; xv.done !== true && av.done !== true; xv = ixs.next(), av = ias.next()) {
        if (!eq(xv.value, av.value)) {
            return false
        }
    }
    return xv.done === true && av.done === true
}

export function equal(a: unknown, b: unknown): boolean {
    return deepEqual(a, b)
}
