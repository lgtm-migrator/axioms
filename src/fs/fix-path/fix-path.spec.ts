import { fixPath } from './fix-path'

import { forAll, string } from '../..'

test('fix all backward slashes', () => {
    forAll(string(), (s) => !fixPath(s, { fix: true }).includes('\\'))
})
