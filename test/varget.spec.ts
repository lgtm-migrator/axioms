import { varget } from '~/varget'

test('varget on undefined returns undefined', () => {
    const x: { foo: string } | undefined = undefined as any
    expect(varget(x, ['foo'])).toEqual(undefined)
})
test('varget on null returns undefined', () => {
    const x: { foo: string } | null = null
    expect(varget(x, ['foo'])).toEqual(undefined)
})

test('varget on string returns undefined', () => {
    const x: { foo: string } = 'foo' as any
    expect(varget(x, ['foo'])).toEqual(undefined)
})

test('varget on any returns value', () => {
    const x: any = { foo: { bar: 'yay' } }
    expect(varget(x, ['foo', 'bar'])).toEqual('yay')
})

test('varget allows Partial as fallback', () => {
    interface FooBar {
        foo: string
        bar: string
    }
    const x: { x?: FooBar; y?: FooBar } = {
        x: { foo: 'foo', bar: 'bar' },
    }
    expect(varget(x, ['x'], { foo: 'bar' })).toEqual({ foo: 'foo', bar: 'bar' })
    expect(varget(x, ['y'], { foo: 'bar' })).toEqual({ foo: 'bar' })
})

test('varget with string throws error', () => {
    interface FooBar {
        foo: string
        bar: string
    }
    const x: { x?: FooBar; y?: FooBar } = {
        x: { foo: 'foo', bar: 'bar' },
    }
    expect(varget(x, ['x'], { foo: 'bar' })).toEqual({ foo: 'foo', bar: 'bar' })
    expect(varget(x, ['y'], { foo: 'bar' })).toEqual({ foo: 'bar' })
})

test('varget deeply nested has good intellisense', () => {
    interface DeepNesting {
        a?: { b: { c: { d: { e: { f: { g: string } } } } } }
    }

    const y: DeepNesting = { a: { b: { c: { d: { e: { f: { g: 'yay' } } } } } } }
    const yy = varget(varget(y, ['a', 'b', 'c', 'd', 'e']), ['f', 'g'])!

    expect(yy).toEqual('yay')
})
