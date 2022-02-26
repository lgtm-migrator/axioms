import { mapTree } from '../../../algorithm/tree'
import type { Dependent } from '../../arbitrary/dependent'
import { makeDependent } from '../../arbitrary/dependent'
import { alphaNumericString } from '../string'

export function symbol(): Dependent<symbol> {
    const symbolStr = alphaNumericString()
    return makeDependent((context) => mapTree((s) => Symbol.for(s), symbolStr.value(context)))
}
