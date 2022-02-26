import { isObject } from '../../guard/is-object'
import type { Either } from '../../type/either'
import type { Maybe } from '../../type/maybe'
import { Nothing } from '../../type/maybe'

import type { Stats } from 'fs'
import { promises } from 'fs'

export async function fstat<E = Error>(file: string): Promise<Maybe<Either<E, Maybe<Stats>>>> {
    try {
        return { right: await promises.stat(file) }
    } catch (error) {
        if (isObject(error) && 'code' in error && error.code !== 'ENOENT') {
            return { left: error as E }
        }
    }
    return Nothing
}
