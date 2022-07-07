import { hasPropertiesDefined } from '.'

import { all, collect, dict, float, forAll, keysOf, shuffle, take, tuple, unknown } from '../..'

test('defined properties are defined', () => {
    forAll(tuple(dict(unknown()), float({ min: 0, max: 1 })), ([xs, r]) => {
        const keys = keysOf(xs)
        const selectedKeys = collect(take(shuffle(keys), r * keys.length))
        return hasPropertiesDefined(selectedKeys)(xs) === all(selectedKeys, (k) => xs[k] !== undefined)
    })
})
