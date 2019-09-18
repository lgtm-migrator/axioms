import { dropRight } from '~/drop-right'

test('default argument', () => {
    expect(dropRight([1, 2, 3])).toEqual([1, 2])
})

test('dropRight more', () => {
    expect(dropRight([1, 2, 3], 2)).toEqual([1])
})

test('dropRight more than exist', () => {
    expect(dropRight([1, 2, 3], 5)).toEqual([])
})

test('dropRight none', () => {
    expect(dropRight([1, 2, 3], 0)).toEqual([1, 2, 3])
})

test('dropRight negative', () => {
    expect(dropRight([1, 2, 3], -1)).toEqual([1, 2, 3])
})
