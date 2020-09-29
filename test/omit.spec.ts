import { omit } from '~/omit'

test('undefined gives empty object', () => {
    const foo: { foo: string } | undefined = undefined
    expect(omit(foo, 'foo')).toEqual({})
})

test('omits all properties', () => {
    expect(omit({ foo: 'foo', bar: 'bar' }, 'foo', 'bar')).toEqual({})
})

test('can filter based on key', () => {
    expect(omit({ foo: 'foo', bar: 'bar' }, 'foo')).toEqual({ bar: 'bar' })
})

test('creates shallow clone of the object', () => {
    const orig = { foo: 'bar', bar: 'foo' }
    const filtered = omit(orig, 'bar')
    orig.foo = 'foo'
    expect(filtered).toEqual({ foo: 'bar' })
})
