import { cycle } from '.'

import { repeat } from '..'
import { collect } from '../../array'
import { allEqual, take } from '../../iterator'
import { array, forAll, mappableFunc, natural, tuple, unknown } from '../../random'

test('simple', () => {
    expect(collect(take(10, cycle([1, 2, 3])))).toMatchInlineSnapshot(`
              Array [
                1,
                2,
                3,
                1,
                2,
                3,
                1,
                2,
                3,
                1,
              ]
      `)
})

test('generator', () => {
    function* foo() {
        yield 1
        yield 2
    }

    expect(collect(take(10, cycle(foo)))).toMatchInlineSnapshot(`
        Array [
          1,
          2,
          1,
          2,
          1,
          2,
          1,
          2,
          1,
          2,
        ]
    `)
})

test('take n * |X| X === n * X', () => {
    forAll(tuple(array(unknown()), natural({ max: 100 })), ([xs, n]) => {
        expect(collect(take(n * xs.length, cycle(xs)))).toEqual(
            collect(
                take(
                    n,
                    repeat(() => xs)
                )
            ).flat()
        )
    })
})

test('take n cycle(mappable(xs)) === take n repeat(*xs)', () => {
    forAll(tuple(natural({ max: 10000 }), array(unknown(), { minLength: 1 }), mappableFunc()), ([n, xs, fn]) => {
        return allEqual(
            take(n, cycle(fn(xs))),
            take(
                n,
                repeat(function* () {
                    yield* xs
                })
            )
        )
    })
})

test('given n === 0, |take n cycle(X)| === 0', () => {
    forAll(tuple(natural({ max: 0 }), array(unknown(), { maxLength: 10 }), mappableFunc()), ([n, xs, fn]) => {
        return collect(take(n, cycle(fn(xs)))).length === 0
    })
})
