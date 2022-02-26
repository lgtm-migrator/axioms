import { all } from '.'

import { concat } from '../../iterator'
import { forAll, unknown, array, tuple, constant } from '../../random'

test('all true xs === true', () => {
    forAll(array(unknown()), (xs) => all(() => true, xs) === true)
})

test('all false xs === false', () => {
    forAll(array(unknown(), { minLength: 1 }), (xs) => all(() => false, xs) === false)
})

test('constant true === true', () => {
    forAll(array(constant(true), { minLength: 1 }), (xs) => all((x) => x, xs) === true)
})

test('random false + constant true === false', () => {
    forAll(
        tuple(array(constant(true), { minLength: 1 }), array(constant(false), { minLength: 1 }), array(constant(true))),
        ([xs, ys, zs]) => all((x) => x, concat(xs, ys, zs)) === false
    )
})
