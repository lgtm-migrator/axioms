import { pick, pickBy } from '.'

import { keysOf } from '..'
import { all, equal } from '../../iterator'
import { forAll, dict, unknown, deterministicBoolean } from '../../random'

describe('pickBy', () => {
    test('pickBy true x === identity', () => {
        forAll(dict(unknown()), (x) =>
            equal(
                pickBy(() => true, x),
                x
            )
        )
    })

    test('pickBy true x !== [ref] x', () => {
        forAll(dict(unknown()), (x) => pickBy(() => true, x) !== x)
    })

    test('pickBy false x == {}', () => {
        forAll(dict(unknown()), (x) =>
            equal(
                pickBy(() => false, x),
                {}
            )
        )
    })

    test('key filtered in both filtered and original', () => {
        forAll(dict(unknown()), (x) => {
            const filtered = pickBy((key) => deterministicBoolean(key), x)
            return all(keysOf(filtered), (k) => k in x && k in filtered)
        })
    })

    test('key filtered if not picked', () => {
        forAll(dict(unknown()), (x) => {
            const filtered = pickBy(([k]) => deterministicBoolean(k), x)
            return all(keysOf(x), (k) => (deterministicBoolean(k) ? k in filtered : !(k in filtered) && k in x))
        })
    })
})

describe('pick', () => {
    test('simple', () => {
        expect(pick({ foo: 'bar', bar: 'foo', baz: 'baz' }, ['foo', 'bar'])).toMatchInlineSnapshot(`
            Object {
              "bar": "foo",
              "foo": "bar",
            }
        `)
    })

    test('pick keysOf x x === identity', () => {
        forAll(dict(unknown()), (x) => equal(pick(x, keysOf(x)), x))
    })

    test('pick keysOf x x !== [ref] x', () => {
        forAll(dict(unknown()), (x) => pick(x, keysOf(x)) !== x)
    })

    test('pick [] x == {}', () => {
        forAll(dict(unknown()), (x) => equal(pick(x, []), {}))
    })

    test('key filtered in both filtered and original', () => {
        forAll(dict(unknown()), (x) => {
            const filtered = pick(x, keysOf(x).filter(deterministicBoolean))
            return all(keysOf(filtered), (k) => k in x && k in filtered)
        })
    })

    test('key filtered if not picked', () => {
        forAll(dict(unknown()), (x) => {
            const filtered = pick(x, keysOf(x).filter(deterministicBoolean))
            return all(keysOf(x), (k) => (deterministicBoolean(k) ? k in filtered : !(k in filtered) && k in x))
        })
    })
})
