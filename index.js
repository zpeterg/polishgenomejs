const { fragmentByLine, filterByLength, filterByQuality } = require('./clean')
const { align, formatPreAlign, formatItems, addConsensusToFormat } = require('./align')

module.exports = (data, options = {}, step = 100) => {
  options.minLength = (typeof options.minLength === 'undefined') ? 20 : +options.minLength
  options.minQuality = (typeof options.minQuality === 'undefined') ? 10 : +options.minQuality
  options.maxErrorRate = (typeof options.maxErrorRate === 'undefined') ? 0.2 : +options.maxErrorRate
  options.searchLength = (typeof options.searchLength === 'undefined') ? 6 : +options.searchLength

  // Retrieve the quality by step
  let rtn = fragmentByLine(data)
  if (step >= 0) rtn = filterByLength(rtn, options.minLength)
  if (step >= 1) rtn = filterByQuality(rtn, options.minQuality)
  // Not aligned
  // If not aligned (0/1), format with score as 2nd column
  if (step <= 1) return formatPreAlign(rtn)
  
  // Aligned
  const aligned = align(rtn.map(x => x.data), options.maxErrorRate, options.searchLength)
  if (step >= 2) rtn = formatItems(aligned)

  // If only aligned/formatted (2), stop there
  if (step === 2) return [rtn]
 
  // If aligned/formatted/consensus (3), return that
  return [addConsensusToFormat(rtn)]
}