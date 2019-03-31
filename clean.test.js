const { FilterByLength, FilterByQuality, FragmentByLine } = require('./clean')

describe('Clean', () => {
  describe('FragmentByLine', () => {
    test('should extract the 2nd and 3rd line of a string into an array', () => {
      const str = ['do not include\ninclude this\nand this\nnot this\nnor this', '\ninclude this\nand this']
      const res = [
        {
          data: 'include this',
          score: 'and this',
        },
        {
          data: 'include this',
          score: 'and this',
        },
      ]
      expect(FragmentByLine(str)).toEqual(res)
    })
  })

  describe('FilterByLength', () => {
    test('should remove items that do meet min-length', () => {
      const arr = [
        { data: 'my name is', score: 'Ishmael'},
        { data: 'no', score: 'not this one'},
        { data: 'once upon a time', score: 'in a land'}
      ]
      const res = [
        { data: 'my name is', score: 'Ishmael'},
        { data: 'once upon a time', score: 'in a land'}
      ]
      expect(FilterByLength(arr, 5)).toEqual(res)
    })
  })

  describe('FilterByQuality', () => {
    test('should remove items by low average quality string', () => {
      const arr = [
        {
          data: 'GATTT',
          score: "!''*(",
        },
        {
          data: 'AAGCA',
          score: ")%%%+",
        },
      ]
      const res = [
        {
          data: 'GATTT',
          quality: 5.6,
        },
        {
          data: 'AAGCA',
          quality: 6,
        },
      ]
      expect(FilterByQuality(arr, 5)).toEqual(res)
    })
  })
})