import { applicative, map, filter, concat } from '../../iterator'
import type { Traversable, Showable } from '../../type'
import { queue } from '../queue'
import { stack } from '../stack'

export interface Tree<T> {
    value: T
    children: Traversable<Tree<T>>
}

export function tree<T>(x: T, children?: Traversable<Tree<T>>): Tree<T> {
    return { value: x, children: children ?? [] }
}

export function applicativeTree<T>(x: Tree<T>): Tree<T> {
    return { value: x.value, children: applicative(map((c) => applicativeTree(c), x.children)) }
}

export function mapTree<T, U>(f: (x: T) => U, x: Tree<T>): Tree<U> {
    return { value: f(x.value), children: map((c) => mapTree(f, c), x.children) }
}

export function mapApplicativeTree<T, U>(f: (x: T) => U, x: Tree<T>): Tree<U> {
    return { value: f(x.value), children: applicative(map((c) => mapTree(f, c), x.children)) }
}

export function filterTree<T>(f: (x: T) => boolean, x: Tree<T>): Tree<T> {
    return {
        value: x.value,
        children: map(
            (c) => filterTree(f, c),
            filter((c) => f(c.value), x.children)
        ),
    }
}
export function filterApplicativeTree<T>(f: (x: T) => boolean, x: Tree<T>): Tree<T> {
    return {
        value: x.value,
        children: applicative(
            map(
                (c) => filterTree(f, c),
                filter((y) => f(y.value), x.children)
            )
        ),
    }
}

export function unfoldTree<T>(f: (x: T) => Traversable<T>, x: T): Tree<T> {
    return { value: x, children: map((c) => unfoldTree(f, c), f(x)) }
}

export function expandTree<T>(f: (x: T) => Traversable<T>, x: Tree<T>): Tree<T> {
    return {
        value: x.value,
        children: concat(
            map((c) => expandTree(f, c), x.children),
            map((c) => unfoldTree(f, c), f(x.value))
        ),
    }
}

export function evaluateTree<T>(x: Tree<T>): Tree<T> {
    return {
        value: x.value,
        children: map((c) => evaluateTree(c), x.children),
    }
}

export function* dfsPreOrder<T>(node: Tree<T>): Traversable<T, void> {
    const nodes = stack([node])
    for (const x of nodes) {
        yield x.value
        nodes.push(x.children)
    }
}

export function* dfsPostOrder<T>(node: Tree<T>): Traversable<T, void> {
    const nodes = stack([node])
    const ordered = []
    for (const x of nodes) {
        ordered.push(x.value)
        nodes.push(x.children)
    }

    for (const value of ordered.reverse()) {
        yield value
    }
}

export function* bfs<T>(node: Tree<T>): Traversable<T, void> {
    const nodes = queue([node])
    for (const x of nodes) {
        yield x.value
        nodes.enqueue(x.children)
    }
}

export function showTree<T extends Showable>(t: Tree<T>, indent = '', isLast = true, depth = 0): string {
    if (depth > 2) {
        return `${indent}└─...`
    }
    const result = `${indent}${isLast ? '└─' : '├─'} ${t.value.toString()}`
    indent += isLast ? '    ' : '|   '
    const children = [...t.children]
    return `${result}${children.length > 0 ? '\n' : ''}${children
        .map((child, i) => showTree(child, indent, i === children.length - 1, depth + 1))
        .join('\n')}`
}
