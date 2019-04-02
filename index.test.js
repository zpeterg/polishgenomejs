const polish = require('./index')


describe('Index', () => {
  const arr = [
    "\nAATAAAAACATTTGGCACCCACCTATGATTTAATTTTTAGA\n((((***+))%%%++)(%%%%).1***-+*''))**55CCF>>",
    "\nGATTTAATTTTTTAGAAATTTAGAAACATTGAAATATCAA\n((((***+))%%%++)(%%%%).1***-+*''))**55CCF>>",
    "\nAAACATTGAAATATCAAAGTGAAGTAGCCCA\n((((***+))%%%++)(%%%%).1***-+*''))**55CCF>>",
    "\nAAACATTGAAATATCAAAGTGAAGTAGCCCA\n(((!***+))!%!++)(!%%!!.!***!+*'!))*!55C!F>!"
  ]
  test('should parse an array of strings', () => {
    const res = [ [ null, null, null, null ],
    [ 'A', null, null, 'A' ],
    [ 'A', null, null, 'A' ],
    [ 'T', null, null, 'T' ],
    [ 'A', null, null, 'A' ],
    [ 'A', null, null, 'A' ],
    [ 'A', null, null, 'A' ],
    [ 'A', null, null, 'A' ],
    [ 'A', null, null, 'A' ],
    [ 'C', null, null, 'C' ],
    [ 'A', null, null, 'A' ],
    [ 'T', null, null, 'T' ],
    [ 'T', null, null, 'T' ],
    [ 'T', null, null, 'T' ],
    [ 'G', null, null, 'G' ],
    [ 'G', null, null, 'G' ],
    [ 'C', null, null, 'C' ],
    [ 'A', null, null, 'A' ],
    [ 'C', null, null, 'C' ],
    [ 'C', null, null, 'C' ],
    [ 'C', null, null, 'C' ],
    [ 'A', null, null, 'A' ],
    [ 'C', null, null, 'C' ],
    [ 'C', null, null, 'C' ],
    [ 'T', null, null, 'T' ],
    [ 'A', null, null, 'A' ],
    [ 'T', null, null, 'T' ],
    [ 'G', 'G', null, 'G' ],
    [ 'A', 'A', null, 'A' ],
    [ 'T', 'T', null, 'T' ],
    [ 'T', 'T', null, 'T' ],
    [ 'T', 'T', null, 'T' ],
    [ 'A', 'A', null, 'A' ],
    [ 'A', 'A', null, 'A' ],
    [ 'T', 'T', null, 'T' ],
    [ 'T', 'T', null, 'T' ],
    [ 'T', 'T', null, 'T' ],
    [ 'T', 'T', null, 'T' ],
    [ 'T', 'T', null, 'T' ],
    [ null, 'T', null, 'T' ],
    [ 'A', 'A', null, 'A' ],
    [ 'G', 'G', null, 'G' ],
    [ null, 'A', null, 'A' ],
    [ null, 'A', null, 'A' ],
    [ null, 'A', null, 'A' ],
    [ null, 'T', null, 'T' ],
    [ null, 'T', null, 'T' ],
    [ null, 'T', null, 'T' ],
    [ null, 'A', null, 'A' ],
    [ null, 'G', null, 'G' ],
    [ null, 'A', 'A', 'A' ],
    [ null, 'A', 'A', 'A' ],
    [ null, 'A', 'A', 'A' ],
    [ null, 'C', 'C', 'C' ],
    [ null, 'A', 'A', 'A' ],
    [ null, 'T', 'T', 'T' ],
    [ null, 'T', 'T', 'T' ],
    [ null, 'G', 'G', 'G' ],
    [ null, 'A', 'A', 'A' ],
    [ null, 'A', 'A', 'A' ],
    [ null, 'A', 'A', 'A' ],
    [ null, 'T', 'T', 'T' ],
    [ null, 'A', 'A', 'A' ],
    [ null, 'T', 'T', 'T' ],
    [ null, 'C', 'C', 'C' ],
    [ null, 'A', 'A', 'A' ],
    [ null, null, 'A', null ],
    [ null, null, 'A', null ],
    [ null, null, 'G', null ],
    [ null, null, 'T', null ],
    [ null, null, 'G', null ],
    [ null, null, 'A', null ],
    [ null, null, 'A', null ],
    [ null, null, 'G', null ],
    [ null, null, 'T', null ],
    [ null, null, 'A', null ],
    [ null, null, 'G', null ],
    [ null, null, 'C', null ],
    [ null, null, 'C', null ] ]
    expect(polish(arr)).toEqual(res)
  })
  test('should allow limit to step2', () => {
    const res = [ [ [ 'A', '(' ],
    [ 'A', '(' ],
    [ 'T', '(' ],
    [ 'A', '(' ],
    [ 'A', '*' ],
    [ 'A', '*' ],
    [ 'A', '*' ],
    [ 'A', '+' ],
    [ 'C', ')' ],
    [ 'A', ')' ],
    [ 'T', '%' ],
    [ 'T', '%' ],
    [ 'T', '%' ],
    [ 'G', '+' ],
    [ 'G', '+' ],
    [ 'C', ')' ],
    [ 'A', '(' ],
    [ 'C', '%' ],
    [ 'C', '%' ],
    [ 'C', '%' ],
    [ 'A', '%' ],
    [ 'C', ')' ],
    [ 'C', '.' ],
    [ 'T', '1' ],
    [ 'A', '*' ],
    [ 'T', '*' ],
    [ 'G', '*' ],
    [ 'A', '-' ],
    [ 'T', '+' ],
    [ 'T', '*' ],
    [ 'T', '\'' ],
    [ 'A', '\'' ],
    [ 'A', ')' ],
    [ 'T', ')' ],
    [ 'T', '*' ],
    [ 'T', '*' ],
    [ 'T', '5' ],
    [ 'T', '5' ],
    [ 'A', 'C' ],
    [ 'G', 'C' ],
    [ 'A', 'F' ] ],
  [ [ 'G', '(' ],
    [ 'A', '(' ],
    [ 'T', '(' ],
    [ 'T', '(' ],
    [ 'T', '*' ],
    [ 'A', '*' ],
    [ 'A', '*' ],
    [ 'T', '+' ],
    [ 'T', ')' ],
    [ 'T', ')' ],
    [ 'T', '%' ],
    [ 'T', '%' ],
    [ 'T', '%' ],
    [ 'A', '+' ],
    [ 'G', '+' ],
    [ 'A', ')' ],
    [ 'A', '(' ],
    [ 'A', '%' ],
    [ 'T', '%' ],
    [ 'T', '%' ],
    [ 'T', '%' ],
    [ 'A', ')' ],
    [ 'G', '.' ],
    [ 'A', '1' ],
    [ 'A', '*' ],
    [ 'A', '*' ],
    [ 'C', '*' ],
    [ 'A', '-' ],
    [ 'T', '+' ],
    [ 'T', '*' ],
    [ 'G', '\'' ],
    [ 'A', '\'' ],
    [ 'A', ')' ],
    [ 'A', ')' ],
    [ 'T', '*' ],
    [ 'A', '*' ],
    [ 'T', '5' ],
    [ 'C', '5' ],
    [ 'A', 'C' ],
    [ 'A', 'C' ] ],
  [ [ 'A', '(' ],
    [ 'A', '(' ],
    [ 'A', '(' ],
    [ 'C', '(' ],
    [ 'A', '*' ],
    [ 'T', '*' ],
    [ 'T', '*' ],
    [ 'G', '+' ],
    [ 'A', ')' ],
    [ 'A', ')' ],
    [ 'A', '%' ],
    [ 'T', '%' ],
    [ 'A', '%' ],
    [ 'T', '+' ],
    [ 'C', '+' ],
    [ 'A', ')' ],
    [ 'A', '(' ],
    [ 'A', '%' ],
    [ 'G', '%' ],
    [ 'T', '%' ],
    [ 'G', '%' ],
    [ 'A', ')' ],
    [ 'A', '.' ],
    [ 'G', '1' ],
    [ 'T', '*' ],
    [ 'A', '*' ],
    [ 'G', '*' ],
    [ 'C', '-' ],
    [ 'C', '+' ],
    [ 'C', '*' ],
    [ 'A', '\'' ] ] ]
    expect(polish(arr, {}, 1), ).toEqual(res)
  })
})