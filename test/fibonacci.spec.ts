import { collect } from '../src/array'
import { take } from '../src/iterator'

test('simple', () => {
    function* fibonacci() {
        let prev = 0
        let curr = 1
        while (true) {
            yield curr
            curr = curr + prev
            prev = curr - prev
        }
    }

    expect(collect(take(10, fibonacci()))).toMatchInlineSnapshot(`
        Array [
          1,
          1,
          2,
          3,
          5,
          8,
          13,
          21,
          34,
          55,
        ]
    `)
})
