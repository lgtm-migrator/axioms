import { omitBy } from '~/omit-by'

function staticTrue() {
    return true
}

test('undefined gives empty object', () => {
    expect(omitBy(undefined, staticTrue)).toEqual({})
})

test('omits all properties if the function is statically true', () => {
    expect(omitBy({ foo: 'foo', bar: 'bar' }, staticTrue)).toEqual({})
})

test('can filter based on key', () => {
    expect(omitBy({ foo: 'foo', bar: 'bar' }, (_, k) => k === 'foo')).toEqual({ bar: 'bar' })
})

test('can filter based on value', () => {
    expect(omitBy({ foo: 'bar', bar: 'foo' }, v => v === 'foo')).toEqual({ foo: 'bar' })
})

test('creates shallow clone of the object', () => {
    const orig = { foo: 'bar', bar: 'foo' }
    const filtered = omitBy(orig, v => v === 'foo')
    orig.foo = 'foo'
    expect(filtered).toEqual({ foo: 'bar' })
})
