import { queue } from '.'

import { collect, sum } from '../../array'
import { take, allEqual, map } from '../../iterator'
import { forAll, array, unknown } from '../../random'

test('simple', () => {
    expect(collect(queue([1, 2, 3, 4]))).toMatchInlineSnapshot(`
        Array [
          1,
          2,
          3,
          4,
        ]
    `)
})

test('continued', () => {
    const q = queue([1, 2, 3, 4])
    q.enqueue([5, 6, 7])
    expect(collect(take(3, q))).toMatchInlineSnapshot(`
        Array [
          1,
          2,
          3,
        ]
    `)
    expect(collect(take(2, q))).toMatchInlineSnapshot(`
        Array [
          4,
          5,
        ]
    `)
    expect(collect(q)).toMatchInlineSnapshot(`
        Array [
          6,
          7,
        ]
    `)
    q.enqueue([5, 6, 7])
    expect(collect(q)).toMatchInlineSnapshot(`Array []`)
})

test('take n queue xs === xs', () => {
    forAll(array(unknown()), (xs) => allEqual(take(xs.length, queue(xs)), xs))
})

test('take n queue ...xss === xs', () => {
    forAll(array(array(unknown())), (xss) => {
        const vals = queue()
        vals.enqueue(...xss)
        return allEqual(take(sum(map((xs) => xs.length, xss)), vals), xss.flat())
    })
})
