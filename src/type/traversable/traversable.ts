export type Traverser<T, R = unknown> = Iterator<T, R, void>
export type Traversable<T, R = unknown> = {
    [Symbol.iterator](): Iterator<T, R, void>
}
export type Mappable<T, R = unknown> = Traversable<T, R> | Traverser<T, R> | (() => Generator<T, R, void>)

export function toTraverser<T, R>(xs: Mappable<T, R>): Traverser<T, R> {
    //return isIterable(xs) ? xs[Symbol.iterator]() : isGeneratorFunction(xs) ? xs() : xs
    // inlined
    if (typeof xs === 'string' || Symbol.iterator in xs) {
        return (xs as Traversable<T, R>)[Symbol.iterator]()
    } else if (typeof xs === 'function' && xs.constructor !== null && xs.constructor.name === 'GeneratorFunction') {
        return xs()
    }
    return xs as Traverser<T, R>
}

export function toTraversable<T, R>(xs: Mappable<T, R>): Traversable<T, R> {
    //return isIterable(xs) ? xs : isGeneratorFunction(xs) ? xs() : { [Symbol.iterator]: () => xs }
    // inlined
    if (typeof xs === 'string' || Symbol.iterator in xs) {
        return xs as Traversable<T, R>
    } else if (typeof xs === 'function' && xs.constructor !== null && xs.constructor.name === 'GeneratorFunction') {
        return xs()
    }
    return { [Symbol.iterator]: () => xs } as Traversable<T, R>
}

export function lazy<T, R>(xs: () => Traversable<T, R>): Traversable<T, R> {
    return { [Symbol.iterator]: () => toTraverser(xs()) }
}

export function* toGenerator<T, R = unknown>(xs: Mappable<T>, returnValue?: R): Traversable<T, R> {
    yield* toTraversable(xs)
    return returnValue as R
}
