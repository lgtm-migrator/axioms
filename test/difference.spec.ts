import { difference } from '~/difference'

test('simple', () => {
    expect(difference([1, 2, 3, 4, 5], [5, 2, 10])).toEqual([1, 3, 4])
})

test('simple 2', () => {
    expect(difference([2, 1], [2, 3])).toEqual([1])
})
