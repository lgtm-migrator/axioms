import { set } from './set'

import { collect } from '../../../array/collect'
import { unique } from '../../../iterator/unique'
import { forAll } from '../../arbitrary/forall'
import { integer } from '../integer'

test('all unique - number', () => {
    const size = 1000
    forAll(set(integer({ min: 0, max: size })), (xs) => xs.length === collect(unique(xs)).length, { seed: 1638968569864n })
})
test('always larger than minsize', () => {
    const size = 3
    forAll(set(integer(), { minLength: size, maxLength: 100 }), (xs) => {
        return xs.length >= size
    })
})
