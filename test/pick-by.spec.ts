import { pickBy } from '~/pick-by'

function staticTrue() {
    return true
}
test('undefined gives empty object', () => {
    expect(pickBy(undefined, staticTrue)).toEqual({})
})

test('transfers all properties if the function is statically true', () => {
    expect(pickBy({ foo: 'foo', bar: 'bar' }, staticTrue)).toEqual({ foo: 'foo', bar: 'bar' })
})

test('can filter based on key', () => {
    expect(pickBy({ foo: 'foo', bar: 'bar' }, (_, k) => k === 'foo')).toEqual({ foo: 'foo' })
})

test('can filter based on value', () => {
    expect(pickBy({ foo: 'bar', bar: 'foo' }, (v) => v === 'foo')).toEqual({ bar: 'foo' })
})

test('creates shallow clone of the object', () => {
    const orig = { foo: 'bar', bar: 'foo' }
    const filtered = pickBy(orig, (v) => v === 'foo')
    orig.bar = 'bar'
    expect(filtered).toEqual({ bar: 'foo' })
})
