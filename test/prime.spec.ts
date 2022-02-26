import { collect } from '../src/array'
import { counter, next } from '../src/generator'
import { filter, take } from '../src/iterator'

test('prime', () => {
    function* primes() {
        let xs = counter(2)

        while (true) {
            const prime = next(xs)
            yield prime.right
            xs = filter((x) => x % prime.right !== 0, xs)
        }
    }

    expect(collect(take(10, primes()))).toMatchInlineSnapshot(`
        Array [
          2,
          3,
          5,
          7,
          11,
          13,
          17,
          19,
          23,
          29,
        ]
    `)
})
