import { drop } from '~/drop'

test('default argument', () => {
    expect(drop([1, 2, 3])).toEqual([2, 3])
})

test('drop more', () => {
    expect(drop([1, 2, 3], 2)).toEqual([3])
})

test('drop more than exist', () => {
    expect(drop([1, 2, 3], 5)).toEqual([])
})

test('drop none', () => {
    expect(drop([1, 2, 3], 0)).toEqual([1, 2, 3])
})

test('drop negative', () => {
    expect(drop([1, 2, 3], -1)).toEqual([1, 2, 3])
})
