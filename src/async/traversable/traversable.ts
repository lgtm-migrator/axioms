import type { Mappable, Traversable, Traverser } from '../../type'

export type AsyncTraverser<T, R = unknown> = AsyncIterator<T, R, void> | Traverser<T, R>
export type AsyncTraversable<T, R = unknown> = Traversable<T, R> | { [Symbol.asyncIterator](): AsyncIterator<T, R, void> }
export type AsyncMappable<T, R = unknown> =
    | AsyncTraversable<T, R>
    | AsyncTraverser<T, R>
    | Mappable<T, R>
    | (() => AsyncGenerator<T, R, void>)

export type ToAsyncTraverser<Xs extends AsyncMappable<unknown, unknown>> = Xs extends AsyncMappable<infer T, infer R>
    ? AsyncTraverser<T, R>
    : never
export function toAsyncTraverser<Xs extends AsyncMappable<unknown, unknown>>(xs: Xs): ToAsyncTraverser<Xs> {
    //return isIterable(xs) ? xs[Symbol.iterator]() : isGeneratorFunction(xs) ? xs() : xs
    // inlined
    if (typeof xs === 'string' || Symbol.iterator in xs) {
        return (xs as Traversable<unknown, unknown>)[Symbol.iterator]() as ToAsyncTraverser<Xs>
    } else if (Symbol.asyncIterator in xs) {
        return (xs as { [Symbol.asyncIterator](): AsyncIterator<unknown, unknown, void> })[
            Symbol.asyncIterator
        ]() as ToAsyncTraverser<Xs>
    } else if (typeof xs === 'function' && xs.constructor !== null && xs.constructor.name === 'GeneratorFunction') {
        return xs() as unknown as ToAsyncTraverser<Xs>
    }
    return xs as unknown as ToAsyncTraverser<Xs>
}

export type ToAsyncTraversable<Xs extends AsyncMappable<unknown, unknown>> = Xs extends AsyncMappable<infer T, infer R>
    ? Traversable<T, R>
    : never
export function toAsyncTraversable<Xs extends AsyncMappable<unknown, unknown>>(xs: Xs): ToAsyncTraversable<Xs> {
    //return isIterable(xs) ? xs : isGeneratorFunction(xs) ? xs() : { [Symbol.iterator]: () => xs }
    // inlined
    if (typeof xs === 'string' || Symbol.iterator in xs || Symbol.asyncIterator in xs) {
        return xs as unknown as ToAsyncTraversable<Xs>
    } else if (typeof xs === 'function' && xs.constructor !== null && xs.constructor.name === 'GeneratorFunction') {
        return xs() as unknown as ToAsyncTraversable<Xs>
    }
    return { [Symbol.asyncIterator]: () => xs } as unknown as ToAsyncTraversable<Xs>
}
