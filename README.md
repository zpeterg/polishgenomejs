# polishgenomejs
A simple tool for aligning and polishing genomes in JavaScript. This is only a prototype at this point. It provides only basic length/quality screen and sligns by string.

# Install
npm install polishgenomejs --save

# Use
```
  const polish = require('polishgenomejs')
  const fastq = "header (not used)\nACAAG\n'1!!1\n"
  console.log(polish(fastq))
```
### Options:
The 2nd optional argument.

```minLength: int(default 10)```: Minimum length-per-sequence.


```minQuality: int(0-94, default 10)```: Minimum quality-per-nucleotide.

```searchLength: int(default 5)```: Length of nucleotide string used to find a match (does not yet accommodate errors, so should be fairly short).

### Step
The 3rd optional argument - the step to stop at. Defaults to all steps (4 or more).
Step 1: Only filter by length.
Step 2: Filter by length and quality.
Step 3: Above + Align columns.
Step 4: Above + add Consensus column.

### Example

```polish(data, { minLength: 10, minQuality: !, searchLength: 5 }, 4)```


## Git
```https://www.github.com/zpeterg/polishgenomejs```