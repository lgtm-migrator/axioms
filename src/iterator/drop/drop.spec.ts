import { drop, dropWhile } from '.'

import { collect } from '../../array'

describe('drop', () => {
    test('string', () => {
        expect(collect(drop(6, 'hello world!'))).toMatchInlineSnapshot(`
              Array [
                "w",
                "o",
                "r",
                "l",
                "d",
                "!",
              ]
      `)
    })

    test('short', () => {
        expect(collect(drop(6, [1, 2]))).toMatchInlineSnapshot(`Array []`)
    })

    test('negative', () => {
        expect(collect(drop(-1, [1, 2]))).toMatchInlineSnapshot(`
                    Array [
                      1,
                      2,
                    ]
            `)
    })

    test('zero', () => {
        expect(collect(drop(0, [1, 2]))).toMatchInlineSnapshot(`
                    Array [
                      1,
                      2,
                    ]
            `)
    })

    test('simple', () => {
        expect(collect(drop(5, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))).toMatchInlineSnapshot(`
                    Array [
                      6,
                      7,
                      8,
                      9,
                      10,
                    ]
            `)
    })
})

describe('dropWhile', () => {
    test('simple', () => {
        expect(collect(dropWhile((x) => x < 3, [1, 2, 3, 4, 5, 1, 2, 3]))).toMatchInlineSnapshot(`
            Array [
              3,
              4,
              5,
              1,
              2,
              3,
            ]
        `)
    })

    test('all', () => {
        expect(collect(dropWhile((x) => x < 9, [1, 2, 3]))).toMatchInlineSnapshot(`Array []`)
    })

    test('none', () => {
        expect(collect(dropWhile((x) => x < 0, [1, 2, 3]))).toMatchInlineSnapshot(`
            Array [
              1,
              2,
              3,
            ]
        `)
    })
})
