import { fill } from '~/fill'

test('simple', () => {
    expect(fill([1, 2, 3, 'b'], 'a')).toEqual(['a', 'a', 'a', 'a'])
})

test('simple 2', () => {
    expect(fill(Array(3), 2)).toEqual([2, 2, 2])
})

test('fill middle', () => {
    expect(fill<number | string>([4, 6, 8, 10], '*', 1, 3)).toEqual([4, '*', '*', 10])
})
