import { collect } from '../../array'
import { range } from '../../generator'
import { chunk } from '../../iterator'

test('simple chunk function', () => {
    expect(collect(chunk(1, [1, 2, 3, 4, 5]))).toEqual([[1], [2], [3], [4], [5]])
})

test('simple chunk function, other offset 3', () => {
    expect(collect(chunk(3, [1, 2, 3, 4, 5]))).toEqual([
        [1, 2, 3],
        [4, 5],
    ])
})

test('simple chunk function, other offset 5', () => {
    expect(collect(chunk(5, [1, 2, 3, 4, 5]))).toEqual([[1, 2, 3, 4, 5]])
})

test('simple chunk function larger than array', () => {
    expect(collect(chunk(10, [1, 2, 3, 4, 5]))).toEqual([[1, 2, 3, 4, 5]])
})

test('simple chunk function offset 0', () => {
    expect(collect(chunk(0, [1, 2, 3, 4, 5]))).toEqual([])
})

test('simple chunk function offset negative', () => {
    expect(collect(chunk(-5, [1, 2, 3, 4, 5]))).toEqual([])
})

test('tco', () => {
    expect(collect(chunk(3, range(32768))).flat()).toEqual(collect(range(32768)))
})
