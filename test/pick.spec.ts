import { pick } from '~/pick'

test('undefined gives empty object', () => {
    const foo: { foo: string } | undefined = undefined
    expect(pick(foo, 'foo')).toEqual({})
})

test('transfers all properties', () => {
    expect(pick({ foo: 'foo', bar: 'bar' }, 'foo', 'bar')).toEqual({ foo: 'foo', bar: 'bar' })
})

test('can filter based on key', () => {
    expect(pick({ foo: 'foo', bar: 'bar' }, 'foo')).toEqual({ foo: 'foo' })
})

test('creates shallow clone of the object', () => {
    const orig = { foo: 'bar', bar: 'foo' }
    const filtered = pick(orig, 'bar')
    orig.bar = 'bar'
    expect(filtered).toEqual({ bar: 'foo' })
})
