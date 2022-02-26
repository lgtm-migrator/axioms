import { take, takeWhile } from '.'

import { collect } from '../../array'
import { repeat, range } from '../../generator'

describe('take', () => {
    test('string', () => {
        expect(collect(take(5, 'hello world!'))).toMatchInlineSnapshot(`
        Array [
          "h",
          "e",
          "l",
          "l",
          "o",
        ]
    `)
    })

    test('short', () => {
        expect(collect(take(6, [1, 2]))).toMatchInlineSnapshot(`
        Array [
          1,
          2,
        ]
    `)
    })

    test('empty', () => {
        expect(collect(take(6, []))).toMatchInlineSnapshot(`Array []`)
    })

    test('negative', () => {
        expect(collect(take(-1, [1, 2]))).toMatchInlineSnapshot(`Array []`)
    })

    test('zero', () => {
        expect(collect(take(0, [1, 2]))).toMatchInlineSnapshot(`Array []`)
    })

    test('simple', () => {
        expect(collect(take(5, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))).toMatchInlineSnapshot(`
        Array [
          1,
          2,
          3,
          4,
          5,
        ]
    `)
    })

    test('repeat', () => {
        expect(collect(take(5, repeat('foo')))).toMatchInlineSnapshot(`
        Array [
          "foo",
          "foo",
          "foo",
          "foo",
          "foo",
        ]
    `)
    })
})

describe('takeWhile', () => {
    test('simple', () => {
        expect(collect(takeWhile((x) => x < 3, [1, 2, 3, 4, 5, 1, 2, 3]))).toMatchInlineSnapshot(`
            Array [
              1,
              2,
            ]
        `)
    })

    test('all', () => {
        expect(collect(takeWhile((x) => x < 9, [1, 2, 3]))).toMatchInlineSnapshot(`
            Array [
              1,
              2,
              3,
            ]
        `)
    })

    test('none', () => {
        expect(collect(takeWhile((x) => x < 0, [1, 2, 3]))).toMatchInlineSnapshot(`Array []`)
    })

    test('large size', () => {
        expect(collect(takeWhile((x) => x < 32700, range(32768)))).toEqual(collect(range(32700)))
    })

    test('vs for loop', () => {
        const arr = []
        for (const x of range(32768)) {
            if (x >= 32700) {
                break
            }
            arr.push(x)
        }
        expect(arr).toEqual(collect(range(32700)))
    })
})
