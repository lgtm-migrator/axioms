import type { Either } from '../../type'
import type { AsyncTraversable } from '../traversable'

export type EitherSettled<Xs> = Xs extends unknown[]
    ? Xs extends []
        ? []
        : Xs extends [infer Y, ...infer Ys]
        ? [Either<unknown, Awaited<Y>>, ...EitherSettled<Ys>]
        : Array<Either<unknown, Awaited<Xs[number]>>>
    : never

export function eitherSettled<Xs extends unknown[]>(xs: readonly [...Xs]): Promise<EitherSettled<Xs>> {
    return Promise.all(
        xs.map(async (x): Promise<Either<unknown, unknown>> => {
            try {
                // eslint-disable-next-line @typescript-eslint/await-thenable
                return { right: await x }
            } catch (err) {
                return { left: err }
            }
        })
    ) as Promise<EitherSettled<Xs>>
}

export async function asyncCollect<T>(xs: AsyncTraversable<T>): Promise<T[]> {
    const ys: T[] = []
    for await (const item of xs) {
        ys.push(item)
    }
    return ys
}

export async function* asyncChunk<T>(size: number, xs: AsyncTraversable<T>): AsyncTraversable<T[]> {
    let chunk: T[] = []
    for await (const item of xs) {
        chunk.push(item)
        if (chunk.length >= size) {
            yield chunk
            chunk = []
        }
    }
    if (chunk.length > 0) {
        yield chunk
    }
}

export async function* asyncMap<I, O>(
    mapper: (x: I, index: number) => O | Promise<O>,
    xs: AsyncTraversable<I>
): AsyncTraversable<O> {
    let i = 0
    for await (const x of xs) {
        yield await mapper(x, i)
        ++i
    }
}
