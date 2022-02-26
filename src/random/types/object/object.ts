import { mapTree } from '../../../algorithm/tree'
import { zip } from '../../../array/zip'
import type { Arbitrary } from '../../arbitrary/arbitrary'
import type { ArbitraryContext } from '../../arbitrary/context'
import type { Dependent } from '../../arbitrary/dependent'
import { makeDependent } from '../../arbitrary/dependent'
import { tuple } from '../tuple'

export interface ObjectGenerator {}

export function object<T extends Record<PropertyKey, Arbitrary<unknown>>>(
    properties: T,
    _context: Partial<ObjectGenerator> = {}
): Dependent<{ [K in keyof T]: T[K] extends { value(context: ArbitraryContext): { value: infer Value } } ? Value : never }> {
    const arbitraries = Object.values(properties)
    const keys = Object.keys(properties)
    const avalue = tuple(...arbitraries)
    return makeDependent((context) => mapTree((v) => Object.fromEntries(zip(keys, v)), avalue.value(context))) as Dependent<{
        [K in keyof T]: T[K] extends { value(context: ArbitraryContext): { value: infer Value } } ? Value : never
    }>
}
