import { isJust } from '../../guard/is-just'
import { isLeft } from '../../guard/is-left'
import { isRight } from '../../guard/is-right'
import type { Either, Left, Right } from '../../type/either'
import type { Just, Maybe } from '../../type/maybe'
import { Nothing } from '../../type/maybe'

export function leftToMaybe<R>(x: Right<R>): Nothing
export function leftToMaybe<L>(x: Left<L>): Just<L>
export function leftToMaybe<L, R>(x: Either<L, R>): Maybe<L>
export function leftToMaybe<L, R>(x: Either<L, R>): Maybe<L> {
    return isLeft(x) ? x.left : Nothing
}

export function rightToMaybe<R>(x: Right<R>): Just<R>
export function rightToMaybe<L>(x: Left<L>): Nothing
export function rightToMaybe<L, R>(x: Either<L, R>): Maybe<R>
export function rightToMaybe<L, R>(x: Either<L, R>): Maybe<R> {
    return isRight(x) ? x.right : Nothing
}

export function maybeToRight<L, R>(left: L, x: Just<R>): Right<R>
export function maybeToRight<L>(left: L, x: Nothing): Left<L>
export function maybeToRight<L, R>(left: L, x: Maybe<R>): Either<L, R>
export function maybeToRight<L, R>(left: L, x: Maybe<R>): Either<L, R> {
    return isJust(x) ? { right: x } : { left }
}

export function maybeToLeft<L, R>(right: R, x: Just<L>): Left<L>
export function maybeToLeft<R>(right: R, x: Nothing): Right<R>
export function maybeToLeft<L, R>(right: R, x: Maybe<L>): Either<L, R>
export function maybeToLeft<L, R>(right: R, x: Maybe<L>): Either<L, R> {
    return isJust(x) ? { left: x } : { right }
}

export function eitherAsValue<L>(x: Left<L>): L
export function eitherAsValue<R>(x: Right<R>): R
export function eitherAsValue<L, R>(x: Either<L, R>): L | R
export function eitherAsValue<L, R>(x: Either<L, R>): L | R {
    return 'left' in x ? x.left : x.right
}

export function maybeAsValue<T>(x: Exclude<Maybe<T>, Nothing>): T
export function maybeAsValue(x: Nothing): undefined
export function maybeAsValue<T>(x: Maybe<T>): T | undefined
export function maybeAsValue<T>(x: Maybe<T>): T | undefined {
    return isJust(x) ? x : undefined
}
