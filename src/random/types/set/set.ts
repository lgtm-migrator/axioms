import { filterTree } from '../../../algorithm/tree'
import { collect } from '../../../array/collect'
import { equal } from '../../../iterator/equal'
import { unique } from '../../../iterator/unique'
import type { RelaxedPartial } from '../../../type/partial'
import type { Arbitrary } from '../../arbitrary/arbitrary'
import { makeDependent } from '../../arbitrary/dependent'
import { InfeasibleTree } from '../../arbitrary/shrink'
import { arrayWith } from '../array'

export interface SetGenerator<T> {
    minLength: number
    maxLength: number
    eq: (a: T, b: T) => boolean
}

export function set<T>(arbitrary: Arbitrary<T>, context: RelaxedPartial<SetGenerator<T>> = {}): Arbitrary<T[]> {
    const { minLength = 0, maxLength = 10, eq = equal } = context
    const aarray = arrayWith(
        (y, xs, i) => {
            if (i > maxLength * 2) {
                throw new InfeasibleTree()
            }
            return xs.find((x) => eq(y, x)) === undefined
        },
        arbitrary,
        { minLength, maxLength }
    )
    return makeDependent((ctx) => {
        // make sure we don't shrink to an array with duplicates
        return filterTree((x) => collect(unique(x, eq)).length === x.length, aarray.value(ctx))
    })
}
