import { get } from '~/get'

test('get on undefined returns undefined', () => {
    const x: { foo: string } | undefined = (undefined as unknown) as { foo: string } | undefined
    expect(get(x, ['foo'])).toEqual(undefined)
})
test('get on null returns undefined', () => {
    const x: { foo: string } | null = (null as unknown) as { foo: string } | null
    expect(get(x, ['foo'])).toEqual(undefined)
})

test('get on string returns undefined', () => {
    const x: { foo: string } = ('foo' as unknown) as { foo: string }
    expect(get(x, ['foo'])).toEqual(undefined)
})

test('get on any returns value', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const x: any = { foo: { bar: 'yay' } }
    expect(get(x, ['foo', 'bar'])).toEqual('yay')
})

test('get allows Partial as fallback', () => {
    interface FooBar {
        foo: string
        bar: string
    }
    const x: { x?: FooBar; y?: FooBar } = {
        x: { foo: 'foo', bar: 'bar' },
    }
    expect(get(x, ['x'], { foo: 'bar' })).toEqual({ foo: 'foo', bar: 'bar' })
    expect(get(x, ['y'], { foo: 'bar' })).toEqual({ foo: 'bar' })
})

test('get nested has good intellisense', () => {
    interface DeeplyNested {
        a: { b: { c: { d: { e: { f: { g: { h: { i: string } } } } } } } }
    }

    const deeplyNested: DeeplyNested = {
        a: { b: { c: { d: { e: { f: { g: { h: { i: 'yay' } } } } } } } },
    }
    const x = get(get(deeplyNested, ['a', 'b', 'c', 'd', 'e']), ['f', 'g', 'h', 'i'])!
    expect(x).toEqual('yay')
})
