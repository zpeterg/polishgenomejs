const { fragmentByLine, filterByLength, filterByQuality } = require('./clean')
const { align, formatPreAlign, formatItems, addConsensusToFormat } = require('./align')

module.exports = (data, options = {}, step = 100) => {
  if (typeof options.minLength === 'undefined') options.minLength = 20
  if (typeof options.minQuality === 'undefined') options.minQuality = 10
  if (typeof options.maxErrorRate === 'undefined') options.maxErrorRate = 0.2
  if (typeof options.searchLength === 'undefined') options.searchLength = 5

  // Retrieve the quality by step
  let rtn = fragmentByLine(data)
  if (step <= 0) rtn = filterByLength(rtn, options.minLength)
  if (step >= 1) rtn = filterByQuality(rtn, options.minQuality)

  // Not aligned
  // If not aligned (0/1), format with score as 2nd column
  if (step <= 1) return formatPreAlign(rtn)

  // Aligned
  if (step >= 2) rtn = formatItems(align(rtn.map(x => x.data), options.maxErrorRate, options.searchLength))

  // If only aligned/formatted (2), stop there
  if (step === 2) return rtn
 
  // If aligned/formatted/consensus (3), return that
  return addConsensusToFormat(rtn)
}