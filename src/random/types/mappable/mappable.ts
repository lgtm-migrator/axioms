import { mapTree } from '../../../algorithm'
import type { Mappable } from '../../../type'
import { toGenerator, toTraversable, toTraverser } from '../../../type'
import type { Dependent } from '../../arbitrary'
import { makeDependent } from '../../arbitrary'
import { integer } from '../integer'

type ToMappable<Xs extends Mappable<unknown>> = Xs extends Mappable<infer T, infer R> ? Mappable<T, R> : never
type MappableFunc = <Xs extends Mappable<unknown>>(m: Xs) => ToMappable<Xs>
const mappableFuncs: MappableFunc[] = [
    <Xs extends Mappable<unknown>>(xs: Xs) => [...toTraversable(xs)] as unknown as ToMappable<Xs>,
    toTraversable,
    toTraverser,
    <Xs extends Mappable<unknown>>(xs: Xs) => toGenerator<Xs, never>(xs) as unknown as ToMappable<Xs>,
    <Xs extends Mappable<unknown>>(xs: Xs) =>
        function* () {
            yield* toTraversable(xs)
        } as ToMappable<Xs>,
]
export function mappableFunc(): Dependent<MappableFunc> {
    const aint = integer({ min: 0, max: mappableFuncs.length })
    return makeDependent((context) => mapTree((i) => mappableFuncs[i], aint.value(context)))
}
