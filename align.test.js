const { addConsensusToFormat, formatPreAlign, formatItems, align, compare, findMatchStart } = require('./align')

describe('FindMatchStart', () => {
  test('find start', () => {
    const str1 = 'AATAAAAACATTTGGCACCCACCTATGATTTAATTTTTTAAA'
    const str2 = 'GATTTAATTTTTTAAAAATTTAGAAACATTGAAATATCAA'
    expect(findMatchStart(str1, str2)).toEqual([26, 0])
  })
  test('find start with an error at start of 2nd string', () => {
    const str1 = 'AATAAAAACATTTGGCACCCACCTATGATTTAATTTTTTAAA'
    const str2 = 'CCGATTTAATTTTTTAAAAATTTAGAAACATTGAAATATCAA'
    expect(findMatchStart(str1, str2)).toEqual([26, 2])
  })
})

describe('Compare', () => {
  test('find start and end', () => {
    const str1 = 'AATAAAAACATTTGGCACCCACCTATGATTTAATTTTTTAAA'
    const str2 = 'GATTTAATTTTTTAAAAATTTAGAAACATTGAAATATCAA'
    expect(compare(str1, str2)).toEqual({
      start: [26, 0],
      end: [41, 15],
      errors: 0,
      pad: [[], []]
    })
  })
  test('find start and end with error at start of 2nd string', () => {
    const str1 = 'AATAAAAACATTTGGCACCCACCTATGATTTAATTTTTTAAA'
    const str2 = 'CCGATTTAATTTTTTAAAAATTTAGAAACATTGAAATATCAA'
    expect(compare(str1, str2)).toEqual({
      start: [26, 2],
      end: [41, 17],
      errors: 2,
      pad: [[], []],
    })
  })
  test('find start and end ignoring errors', () => {
    const str1 = 'AATAAAAACATTTGGCACCCACCTATGATTTAATTTTTTAAA'
    const str2 = 'GATTTAATGCTTTAAAAATTTAGAAACATTGAAATATCAA'
    expect(compare(str1, str2)).toEqual({
      start: [26, 0],
      end: [41, 15],
      errors: 2,
      pad: [[], []],
    })
  })
  test('pad str2 if missing a symbol', () => {
    const str1 = 'AATAAAAACATTTGGCACCCACCTATGATTTAATTTTTTAGA'
    const str2 = 'GATTTATTTTTTAGAAATTTAGAAACATTGAAATATCAA'
    expect(compare(str1, str2)).toEqual({
      start: [26, 0],
      end: [41, 15],
      errors: 2,
      pad: [[], [12]],
    })
  })
  test('pad str1 if missing a symbol', () => {
    const str1 = 'AATAAAAACATTTGGCACCCACCTATGATTTAATTTTTAGA'
    const str2 = 'GATTTAATTTTTTAGAAATTTAGAAACATTGAAATATCAA'
    expect(compare(str1, str2)).toEqual({
      start: [26, 0],
      end: [41, 15],
      errors: 1,
      pad: [[38], []]
    })
  })
})

describe('Align', () => {
  test('indent three items', () => {
    const arr = [
      'AATAAAAACATTTGGCACCCACCTATGATTTAATTTTTAGA',
      'GATTTAATTTTTTAGAAATTTAGAAACATTGAAATATCAA',
      'AAACATTGAAATATCAAAGTGAAGTAGCCCA',
    ]
    const res = [
      {"data": "AATAAAAACATTTGGCACCCACCTATGATTTAATTTTTAGA", "indent": 0, "length": 42, pad: [38]},
      {"data": "GATTTAATTTTTTAGAAATTTAGAAACATTGAAATATCAA", "indent": 26, "length": 40, pad: []},
      {"data": "AAACATTGAAATATCAAAGTGAAGTAGCCCA", "indent": 49, "length": 31, pad: []},
    ]

    expect(align(arr)).toEqual(res)
  })
})

describe('FormatPreAlign', () => {
  test('format filtered (not Aligned) to columns', () => {
    const arr = [
      { data: 'AA', score: '#%' },
      { data: 'GC', score: '\'!' }
    ]
    const res = [
      [
        ['A', '#'],
        ['A', '%'],
      ],
      [
        ['G', '\''],
        ['C', '!'],
      ],
    ]
    expect(formatPreAlign(arr)).toEqual(res)
  })
})

