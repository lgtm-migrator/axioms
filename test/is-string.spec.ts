import { isString } from '~/is-string'

test('string is string', () => {
    expect(isString('foo')).toEqual(true)
})
test('symbol is not string', () => {
    const sym = Symbol.for('error')
    expect(isString(sym)).toEqual(false)
})

test('undefined is not string', () => {
    expect(isString(undefined)).toEqual(false)
})

test('null is not string', () => {
    expect(isString(null)).toEqual(false)
})

test('object is not string', () => {
    expect(isString({})).toEqual(false)
})

test('typeguard works', () => {
    const foo: string | number = 'foo' as any
    if (isString(foo)) {
        expect(foo.length).toEqual(3)
    }
})
