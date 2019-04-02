
exports.findMatchStart = (str1, str2, searchLength=6) => {
  const str1Length = str1.length
  // Work with only the first piece of second str (three-times the search-length to allow some errors)
  const str2StartPiece = str2.substr(0, searchLength*3)
  let indexNum = -1

  // Loop, with buffer on either end
  for (let i=0; i<str1Length-1; i = i+searchLength){
    const thisStr1 = str1.substr(i, searchLength)
    // Look in beginning of str2 for a match
    indexNum = str2StartPiece.indexOf(thisStr1)
  }
  if (indexNum > -1) {
    // Back up a few and loop individually to find the match
    for (let i=indexNum-(searchLength/2); i<str1Length-(searchLength/2); i++){
      const nextFew1 = str1.substr(i, searchLength)
      const indexStr2Num = str2StartPiece.indexOf(nextFew1)
      if (indexStr2Num > -1) {
        return [i, indexStr2Num]
      }
    }
  }
  return []
}

exports.compare = (str1, str2, maxErrorRate=0.2, searchLength) => {
  let errors = 0
  let pad = [[], []]

  const matchStart = exports.findMatchStart(str1, str2)
  const allowErrors = Math.round(str1.length * maxErrorRate)

  if (matchStart.length !== 0){
    // Trim the strings
    str1 = str1.substr(matchStart[0])
    str2 = str2.substr(matchStart[1])
    // Count the offset of 2nd string as error
    errors = matchStart[1]
  
    for (let i=0; i<(str1.length+pad[0].length) && errors < allowErrors; i++){
      const totalPad = pad[0].length
      const TOTALPAD = pad[1].length
      // Account for padding (invert it to keep it corresponding to the other track)
      const next1 = str1[i+-totalPad+1]
      const next2 = str1[i+-totalPad+2]
      const NEXT1 = str2[i+-TOTALPAD+1]
      const NEXT2 = str2[i+-TOTALPAD+2]
      // On reaching the end of either sequence, stop
      if (
        typeof next1 === 'undefined' 
        || typeof NEXT1 === 'undefined'
      ) {
        return { 
          start: matchStart,
          end: [matchStart[0] + i, matchStart[1] + i],
          pad,
          errors,
        }
      }
      // If error, count it
      if (next1 !== NEXT1) {
        errors++
        // If next item doesn't match (eg., a one-off error)...
        if (next2 !== NEXT2){
          // If this item in track 2 matches next item in track 1, pad track 2
          if (next2 === NEXT1) {
            pad[1].push(matchStart[1] + i + 1)
          }
          // If this item in track 1 matches next item in track two, pad track 1
          else if (next1 === NEXT2) {
            pad[0].push(matchStart[0] + i + 1)
          }
        }
      }
    }
  }
  // If errored-out, show error
  return { errors }
}

exports.formatPreAlign = arr => {
  return arr.map(x => {
    let thisRtn = []
    for (let i=0; i<x.data.length; i++){
      thisRtn.push([x.data[i], x.score[i]])
    }
    return thisRtn
  })
}

exports.formatItems = arr => {
  const lastItem = arr[arr.length-1]
  const totalLength = lastItem.indent + lastItem.length
  let rtn = []
  for (let i=0; i<totalLength-1; i++){
    rtn.push(arr.map(x => {
      // If within the span of this data set...
      if (i > x.indent && i < x.indent + x.length) {
        // Print item 
        const thisI = i - x.indent - 1
        const padding = x.pad.filter(p => p < thisI).length
        const thisIsPadded = x.pad.indexOf(thisI) > -1
        if (!thisIsPadded) return x.data[thisI - padding]
      }
      return null
    }))
  }
  return rtn
}

exports.addConsensusToFormat = arr => {
  return arr.map(x => {
    // Get an array of counts - eg., [['A', 2], ['G', 1]]
    const counts = []
    x.map(item => {
      const countsIndex = counts.findIndex(c => c[0] === item)
      if (countsIndex > -1) counts[countsIndex][1]++
      counts.push([item, 1])
    })
    // sort from most frequent to least
    const sorted = counts.sort((a, b) => a[1] < b[1])
    // only use 'null' if there is no 2nd option
    x.push(sorted[0][0] === null && sorted.length > 1 ? sorted[1][0] : sorted[0][0])
    return x
  })
}

exports.align = (arr, maxErrorRate, searchLength) => {
  let comps = []
  for (let i=0; i<arr.length-1; i++){
    // If next item exists, compare this one to it
    if (arr[i+1]){
      const comparison = exports.compare(arr[i], arr[i+1], maxErrorRate, searchLength)
      if (i === 0){
        comps.push({
          data: arr[0],
          indent: 0,
          length: (arr[0].length + comparison.pad[0].length),
          pad: comparison.pad[0],
        })
      }
      const last = comps[comps.length-1]
      comps.push({
        data: arr[i+1],
        indent: last.indent + comparison.start[0] - comparison.start[1],
        length: arr[i+1].length + comparison.pad[1].length,
        pad: comparison.pad[1],
      })
    }
  }
  return comps
}