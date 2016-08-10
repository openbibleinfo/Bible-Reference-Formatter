# Bible Reference Converter

This project converts between [OSIS-style](http://www.bibletechnologies.net/) Bible references (`Matt.1.2-Matt.1.3`) and:

1. Human-readable references in English (`Matthew 1:2-3`).
2. [Paratext-style](https://www.thedigitalbiblelibrary.org/static/docs/usx/elements.html#ref) Bible references (`MAT 1:2-3`).

For the reverse, to convert human-readable passage references to OSIS reference, see [Bible Passage Reference Parser](https://github.com/openbibleinfo/Bible-Passage-Reference-Parser).

## Usage

### Convert OSIS to English

`en.js` exports exactly one function (`convertOsisToReadable`) that takes two required string arguments and one optional string argument:

1. Output format type: `niv-long`, `niv-short`, or `niv-shortest`. These styles, drawn from the [NIV Zondervan Study Bible](http://www.nivzondervanstudybible.com/), attempt to mimic the style guide of a print study Bible.
	1. `niv-long`. Book names are fully spelled out: `Matthew 1:2–3,4`.
	2. `niv-short`. Book names are abbreviated, but punctuation otherwise matches `niv-long`: `Matt 1:2–3,4`.
	3. `niv-shortest`. Book names are even shorter in some cases, and the styles match cross-references.: `Mt 1:2-3, 4`.
2. OSIS string. A comma-separated list of references: `Matt.1.2-Matt.1.3,Matt.1.4`.
3. Optional context OSIS string. You can provide a single OSIS string (not a comma-separated list) to give contextual verses for the second argument:

```javascript
const convertOsisToReadable = require("./es6/en")
convertOsisToReadable("niv-long", "Matt.1.2-Matt.1.3,Matt.1.4", "Matt.1") // "vv. 2–3,4"
convertOsisToReadable("niv-short", "Matt.1.2-Matt.1.3,Matt.1.4", "Matt.1") // "vv. 2–3,4"
convertOsisToReadable("niv-shortest", "Matt.1.2-Matt.1.3,Matt.1.4", "Matt.1") // "ver 2–3,4"
```

Other examples:

```javascript
const convertOsisToReadable = require("./es6/en")
convertOsisToReadable("niv-long", "Matt.1.2-Matt.1.3,Matt.1.4") // "Matthew 1:2–3,4"
convertOsisToReadable("niv-short", "Matt.1.2-Matt.1.3,Matt.1.4") // "Matt 1:2–3,4"
convertOsisToReadable("niv-shortest", "Matt.1.2-Matt.1.3,Matt.1.4") // "Mt 1:2-3, 4"
```

### Convert OSIS to Paratext

`osisToParatext.js` exports exactly one function that takes a single string argument: the OSIS reference(s) to convert to Paratext. You can include multiple references by separating them with commas.

```javascript
const osisToParatext = require("./es6/osisToParatext")
let paratext = osisToParatext("Matt.1.2-Matt.1.3,Matt.1.4")
console.log(paratext) // "MAT 1:2-3,MAT 1:4"
```

### Convert Paratext to OSIS

`paratextToOsis.js` exports exactly one function that takes a single string argument: the Paratext reference(s) to convert to OSIS. You can include multiple references by separating them with commas.

```javascript
const paratextToOsis = require("./es6/paratextToOsis")
let osis = paratextToOsis("MAT 1:2-3,MAT 1:4")
console.log(osis) // "Matt.1.2-Matt.1.3,Matt.1.4"
```

## Files

`flow` contains the raw [Flow](https://flowtype.org/) (Javascript with type annotations) source. These files have 100% type coverage.

`es6` contains the output Javascript (ES6-compatible) files for use by Node.

`test` contains [Jasmine](http://jasmine.github.io/)-style tests. These tests cover 100% of the codebase.

## System Requirements

It requires an ES6-capable Node.js. I tested it on 6.3.0. It probably doesn't work in a browser without modification.

## Development Requirements

If you want to build the project using `compile-and-run.sh`, here are the dependencies:

* [Flow](https://flowtype.org/)
* [Babel](https://babeljs.io/) to transform Flow to straight Javascript.
* [Flow Strip Types](https://www.npmjs.com/package/babel-plugin-transform-flow-strip-types) to handle Flow type annotations
* [Jasmine](http://jasmine.github.io/) for running tests.
* [Jasmine-Node](https://github.com/mhevery/jasmine-node) to run tests from the CLI.
* [Istanbul](https://github.com/gotwarlost/istanbul) for calculating test coverage.

## Limitations

It doesn't validate that the references exist; it happily converts the nonexistent `GEN 99` to `Gen.99`.

It follows the OSIS and Paratext formats strictly; if provided an unexpected book name or format, it throws an exception.

## Purpose

My [Bible verse reference identifier](https://github.com/openbibleinfo/Bible-Passage-Reference-Parser) outputs OSIS, but you may want to use a different formatting scheme, such as USX. This project means you don't need to write such logic yourself.

I also wanted to try Flow and ES6.

## Future Directions

I don't have specific plans to develop this library further beyond bug fixes. However, if you're interested, here are some possibilities:

1. Make ES5- and browser-friendly.
2. Add more conversion formats.
3. Use a standard Grunt-based build process.
4. Package it for npm.
