import { filter } from '.'

import { all, equal } from '../../iterator'
import { forAll, array, unknown, integer } from '../../random'

test('filter true xs === xs', () => {
    forAll(array(unknown()), (xs) => equal([...filter(() => true, xs)], xs))
})

test('filter false xs === []', () => {
    forAll(array(unknown()), (xs) => equal([...filter(() => false, xs)], []))
})

test('filter even xs', () => {
    const even = (x: number) => x % 2 === 0
    forAll(array(integer()), (xs) => all(even, filter(even, xs)))
})
