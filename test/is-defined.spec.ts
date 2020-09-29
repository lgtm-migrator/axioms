import { isDefined } from '~/is-defined'

test('undefined results in false', () => {
    expect(isDefined(undefined)).toBe(false)
})

test('null results in false', () => {
    expect(isDefined(null)).toBe(false)
})

test('falsey values result in true', () => {
    expect([false, 0, {}, [], ''].every(isDefined)).toEqual(true)
})