describe("FormatItems", () => {
  test('format three items with gaps filled', () => {
    const arr = [
      {"data": "AATAAAAACATTTGGCACCCACCTATGATTTAATTTTTAGA", "indent": 0, "length": 42, pad: [38]},
      {"data": "GATTTAATTTTTTAGAAATTTAGAAACATTGAAATATCAA", "indent": 26, "length": 40, pad: []},
      {"data": "AAACATTGAGATATCAAAGTGAAGTAGCCCA", "indent": 49, "length": 31, pad: []},
    ]
    const res = [ 
    [ 'A', null, null ],
    [ 'A', null, null ],
    [ 'T', null, null ],
    [ 'A', null, null ],
    [ 'A', null, null ],
    [ 'A', null, null ],
    [ 'A', null, null ],
    [ 'A', null, null ],
    [ 'C', null, null ],
    [ 'A', null, null ],
    [ 'T', null, null ],
    [ 'T', null, null ],
    [ 'T', null, null ],
    [ 'G', null, null ],
    [ 'G', null, null ],
    [ 'C', null, null ],
    [ 'A', null, null ],
    [ 'C', null, null ],
    [ 'C', null, null ],
    [ 'C', null, null ],
    [ 'A', null, null ],
    [ 'C', null, null ],
    [ 'C', null, null ],
    [ 'T', null, null ],
    [ 'A', null, null ],
    [ 'T', null, null ],
    [ 'G', 'G', null ],
    [ 'A', 'A', null ],
    [ 'T', 'T', null ],
    [ 'T', 'T', null ],
    [ 'T', 'T', null ],
    [ 'A', 'A', null ],
    [ 'A', 'A', null ],
    [ 'T', 'T', null ],
    [ 'T', 'T', null ],
    [ 'T', 'T', null ],
    [ 'T', 'T', null ],
    [ 'T', 'T', null ],
    [ null, 'T', null ],
    [ 'A', 'A', null ],
    [ 'G', 'G', null ],
    [ 'A', 'A', null ],
    [ null, 'A', null ],
    [ null, 'A', null ],
    [ null, 'T', null ],
    [ null, 'T', null ],
    [ null, 'T', null ],
    [ null, 'A', null ],
    [ null, 'G', null ],
    [ null, 'A', 'A' ],
    [ null, 'A', 'A' ],
    [ null, 'A', 'A' ],
    [ null, 'C', 'C' ],
    [ null, 'A', 'A' ],
    [ null, 'T', 'T' ],
    [ null, 'T', 'T' ],
    [ null, 'G', 'G' ],
    [ null, 'A', 'A' ],
    [ null, 'A', 'G' ],
    [ null, 'A', 'A' ],
    [ null, 'T', 'T' ],
    [ null, 'A', 'A' ],
    [ null, 'T', 'T' ],
    [ null, 'C', 'C' ],
    [ null, 'A', 'A' ],
    [ null, 'A', 'A' ],
    [ null, null, 'A' ],
    [ null, null, 'G' ],
    [ null, null, 'T' ],
    [ null, null, 'G' ],
    [ null, null, 'A' ],
    [ null, null, 'A' ],
    [ null, null, 'G' ],
    [ null, null, 'T' ],
    [ null, null, 'A' ],
    [ null, null, 'G' ],
    [ null, null, 'C' ],
    [ null, null, 'C' ],
    [ null, null, 'C' ],
    [ null, null, 'A' ],
   ]

    expect(formatItems(arr)).toEqual(res)
  })
})

describe('AddConsenusToFormat', () => {
  test('should get consensus with nulls', () => {
    const arr = [
      [ null, 'A', null, null],
      [ null, 'A', 'A', 'A'],
      [ null, 'A', 'A', 'C'],
      [ null, 'A', 'A', 'A'],
      [ null, 'C', 'G', 'C'],
      [ null, 'A', 'A', 'A'],
      [ null, 'T', 'T', 'T'],
      [ null, 'T', 'T', 'C'],
      [ null, null, null, null],
    ]
    const res = [
      [ null, 'A', null, null, 'A'],
      [ null, 'A', 'A', 'A', 'A'],
      [ null, 'A', 'A', 'C', 'A'],
      [ null, 'A', 'A', 'A', 'A'],
      [ null, 'C', 'G', 'C', 'C'],
      [ null, 'A', 'A', 'A', 'A'],
      [ null, 'T', 'T', 'T', 'T'],
      [ null, 'T', 'T', 'C', 'T'],
      [ null, null, null, null, null],
    ]
    expect(addConsensusToFormat(arr)).toEqual(res)
  })
  test('should get consensus with last working', () => {
    const arr = [
      [ null, 'A', null, null],
      [ null, 'A', 'A', 'A'],
      [ null, 'A', 'A', 'C'],
      [ null, 'A', 'A', 'A'],
      [ null, 'C', 'G', 'C'],
      [ null, 'A', 'A', 'A'],
      [ null, null, null, 'T'],
      [ null, null, null, 'C'],
      [ null, null, null, null],
    ]
    const res = [ [ null, 'A', null, null, 'A' ],
        [ null, 'A', 'A', 'A', 'A' ],
        [ null, 'A', 'A', 'C', 'A' ],
        [ null, 'A', 'A', 'A', 'A' ],
        [ null, 'C', 'G', 'C', 'C' ],
        [ null, 'A', 'A', 'A', 'A' ],
        [ null, null, null, 'T', 'T' ],
        [ null, null, null, 'C', 'C' ],
        [ null, null, null, null, null ] ]

    expect(addConsensusToFormat(arr)).toEqual(res)
  })
})