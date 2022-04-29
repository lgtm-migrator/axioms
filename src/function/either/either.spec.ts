import { mapLefts, mapRights, whenLefts, whenRights } from './either'

test('mapRights', () => {
    expect(mapRights((x0, x1) => x1, [{ left: 0 }, { right: 'a' }])).toMatchInlineSnapshot(`
        Object {
          "left": 0,
        }
    `)
    expect(whenRights((x0, x1) => [x0, x1], [{ right: 0 }, { right: 'a' }])).toMatchInlineSnapshot(`
        Array [
          0,
          "a",
        ]
    `)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(whenRights((x0, x1, x2) => [x0, x1, x2], [{ right: 0 }, { right: 'a' }])).toMatchInlineSnapshot(`
        Array [
          0,
          "a",
          undefined,
        ]
    `)
})

test('mapLefts', () => {
    expect(mapLefts((x0, x1) => x1, [{ left: 0 }, { right: 'a' }])).toMatchInlineSnapshot(`
        Object {
          "right": "a",
        }
    `)
    expect(whenLefts((x0, x1) => [x0, x1], [{ left: 0 }, { left: 'a' }])).toMatchInlineSnapshot(`
        Array [
          0,
          "a",
        ]
    `)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(whenLefts((x0, x1, x2) => [x0, x1, x2], [{ left: 0 }, { left: 'a' }])).toMatchInlineSnapshot(`
        Array [
          0,
          "a",
          undefined,
        ]
    `)
})
