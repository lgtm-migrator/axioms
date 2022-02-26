import { splitAt } from '.'

import { collect } from '../../array'

test('string', () => {
    const [init, rest] = splitAt(6, 'hello world!')
    expect(init).toMatchInlineSnapshot(`
        Array [
          "h",
          "e",
          "l",
          "l",
          "o",
          " ",
        ]
    `)
    expect(collect(rest)).toMatchInlineSnapshot(`
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

test('simple 1', () => {
    const [init, rest] = splitAt(1, [1, 2, 3])
    expect(init).toMatchInlineSnapshot(`
        Array [
          1,
        ]
    `)
    expect(collect(rest)).toMatchInlineSnapshot(`
        Array [
          2,
          3,
        ]
    `)
})

test('simple 2', () => {
    const [init, rest] = splitAt(3, [1, 2, 3])
    expect(init).toMatchInlineSnapshot(`
        Array [
          1,
          2,
          3,
        ]
    `)
    expect(collect(rest)).toMatchInlineSnapshot(`Array []`)
})

test('over', () => {
    const [init, rest] = splitAt(4, [1, 2, 3])
    expect(init).toMatchInlineSnapshot(`
        Array [
          1,
          2,
          3,
        ]
    `)
    expect(collect(rest)).toMatchInlineSnapshot(`Array []`)
})

test('negative', () => {
    const [init, rest] = splitAt(-1, [1, 2, 3])
    expect(init).toMatchInlineSnapshot(`Array []`)
    expect(collect(rest)).toMatchInlineSnapshot(`
        Array [
          1,
          2,
          3,
        ]
    `)
})

test('zero', () => {
    const [init, rest] = splitAt(0, [1, 2, 3])
    expect(init).toMatchInlineSnapshot(`Array []`)
    expect(collect(rest)).toMatchInlineSnapshot(`
        Array [
          1,
          2,
          3,
        ]
    `)
})

test('simple', () => {
    const [init, rest] = splitAt(5, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    expect(init).toMatchInlineSnapshot(`
        Array [
          1,
          2,
          3,
          4,
          5,
        ]
    `)
    expect(collect(rest)).toMatchInlineSnapshot(`
        Array [
          6,
          7,
          8,
          9,
          10,
        ]
    `)
})
