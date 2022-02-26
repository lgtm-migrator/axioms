import { omitUndefined, omit } from '.'

import { keysOf } from '..'
import { all, equal } from '../../iterator'
import { forAll, dict, unknown, deterministicBoolean } from '../../random'

describe('omitUndefined', () => {
    test('omitUndefined x === identity, if all values defined', () => {
        forAll(dict(unknown({ undefined: false })), (x) => equal(omitUndefined(x), x))
    })

    test('key filtered in both filtered and original', () => {
        forAll(dict(unknown()), (x) => {
            const filtered = omitUndefined(x)
            return all((k) => k in x && k in filtered, keysOf(filtered))
        })
    })

    test('key in filtered if not omitted', () => {
        forAll(dict(unknown()), (x) => {
            const filtered = omitUndefined(x)
            return all((k) => (x[k] !== undefined ? k in filtered : !(k in filtered) && k in x), keysOf(x))
        })
    })
})

describe('omit', () => {
    test('simple', () => {
        expect(omit(['foo', 'bar'], { foo: 'bar', bar: 'foo', baz: 'baz' })).toMatchInlineSnapshot(`
            Object {
              "baz": "baz",
            }
        `)
    })

    test('omit [] x === identity', () => {
        forAll(dict(unknown()), (x) => equal(omit([], x), x))
    })

    test('omit [] x !== [ref] x', () => {
        forAll(dict(unknown()), (x) => omit([], x) !== x)
    })

    test('omit keysOf x x == {}', () => {
        forAll(dict(unknown()), (x) => equal(omit(keysOf(x), x), {}))
    })

    test('key filtered in both filtered and original', () => {
        forAll(dict(unknown()), (x) => {
            const filtered = omit(keysOf(x).filter(deterministicBoolean), x)
            return all((k) => k in x && k in filtered, keysOf(filtered))
        })
    })

    test('key filtered if not omited', () => {
        forAll(dict(unknown()), (x) => {
            const filtered = omit(keysOf(x).filter(deterministicBoolean), x)
            return all((k) => (!deterministicBoolean(k) ? k in filtered : !(k in filtered) && k in x), keysOf(x))
        })
    })
})
