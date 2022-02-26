import { iterate } from '.'

import { counter } from '..'
import { allEqual, take } from '../../iterator'
import { forAll, float } from '../../random'

test('iterate x + 1 === counter x', () => {
    forAll(float(), (x) =>
        allEqual(
            take(
                100,
                iterate((y) => y + 1, x)
            ),
            take(100, counter(x))
        )
    )
})
