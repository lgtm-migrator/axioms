import { compact } from '~/compact'

test('simple', () => {
    expect(compact([1, 2, 3])).toEqual([1, 2, 3])
})

test('filter null', () => {
    expect(compact([1, null, 2, 3])).toEqual([1, 2, 3])
})

test('filter undefined', () => {
    expect(compact([1, undefined, 2, 3])).toEqual([1, 2, 3])
})

test('do not filter falsey', () => {
    expect(compact([1, false, 2, 3])).toEqual([1, false, 2, 3])
})

test('empty', () => {
    expect(compact([])).toEqual([])
})
