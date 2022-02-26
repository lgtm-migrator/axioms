import { mapAccumL } from '.'

import { collect } from '../../array'
import { toGenerator } from '../../type'

test('simple', () => {
    const ml = mapAccumL((a, b) => [a, a * b], 5, [9, 6, 3])

    expect(collect(toGenerator(ml))).toMatchInlineSnapshot(`
        Array [
          45,
          30,
          15,
        ]
    `)
})
