# Bible Reference Converter

This project converts between [OSIS-style](http://www.bibletechnologies.net/) Bible references (`Matt.1.2-Matt.1.3`) and:

1. Human-readable references in English (`Matthew 1:2-3`).
2. [Paratext-style](https://www.thedigitalbiblelibrary.org/static/docs/usx/elements.html#ref) Bible references (`MAT 1:2-3`).

For the reverse, to convert human-readable passage references to OSIS reference, see [Bible Passage Reference Parser](https://github.com/openbibleinfo/Bible-Passage-Reference-Parser).

## Node Usage

### Convert OSIS to English

`en.js` exports exactly one function (internally, `convertOsis`) that takes two required string arguments and one optional string argument:

1. Output format type: `niv-long`, `niv-short`, or `niv-shortest`. These styles, drawn from the [NIV Zondervan Study Bible](http://www.nivzondervanstudybible.com/), attempt to mimic the style guide of a print study Bible.
	1. `niv-long`. Book names are fully spelled out: `Matthew 1:2–3,4`.
	2. `niv-short`. Book names are abbreviated, but punctuation otherwise matches `niv-long`: `Matt 1:2–3,4`.
	3. `niv-shortest`. Book names are even shorter in some cases, and the styles match cross-references.: `Mt 1:2-3, 4`.
2. OSIS string. A comma-separated list of references: `Matt.1.2-Matt.1.3,Matt.1.4`.
3. Optional context OSIS string. You can provide a single OSIS string (not a comma-separated list) to give contextual verses for the second argument:

```javascript
const osisToReadable = require("./es6/en")
osisToReadable("niv-long", "Matt.1.2-Matt.1.3,Matt.1.4", "Matt.1") // "vv. 2–3,4"
osisToReadable("niv-short", "Matt.1.2-Matt.1.3,Matt.1.4", "Matt.1") // "vv. 2–3,4"
osisToReadable("niv-shortest", "Matt.1.2-Matt.1.3,Matt.1.4", "Matt.1") // "ver 2–3,4"
```

Other examples:

```javascript
const osisToReadable = require("./es6/en")
osisToReadable("niv-long", "Matt.1.2-Matt.1.3,Matt.1.4") // "Matthew 1:2–3,4"
osisToReadable("niv-short", "Matt.1.2-Matt.1.3,Matt.1.4") // "Matt 1:2–3,4"
osisToReadable("niv-shortest", "Matt.1.2-Matt.1.3,Matt.1.4") // "Mt 1:2-3, 4"
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

## Browser Usage

The browser versions of these scripts (in `js/`) are compatible with modern browsers and IE10 and later.

```html
<script src="js/osisToReadable.js" charset="utf-8"></script>
<script>
	var osisToReadable = new OsisToReadable
	osisToReadable.setBooks({Phlm:["Phlm"]})
	osisToReadable.toReadable("Phlm.1.2") // "Phlm 1 2"
</script>
```

```html
<script src="js/paratextToOsis.js" charset="utf-8"></script>
<script>
	paratextToOsis("PHM 1:2") // "Phlm.1.2"
</script>
```

```html
<script src="js/en.js" charset="utf-8"></script>
<script>
	osisToEn("niv-long", "Phlm.1.2") // "Philemon 2"
</script>
```

```html
<script src="js/osisToParatext.js" charset="utf-8"></script>
<script>
	osisToParatext("Phlm.1.2") // "PHM 1:2"
</script>
```

## Build Your Own Output Style

`osisToReadable.js` provides the foundation to build a variety of output styles. This section explains how to use it.

```javascript
const osisToReadable = require("./osisToReadable")
const converter = new osisToReadable

converter.setBooks({"Ps": ["Psalm", "Psalms"]})
converter.setOptions({"c.v": ":", "^v": "$verses"})
converter.toReadable("Ps.1.1") // "Psalm 1:1"
converter.toReadable("Ps.2-Ps.3") // "Psalms 2-3"
converter.toReadable("Ps.2.2,Ps.2.3", "Ps.2") // "vv 2, 3"
```

In this code, `converter` is an `osisToReadable` object that exports three function:

1. `setBooks({})` defines the book names to use in the output object.
2. `setOptions({})` defines the options to use when formatting the output. In the above code, `c.v` is saying to insert a ":" when a chapter and verse appear next to each other as part of a single verse reference.

Calling `.toReadable()` returns a string formatted according to the options you specified. The first call returns a single verse (including the ":" from `setOptions()`). The second call returns a chapter range (using the default "-" range separator). The third call returns a sequence of verses, with the second argument providing context; the "vv" is the default value for multiple "$verses".

### `.setBooks()`

`.setBooks()` takes a single object where each key is an OSIS book abbreviation, and each value is an array of one, two, or three strings. Every book that you want to translate to a readable format should have a key, which means that you probably want 66 or more books in this object.

For example:

```javsacript
converter.setBooks({
	"Ps": ["Ps.", "Pss.", "Psalms"],
	"Gen": ["Gen."]
})
```

The first string is the book name; in English, every book except Psalms will probably only have one element in the array.

The second, optional string is the book name to use when the OSIS refers to more than one chapter (`Pss. 3-4` or `Pss. 5:6-7:8`) or when there is a sequence of multiple chapters (`Pss. 3, 4` or `Pss. 5:6, 7:8`).

The third, optional string is the book name to use when referring to the complete book on its own.

### `.setOptions()`

`.setOptions()` takes a single object where each key is the option to set, and the value is the value to set it to. Most options are strings.

## Files

`flow` contains the raw [Flow](https://flowtype.org/) (Javascript with type annotations) source. These files have over 99% type coverage.

`es6` contains the output Javascript (ES6-compatible) files for use by Node.

`test` contains about 4,000 [Jasmine](http://jasmine.github.io/)-style tests. These tests cover 100% of the codebase.

## System Requirements

The `es6/` files require an ES6-capable Node.js. I tested it on 6.3.0.

The `js/` files require IE10 or higher, or any modern browser. They use ES5 syntax.

## Development Requirements

If you want to build the project using `compile-and-run.sh`, here are the dependencies:

* [Flow](https://flowtype.org/)
* [Babel](https://babeljs.io/) to transform Flow to straight Javascript.
* [Flow Strip Types](https://www.npmjs.com/package/babel-plugin-transform-flow-strip-types) to handle Flow type annotations
* [Flow ES2015 Preset](http://babeljs.io/docs/plugins/preset-es2015/) to produce ES5-compatible Javascript that Webpack transforms to browser-compatible Javascript.
* [Webpack](https://webpack.github.io/) to produce browser-compatible Javascript.
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

1. Add more conversion target formats (more translations and languages).
2. Use a standard Grunt-based build process.
3. Package it for npm.
