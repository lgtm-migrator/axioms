import { isLeft, isRight } from '../../guard'
import type { Left, Right, Either } from '../../type'

export function eitherAsValue<L>(x: Left<L>): L
export function eitherAsValue<R>(x: Right<R>): R
export function eitherAsValue<L, R>(x: Either<L, R>): L | R
export function eitherAsValue<L, R>(x: Either<L, R>): L | R {
    return 'left' in x ? x.left : x.right
}

export function mapRight<L, R, M>(f: (r: R) => M, x: Either<L, R>): Either<L, M> {
    if (isLeft(x)) {
        return x
    }
    return { right: f(x.right) }
}

export function whenRight<L, R, M>(f: (r: R) => M, x: Either<L, R>): Left<L> | M {
    if (isLeft(x)) {
        return x
    }
    return f(x.right)
}

export function mapLeft<L, R, M>(f: (r: L) => M, x: Either<L, R>): Either<M, R> {
    if (isRight(x)) {
        return x
    }
    return { left: f(x.left) }
}

export function whenLeft<L, R, M>(f: (r: L) => M, x: Either<L, R>): M | Right<R> {
    if (isRight(x)) {
        return x
    }
    return f(x.left)
}
