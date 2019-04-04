import { hashString } from '../src/hashString'
import { getHashCode } from '../src/ts-gethashcode'
import { hashObject } from '../src/hashObject'
import { hashSequence } from '../src/hashSequence'

/**
 * Dummy test
 */
describe('hashString', () => {
  it('hashes', () => {
    const v = 'hello world!'
    const vv = 'goodbye world!'
    const h = hashString(v)
    const hh = hashString(vv)
    expect(h).not.toBe(hh)

    const o = { a: [2, 3, 4, true, ''], b: 'foodie', c: undefined }
    expect(() => getHashCode(o)).not.toThrow()

    expect(() =>
      getHashCode(function(): void {
        return
      })
    ).toThrow()
  })
  it('throws on circular ref', () => {
    const a: any = []
    a.push(a)
    expect(() => getHashCode(a)).toThrow()
  })
  it('works with null', () => {
    expect(() => getHashCode(null)).not.toThrow()
    expect(() => hashObject(null, new Set<number>(), getHashCode)).not.toThrow()
    expect(getHashCode(null)).toBe(hashObject(null, new Set<number>(), getHashCode))
  })
  it('works with different ordering', () => {
    expect(getHashCode({ a: 1, b: 2, c: 3 })).toBe(getHashCode({ b: 2, a: 1, c: 3 }))
    expect(getHashCode({ a: 1, b: 2, c: 3 })).toBe(getHashCode({ c: 3, a: 1, b: 2 }))
  })
})

describe('hashSequence', () => {
  it('hashes', () => {
    const seq = ['a', 1, true, { a: 3 }]
    const h1 = hashSequence(seq, new Set<number>(), getHashCode)
    const h2 = hashSequence(seq, new Set<number>(), getHashCode)
    expect(h1).toBe(h2)
  })
})
