import { mapTree } from '../../../algorithm'
import type { Mappable } from '../../../type'
import { toGenerator, toTraversable, toTraverser } from '../../../type'
import type { Dependent } from '../../arbitrary'
import { makeDependent } from '../../arbitrary'
import { integer } from '../integer'

type MappableFunc = <T>(m: Mappable<T>) => Mappable<T>
const mappableFuncs: MappableFunc[] = [
    (xs) => [...toTraversable(xs)],
    toTraversable,
    toTraverser,
    toGenerator,
    (xs) =>
        function* () {
            yield* toTraversable(xs)
        },
]
export function mappableFunc(): Dependent<MappableFunc> {
    const aint = integer({ min: 0, max: mappableFuncs.length })
    return makeDependent((context) => mapTree((i) => mappableFuncs[i], aint.value(context)))
}
