import { get } from '~/get'

describe('get', () => {
    test('get on undefined returns undefined', () => {
        const x: { foo: string } | undefined = undefined as any
        expect(get(x, ['foo'])).toEqual(undefined)
    })
    test('get on null returns undefined', () => {
        const x: { foo: string } | null = null
        expect(get(x, ['foo'])).toEqual(undefined)
    })

    test('get on string returns undefined', () => {
        const x: { foo: string } = 'foo' as any
        expect(get(x, ['foo'])).toEqual(undefined)
    })

    test('get on any returns value', () => {
        const x: any = { foo: { bar: 'yay' } }
        expect(get(x, ['foo', 'bar'])).toEqual('yay')
    })

    test('get does not overwrite explicit undefined', () => {
        const x: any = { foo: { bar: undefined } }
        expect(get(x, ['foo', 'bar'], 'nay')).toEqual(undefined)
    })

    test('get does not overwrite explicit null', () => {
        const x: any = { foo: { bar: null } }
        expect(get(x, ['foo', 'bar'], 'nay')).toEqual(null)
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
})
