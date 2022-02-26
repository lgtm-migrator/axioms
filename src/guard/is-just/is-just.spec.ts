import { isJust } from '.'

import { isNothing } from '..'
import { forAll, unknown } from '../../random'

test('unknown is just', () => {
    forAll(unknown({ nothing: false }), (x) => isJust(x))
})

test('isJust == !isNothing', () => {
    forAll(unknown(), (x) => isJust(x) !== isNothing(x))
})
