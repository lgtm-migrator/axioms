import { negate } from '~/negate'

test('negates boolean function', () => {
    expect(negate(() => true)()).toEqual(false)
})

test('accepts single argument', () => {
    function single(foo: string) {
        return foo.includes('foo')
    }
    expect(negate(single)('foo')).toEqual(false)
    expect(negate(single)('bar')).toEqual(true)
})

test('accepts multiple arguments', () => {
    function two(a: number, b: number) {
        return a + b < 10
    }
    const notTwo = negate(two)
    expect(notTwo(1, 1)).toEqual(false)
    expect(notTwo(5, 8)).toEqual(true)

    function three(a: number, b: number, c: string) {
        return a + b < 10 && c !== 'yay'
    }
    const notThree = negate(three)
    expect(notThree(1, 1, 'yay')).toEqual(true)
    expect(notThree(1, 1, 'nay')).toEqual(false)
    expect(notThree(5, 8, 'yay')).toEqual(true)
    expect(notThree(5, 8, 'nay')).toEqual(true)

    function varArg(...args: number[]) {
        return args.reduce((a, b) => a + b, 0) < 10
    }
    const notVarArg = negate(varArg)
    expect(notVarArg(1, 2, 3)).toEqual(false)
    expect(notVarArg(1, 2, 3, 4)).toEqual(true)
})
