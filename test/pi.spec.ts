import { sum, collect } from '../src/array'
import { range } from '../src/generator'
import { replicate, map } from '../src/iterator'
import { xoroshiro128plus } from '../src/random'

test('pi', () => {
    const rng = xoroshiro128plus(42n)
    const approxPi = (n: number): number =>
        (sum(
            replicate(n, () => {
                const x = rng.sample()
                const y = rng.sample()
                return x * x + y * y < 1 ? 1 : 0
            })
        ) /
            n) *
        4

    expect(collect(map((x) => approxPi(Math.pow(10, x)), range(3, 5)))).toMatchInlineSnapshot(`
        Array [
          3.2,
          3.1568,
        ]
    `)
})
