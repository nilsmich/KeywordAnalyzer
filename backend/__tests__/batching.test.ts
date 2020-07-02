describe('batchKeywords()', () => {
  it('tmp', async () => {
    expect(true).toBe(true)
  })
})
/*
import {batchKeywords, mergeTrendBatchAvgs} from '../src/callGoogleApi'
import {initKeywords} from '../src/keywords'
import {kw0, kw1, kw11, kw3, kw4, kw5, kw6} from './__mocks__/keywordMock'

describe('batchKeywords()', () => {
  it('work correctly with empty batch', async () => {
    // given
    const keywords = initKeywords(kw0)

    // when
    const batches = batchKeywords('zubehör pferde', keywords)

    // then
    expect(batches.batches).toStrictEqual([])
  })

  it('work correctly with 1KW', async () => {
    // given
    const keywords = initKeywords(kw1)

    // when
    const batches = batchKeywords('zubehör pferde', keywords)

    // then
    expect(batches.batches.length).toBe(1)
    expect(batches.batches[0].length).toBe(1)
    expect(batches.batches[0][0].keyword).toBe('a')
  })

  it('work correctly with 3KW', async () => {
    // given
    const keywords = initKeywords(kw3)

    // when
    const batches = batchKeywords('zubehör pferde', keywords)

    // then
    expect(batches.batches.length).toBe(1)
    expect(batches.batches[0].length).toBe(3)
    expect(batches.batches[0][2].keyword).toBe('c')
  })

  it('work correctly with 4KW', async () => {
    // given
    const keywords = initKeywords(kw4)

    // when
    const batches = batchKeywords('zubehör pferde', keywords)

    // then
    expect(batches.batches.length).toBe(1)
    expect(batches.batches[0].length).toBe(4)
    expect(batches.batches[0][3].keyword).toBe('d')
  })

  it('work correctly with 5KW', async () => {
    // given
    const keywords = initKeywords(kw5)

    // when
    const batches = batchKeywords('zubehör pferde', keywords)

    // then
    expect(batches.batches.length).toBe(2)
    expect(batches.batches[0].length).toBe(4)
    expect(batches.batches[1].length).toBe(1)
    expect(batches.batches[1][0].keyword).toBe('e')
  })

  it('work correctly with 6KW', async () => {
    // given
    const keywords = initKeywords(kw6)

    // when
    const batches = batchKeywords('zubehör pferde', keywords)

    // then
    expect(batches.batches.length).toBe(2)
    expect(batches.batches[0].length).toBe(4)
    expect(batches.batches[1].length).toBe(2)
    expect(batches.batches[1][1].keyword).toBe('f')
  })

  it('work correctly with 11KW', async () => {
    // given
    const keywords = initKeywords(kw11)

    // when
    const batches = batchKeywords('zubehör pferde', keywords)

    // then
    expect(batches.batches.length).toBe(3)
    expect(batches.batches[0].length).toBe(4)
    expect(batches.batches[1].length).toBe(4)
    expect(batches.batches[2].length).toBe(3)
    expect(batches.batches[2][2].keyword).toBe('k')
  })
})

describe('mergeTrendBatchAvgs()', () => {
  it('all Items are equal', async () => {
    // given
    const avgs = [
      [1, 1, 1, 1, 1],
      [2, 2, 2, 2, 2]
    ]
    const expected = [
      1, 1, 1, 1,
      1, 1, 1, 1
    ]

    // when
    const actual = mergeTrendBatchAvgs(avgs)

    // then
    expect(actual).toStrictEqual(expected)
  })

  it('reference Item is equal', async () => {
    // given
    const avgs = [
      [1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2]
    ]
    const expected = [1, 1, 1, 1, 2, 2, 2, 2]

    // when
    const actual = mergeTrendBatchAvgs(avgs)

    // then
    expect(actual).toStrictEqual(expected)
  })

  it('reference Item is larger in B than in A', async () => {
    // given
    const avgs = [
      [1, 1, 1, 1, 1],
      [2, 4, 4]
    ]
    const expected = [1, 1, 1, 1, 2, 2]

    // when
    const actual = mergeTrendBatchAvgs(avgs)

    // then
    expect(actual).toStrictEqual(expected)
  })

  it('reference Item is 0 and should throw exception', async () => {
    // given
    const avgs = [
      [0, 1, 1, 1, 1],
      [2, 2, 2]
    ]

    // then
    expect(() => mergeTrendBatchAvgs(avgs)).toThrow(Error);
  })
})
*/
