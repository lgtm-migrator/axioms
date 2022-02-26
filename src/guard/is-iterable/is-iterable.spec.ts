import { isIterable } from '.'

import { isArray } from '..'
import { forAll, array, unknown } from '../../random'

test('array is iterable', () => {
    forAll(array(unknown()), (xs) => isArray(xs))
})

test('unknown is not iterable', () => {
    forAll(unknown({ string: false, array: false }), (xs) => !isIterable(xs))
})
