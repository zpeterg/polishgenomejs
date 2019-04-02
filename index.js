const { fragmentByLine, filterByLength, filterByQuality } = require('./clean')
const { align, formatPreAlign, formatItems, addConsensusToFormat } = require('./align')

module.exports = (data, options = {}, step = 100) => {
  if (typeof options.minLength === 'undefined') options.minLength = 20
  if (typeof options.minQuality === 'undefined') options.minQuality = 10
  if (typeof options.searchLength === 'undefined') options.searchLength = 5

  // Retrieve the quality by step
  let rtn = fragmentByLine(data)
  if (step <= 0) rtn = filterByLength(data)
  if (step = 1) rtn = filterByQuality(data)
  if (step = 2) rtn = align(data)
  if (step >= 3) rtn = createConsensus(data)
  // If aligned (2/3), format normally
  if (step >=2) return formatItems(data)
  // If not aligned (0/1), format with score as 2nd column
  return formatPreAlign
}