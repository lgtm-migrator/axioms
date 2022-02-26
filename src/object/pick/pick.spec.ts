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
            return all((k) => k in x && k in filtered, keysOf(filtered))
        })
    })

    test('key filtered if not picked', () => {
        forAll(dict(unknown()), (x) => {
            const filtered = pickBy(([k]) => deterministicBoolean(k), x)
            return all((k) => (deterministicBoolean(k) ? k in filtered : !(k in filtered) && k in x), keysOf(x))
        })
    })
})

describe('pick', () => {
    test('simple', () => {
        expect(pick(['foo', 'bar'], { foo: 'bar', bar: 'foo', baz: 'baz' })).toMatchInlineSnapshot(`
            Object {
              "bar": "foo",
              "foo": "bar",
            }
        `)
    })

    test('pick keysOf x x === identity', () => {
        forAll(dict(unknown()), (x) => equal(pick(keysOf(x), x), x))
    })

    test('pick keysOf x x !== [ref] x', () => {
        forAll(dict(unknown()), (x) => pick(keysOf(x), x) !== x)
    })

    test('pick [] x == {}', () => {
        forAll(dict(unknown()), (x) => equal(pick([], x), {}))
    })

    test('key filtered in both filtered and original', () => {
        forAll(dict(unknown()), (x) => {
            const filtered = pick(keysOf(x).filter(deterministicBoolean), x)
            return all((k) => k in x && k in filtered, keysOf(filtered))
        })
    })

    test('key filtered if not picked', () => {
        forAll(dict(unknown()), (x) => {
            const filtered = pick(keysOf(x).filter(deterministicBoolean), x)
            return all((k) => (deterministicBoolean(k) ? k in filtered : !(k in filtered) && k in x), keysOf(x))
        })
    })
})
