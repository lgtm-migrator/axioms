import { chunk } from '~/chunk'

test('simple chunk function', () => {
    expect(chunk([1, 2, 3, 4, 5])).toEqual([[1], [2], [3], [4], [5]])
})

test('simple chunk function, other offset 3', () => {
    expect(chunk([1, 2, 3, 4, 5], 3)).toEqual([
        [1, 2, 3],
        [4, 5],
    ])
})

test('simple chunk function, other offset 5', () => {
    expect(chunk([1, 2, 3, 4, 5], 5)).toEqual([[1, 2, 3, 4, 5]])
})

test('simple chunk function larger than array', () => {
    expect(chunk([1, 2, 3, 4, 5], 10)).toEqual([[1, 2, 3, 4, 5]])
})

test('simple chunk function offset 0', () => {
    expect(chunk([1, 2, 3, 4, 5], 0)).toEqual([[1], [2], [3], [4], [5]])
})

test('simple chunk function offset negative', () => {
    expect(chunk([1, 2, 3, 4, 5], -5)).toEqual([[1], [2], [3], [4], [5]])
})
