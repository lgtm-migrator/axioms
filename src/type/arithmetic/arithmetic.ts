type _BuildTuple<L extends number, T extends any[] = []> =
    T extends { length: L } ? T : _BuildTuple<L, [...T, any]>

export type Subtract<A extends number, B extends number> = _BuildTuple<A> extends [...(infer R), ..._BuildTuple<B>] ? R['length'] : 0

export type Add<A extends number, B extends number> = [..._BuildTuple<A>, ..._BuildTuple<B>]['length']
