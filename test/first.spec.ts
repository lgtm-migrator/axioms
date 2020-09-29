import { first } from '~/first'

test('simple', () => {
    expect(first([1, 2, 3])).toEqual([1])
})

test('first n', () => {
    expect(first([1, 2, 3], 2)).toEqual([1, 2])
})

test('first larger than array', () => {
    expect(first([1, 2, 3], 6)).toEqual([1, 2, 3])
})

test('first negative number', () => {
    expect(first([1, 2, 3], -6)).toEqual([])
})

test('empty', () => {
    expect(first([])).toEqual([])
})

test('undefined', () => {
    expect(first(undefined)).toEqual([])
})

test('null', () => {
    expect(first(null)).toEqual([])
})
