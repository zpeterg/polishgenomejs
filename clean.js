
const qualityScore = "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~"

exports.fragmentByLine = arr => {
  return arr.map(str => {
    arr = str.split('\n')
    return {
      data: arr[1], 
      score: arr[2],
    }
  })
}

exports.filterByLength = (arr, minLength) => {
  return arr.filter(x => x.data.length > minLength)
}

// Filter by quality, and return objects with 
exports.filterByQuality = (arr, minQuality) => {
  let rtn = []
  arr.map(x => {
    let total = 0
    for(let i=0; i<x.score.length; i++){
      total += qualityScore.indexOf(x.score[i])
    }
    const quality = total/x.score.length
    if (quality >= minQuality){
      rtn.push({
        data: x.data,
        quality,
        score: x.score,
      })
    }
  })
  return rtn
}