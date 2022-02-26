import { hasPropertiesDefined } from '.'

import { all, collect, dict, float, forAll, keysOf, shuffle, take, tuple, unknown } from '../..'

test('defined properties are defined', () => {
    forAll(tuple(dict(unknown()), float({ min: 0, max: 1 })), ([xs, r]) => {
        const keys = keysOf(xs)
        const selectedKeys = collect(take(r * keys.length, shuffle(keys)))
        return hasPropertiesDefined(selectedKeys)(xs) === all((k) => xs[k] !== undefined, selectedKeys)
    })
})
