import { stack } from '.'

import { collect, sum } from '../../array'
import { take, allEqual, map } from '../../iterator'
import { forAll, array, unknown } from '../../random'

test('simple', () => {
    expect(collect(stack([1, 2, 3, 4]))).toMatchInlineSnapshot(`
        Array [
          1,
          2,
          3,
          4,
        ]
    `)
})

test('continued', () => {
    const q = stack([1, 2, 3, 4])
    q.push([5, 6, 7])
    expect(collect(take(3, q))).toMatchInlineSnapshot(`
        Array [
          5,
          6,
          7,
        ]
    `)
    expect(collect(take(2, q))).toMatchInlineSnapshot(`
        Array [
          1,
          2,
        ]
    `)
    expect(collect(q)).toMatchInlineSnapshot(`
        Array [
          3,
          4,
        ]
    `)
    q.push([5, 6, 7])
    expect(collect(q)).toMatchInlineSnapshot(`Array []`)
})

test('continued 2', () => {
    const q = stack([1])
    q.push([2, 3])
    q.push([4, 5])
    q.push([6, 7])

    expect(collect(take(3, q))).toMatchInlineSnapshot(`
        Array [
          6,
          7,
          4,
        ]
    `)
    expect(collect(take(2, q))).toMatchInlineSnapshot(`
        Array [
          5,
          2,
        ]
    `)
    expect(collect(q)).toMatchInlineSnapshot(`
        Array [
          3,
          1,
        ]
    `)
    q.push([5, 6, 7])
    expect(collect(q)).toMatchInlineSnapshot(`Array []`)
})

test('take n stack xs === xs', () => {
    forAll(array(unknown()), (xs) => allEqual(take(xs.length, stack(xs)), xs))
})

test('take n stack.push(...xss) === reverse xs', () => {
    forAll(array(array(unknown())), (xss) => {
        const values = stack()
        values.push(...xss)
        return allEqual(take(sum(map((xs) => xs.length, xss)), values), xss.reverse().flat())
    })
})
