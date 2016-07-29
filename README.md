# Bible Reference Converter

This project converts between [OSIS-style](http://www.bibletechnologies.net/) Bible references (`Matt.1.2-Matt.1.3`) and [Paratext-style](https://www.thedigitalbiblelibrary.org/static/docs/usx/elements.html#ref) Bible references (`MAT 1:2-3`).

## Usage

Each file exports exactly one function that takes a single string argument.

### Convert OSIS to Paratext

```javascript
const osisToParatext = require("./es6/osisToParatext")
let paratext = osisToParatext("Matt.1.2")
console.log(paratext) // "MAT 1:2"
```

### Convert Paratext to OSIS

```javascript
const paratextToOsis = require("./es6/paratextToOsis")
let osis = paratextToOsis("MAT 1:2")
console.log(osis) // "Matt.1.2"
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
