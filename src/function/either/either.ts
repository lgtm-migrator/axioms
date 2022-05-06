import { isLeft, isRight } from '../../guard'
import type { Left, Right, Either } from '../../type'

export function eitherAsValue<L>(x: Left<L>): L
export function eitherAsValue<R>(x: Right<R>): R
export function eitherAsValue<L, R>(x: Either<L, R>): L | R
export function eitherAsValue<L, R>(x: Either<L, R>): L | R {
    return 'left' in x ? x.left : x.right
}

export type ArgRights<Xs> = Xs extends [infer X, ...infer Rest]
    ? [X extends Right<infer R> ? R : never, ...ArgRights<Rest>]
    : Xs extends []
    ? []
    : Xs extends Array<infer I>
    ? Array<I extends Right<infer R> ? R : never>
    : []
export type ArgLefts<Xs> = Xs extends [infer X, ...infer Rest]
    ? [X extends Left<infer L> ? L : never, ...ArgLefts<Rest>]
    : Xs extends []
    ? []
    : Xs extends Array<infer I>
    ? Array<I extends Left<infer L> ? L : never>
    : []

export function mapRight<L, R, M>(f: (r: R) => M, x: Either<L, R>): Either<L, M> {
    if (isLeft(x)) {
        return x
    }
    return { right: f(x.right) }
}

export function mapRights<Xs extends Either<any, any>[], M>(
    f: (...rs: ArgRights<Xs>) => M,
    xs: readonly [...Xs]
): Either<ArgLefts<Xs>[number], M> {
    return whenRights((...args) => ({ right: f(...args) }), xs)
}

export function whenRight<L, R, M>(f: (r: R) => M, x: Either<L, R>): Left<L> | M {
    if (isLeft(x)) {
        return x
    }
    return f(x.right)
}

export function whenRights<Xs extends Either<any, any>[], M>(
    f: (...rs: ArgRights<Xs>) => M,
    xs: readonly [...Xs]
): Left<ArgLefts<Xs>[number]> | M {
    const l = xs.find((x) => !isRight(x))
    if (l !== undefined) {
        return l as Left<ArgLefts<Xs>[number]>
    }
    return f(...(xs.map((x) => (x as Right<unknown>).right) as ArgRights<Xs>))
}

export function mapLeft<L, R, M>(f: (r: L) => M, x: Either<L, R>): Either<M, R> {
    if (isRight(x)) {
        return x
    }
    return { left: f(x.left) }
}

export function mapLefts<Xs extends Either<any, any>[], M>(
    f: (...ls: ArgLefts<Xs>) => M,
    xs: readonly [...Xs]
): Either<M, ArgRights<Xs>[number]> {
    return whenLefts((...args) => ({ left: f(...args) }), xs)
}

export function whenLeft<L, R, M>(f: (r: L) => M, x: Either<L, R>): M | Right<R> {
    if (isRight(x)) {
        return x
    }
    return f(x.left)
}

export function whenLefts<Xs extends Either<any, any>[], M>(
    f: (...rs: ArgLefts<Xs>) => M,
    xs: readonly [...Xs]
): M | Right<ArgRights<Xs>[number]> {
    const l = xs.find((x) => !isLeft(x))
    if (l !== undefined) {
        return l as Right<ArgRights<Xs>[number]>
    }
    return f(...(xs.map((x) => (x as Left<unknown>).left) as ArgLefts<Xs>))
}

export function swapEither<L, R>(x: Either<L, R>): Either<R, L> {
    return isLeft(x) ? { right: x.left } : { left: x.right }
}

export function eitherToError<L, R>(x: Either<L, R>): R {
    if (isLeft(x)) {
        throw x.left
    }
    return x.right
}
