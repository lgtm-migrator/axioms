import { replicate } from '.'

import { foldl, all } from '..'
import { zip, collect } from '../../array'
import { range } from '../../generator'
import { forAll, tuple, natural, unknown } from '../../random'

test('correct length', () => {
    forAll(
        tuple(natural({ max: 20000 }), unknown()),
        ([n, p]) => {
            const xs = replicate(n, p)
            expect(foldl((s) => s + 1, 0, xs)).toBe(n)
        },
        { tests: 10 }
    )
})

test('all same primitive', () => {
    forAll(
        tuple(natural({ max: 20000 }), unknown()),
        ([n, p]) => {
            const xs = replicate(n, p)
            return all((x) => x === p, xs)
        },
        { tests: 10 }
    )
})

test('all same primitive from function', () => {
    forAll(
        tuple(natural({ max: 20000 }), unknown()),
        ([n, p]) => {
            const xs = replicate(n, () => p)
            return all((x) => x === p, xs)
        },
        { tests: 10 }
    )
})

test('range from function with index', () => {
    forAll(
        natural({ max: 20000 }),
        (n) => {
            all(
                ([i, r]) => i === r,
                zip(
                    replicate(n, (i) => i),
                    range(0, n)
                )
            )
        },
        { tests: 10 }
    )
})

test('spread', () => {
    expect(collect(replicate(10, () => false))).toMatchInlineSnapshot(`
        Array [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ]
    `)
})
