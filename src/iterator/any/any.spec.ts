import { any } from '.'

import { concat } from '../../iterator'
import { forAll, unknown, array, tuple, constant } from '../../random'

test('any true xs === true', () => {
    forAll(array(unknown(), { minLength: 1 }), (xs) => any(() => true, xs) === true)
})

test('any true [] === false', () => {
    forAll(array(unknown(), { maxLength: 0 }), (xs) => any(() => true, xs) === false)
})

test('any false xs === false', () => {
    forAll(array(unknown()), (xs) => any(() => false, xs) === false)
})

test('constant true === true', () => {
    forAll(array(constant(true), { minLength: 1 }), (xs) => any((x) => x, xs) === true)
})

test('random false + constant true === true', () => {
    forAll(
        tuple(array(constant(true), { minLength: 1 }), array(constant(false), { minLength: 1 }), array(constant(true))),
        ([xs, ys, zs]) => any((x) => x, concat(xs, ys, zs)) === true
    )
})
