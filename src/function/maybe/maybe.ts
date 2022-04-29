import { isJust } from '../../guard/is-just'
import { isLeft } from '../../guard/is-left'
import { isRight } from '../../guard/is-right'
import type { Either, Left, Right } from '../../type/either'
import type { Maybe } from '../../type/maybe'
import { Nothing } from '../../type/maybe'

export function leftToMaybe<T extends Either<any, any>>(x: T): Maybe<T extends Left<infer L> ? L : never> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return isLeft(x) ? x.left : Nothing
}

export function rightToMaybe<T extends Either<any, any>>(x: T): Maybe<T extends Right<infer R> ? R : never> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return isRight(x) ? x.right : Nothing
}

export function maybeToRight<L, X>(left: L, x: X): Either<L, Exclude<X, Nothing>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return isJust(x) ? { right: x as any } : { left }
}

export function maybeToLeft<X, R>(right: R, x: X): Either<Exclude<X, Nothing>, R> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return isJust(x) ? { left: x as any } : { right }
}

export function maybeAsValue<X>(x: X): Exclude<X, Nothing> | undefined {
    return isJust(x) ? x : undefined
}
