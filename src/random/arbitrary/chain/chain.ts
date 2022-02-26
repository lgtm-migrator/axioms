import type { Tree } from '../../../algorithm'
import { mapTree } from '../../../algorithm'
import { applicative } from '../../../iterator/applicative'
import { concat } from '../../../iterator/concat'
import { map } from '../../../iterator/map'
import type { Arbitrary } from '../arbitrary'
import type { Dependent } from '../dependent'
import { makeDependent } from '../dependent'

export function collapseArbitraryTree<T>(x: Tree<Tree<T>>): Tree<T> {
    return {
        value: x.value.value,
        children: applicative(
            concat(
                map((c) => collapseArbitraryTree(c), x.children),
                x.value.children
            )
        ),
    }
}

export function chainArbitrary<T, U>(f: (a: T) => Arbitrary<U>, a: Arbitrary<T>): Dependent<U> {
    return makeDependent((context) => {
        return collapseArbitraryTree(mapTree((x) => f(x).value(context), a.value(context)))
    })
}
