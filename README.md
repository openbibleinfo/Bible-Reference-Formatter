# Bible Reference Converter

This project converts between [OSIS-style](http://www.bibletechnologies.net/) Bible references (`Matt.1.2-Matt.1.3`) and:

1. Human-readable references in English (`Matthew 1:2-3`).
2. [Paratext-style](https://www.thedigitalbiblelibrary.org/static/docs/usx/elements.html#ref) Bible references (`MAT 1:2-3`).

For the reverse, to convert human-readable passage references to OSIS references, see [Bible Passage Reference Parser](https://github.com/openbibleinfo/Bible-Passage-Reference-Parser).

## Node Usage

### Convert OSIS to English

`en.js` exports exactly one function (internally, `convertOsis`, and below, `osisToEn`) that takes two required string arguments and one optional string argument:

1. Output format type (described below).
2. OSIS string. A comma-separated list of references: `Matt.1.2-Matt.1.3,Matt.1.4`.
3. Optional context OSIS string. You can provide a single OSIS string (not a comma-separated list) to give contextual verses for the second argument:

```javascript
const osisToEn = require("./es6/en")
osisToEn("niv-long", "Matt.1.2-Matt.1.3,Matt.1.4", "Matt.1") // "vv. 2–3,4"
osisToEn("niv-short", "Matt.1.2-Matt.1.3,Matt.1.4", "Matt.1") // "vv. 2–3,4"
osisToEn("niv-shortest", "Matt.1.2-Matt.1.3,Matt.1.4", "Matt.1") // "ver 2-3, 4"
```

Other examples:

```javascript
const osisToEn = require("./es6/en")
osisToEn("niv-long", "Matt.1.2-Matt.1.3,Matt.1.4") // "Matthew 1:2–3,4"
osisToEn("niv-short", "Matt.1.2-Matt.1.3,Matt.1.4") // "Matt 1:2–3,4"
osisToEn("niv-shortest", "Matt.1.2-Matt.1.3,Matt.1.4") // "Mt 1:2-3, 4"
```

#### Output Format Type

The first argument indicates the desired preset output format: you may want long or short book names, for example, or a particular name for a book.

There are three basic formats: ESV, NIV, and NLT, and up to three lengths in each format.

<table>
<tr><th>Style</th><th>OSIS: `Song`</th><th>OSIS: `Phlm`</th><td>OSIS: `1John`</td></tr>
<tr><td>`esv-long`</td><td>Song of Solomon</td><td>Philemon</td><td>1 John</td></tr>
<tr><td>`esv-short`</td><td>Song</td><td>Philem.</td><td>1 John</td></tr>
<tr><td>`niv-long`</td><td>Song of Songs</td><td>Philemon</td><td>1 John</td></tr>
<tr><td>`niv-short`</td><td>Song</td><td>Phlm</td><td>1 John</td></tr>
<tr><td>`niv-shortest`</td><td>SS</td><td>Phm</td><td>1Jn</td></tr>
<tr><td>`nlt-long`</td><td>Song of Songs</td><td>Philemon</td><td>1 John</td></tr>
<tr><td>`nlt-short`</td><td>Song</td><td>Phlm</td><td>1 Jn</td></tr>
</table>

These styles attempt to mimic the style guide of a particular print study Bible. The NIV styles are drawn from the [NIV Zondervan Study Bible](http://www.nivzondervanstudybible.com/). The NLT styles are drawn from the [NLT Study Bible](http://www.nltstudybible.com/). The ESV styles are drawn from the ESV Study Bible.

The two longer NIV styles don't include spaces between verses. The short ESV style is generally longer and more formal than the other "short" styles.

### Convert OSIS to Paratext

`osisToParatext.js` exports exactly one function that takes a single string argument: the OSIS reference(s) to convert to Paratext. You can include multiple references by separating them with commas.

```javascript
const osisToParatext = require("./es6/osisToParatext")
let paratext = osisToParatext("Matt.1.2-Matt.1.3,Matt.1.4") // "MAT 1:2-3,MAT 1:4"
```

### Convert Paratext to OSIS

`paratextToOsis.js` exports exactly one function that takes a single string argument: the Paratext reference(s) to convert to OSIS. You can include multiple references by separating them with commas.

```javascript
const paratextToOsis = require("./es6/paratextToOsis")
let osis = paratextToOsis("MAT 1:2-3,MAT 1:4") // "Matt.1.2-Matt.1.3,Matt.1.4"
```

## Browser Usage

The browser versions of these scripts (in `js/`) are compatible with modern browsers and IE10 and later.

```html
<script src="js/osisToReadable.js" charset="utf-8"></script>
<script>
	var osisToReadable = new OsisToReadable
	osisToReadable.setBooks({"Phlm":["Phlm"]})
	osisToReadable.toReadable("Phlm.1.2") // "Phlm 2"
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
const OsisToReadable = require("./osisToReadable")
const converter = new OsisToReadable

converter.setBooks({"Ps": ["Psalm", "Psalms"]})
converter.setOptions({"c.v": ":", "^v": "$verses "})
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

```javascript
converter.setBooks({
	"Ps": ["Ps.", "Pss.", "Psalms"],
	"Gen": ["Gen."]
})
```

The first string is the book name; in English, every book except Psalms will probably only have one element in the array.

The second, optional string is the book name to use when the OSIS refers to more than one chapter (`Pss. 3-4` or `Pss. 5:6-7:8`) or when there is a sequence of multiple chapters (`Pss. 3, 4` or `Pss. 5:6, 7:8`).

The third, optional string is the book name to use when referring to the complete book on its own:

```javascript
converter.toReadable("Ps,Gen") // "Psalms; Gen."
```

#### Chapters

In English, for Psalms, you never want to say, "Psalms chapter 23" or "chapter 23"--it's always Psalm 23.

You can achieve this effect by setting an `OSIS.$chapters` key in the `setBooks()` object:

```javascript
converter.setBooks({
	"Ps": ["Ps.", "Pss."],
	"Ps.$chapters": ["Ps.", "Pss."]
})
converter.setOptions({
	"^c": "$chapters "
})

converter.toReadable("Ps.1", "Ps") // "Ps. 1"
converter.toReadable("Ps.1-Ps.2", "Ps") // "Pss. 1-2"
```

Normally, these two cases would show `ch 1` and `chs 1-2`. The `Ps.$chapters` key tells the script to use the values in the array (as usual, the first value is singular, and the second is plural) rather than the default `$chapters` value.

You can set this value for any book, but in practice you probably only need it for Psalms.

#### Ranges and Sequences

You may want to handle certain book ranges and sequences uniquely. For example:

```javascript
converter.setBooks({
	"1Kgs": ["1 Kings"],
	"2Kgs": ["2 Kings"],
	"1John": ["1 John"],
	"2John": ["2 John"],
	"3John": ["3 John"],
	"1Kgs-2Kgs": ["1-2 Kings"],
	"1John,2John": ["1 and 2 John"],
	"1John,2John,3John": ["1, 2, and 3 John"]
})
converter.toReadable("1Kgs-2Kgs,1John,2John,3John") // "1-2 Kings, 1, 2, and 3 John"
converter.toReadable("1John,2John,3John.1.5") // "1 and 2 John, 3 John 5"
```

These special cases only occur when the books have no chapters or verses. In the second example, the specificity of `3John.1.5` prevents it from triggering the special formatting.

These special ranges and sequences always use the first item in the array for each key.

### `.setOptions()`

`.setOptions()` takes a single object where each key is the option to set, and the value is the value to set it to. Most options are strings.

The complete list of options appears in [OptionsType](https://github.com/openbibleinfo/Bible-Reference-Converter/blob/master/flow/declarations/declarations.js).

#### Variables

You can set two variables to include in other outputs: `$chapters` and `$verses`.

Both `$chapters` and `$verses` take a one- or two-element array. The script uses the first element in an array when the chapter or verse appears on its own ("verse 1"), and it uses the second when there is a range or sequence ("verses 1-2", "verses 1, 2").

```javascript
converter.setBooks({
	"Ps": ["Ps.", "Pss."],
	"Gen": ["Gen."],
	"Ps.$chapters": ["Ps.", "Pss."]
})
converter.setOptions({
	"$chapters": ["chapter", "chapters"],
	"$verses": ["verse", "verses"],
	"^c": "$chapters "
})

converter.toReadable("Gen.1", "Gen") // "chapter 1"
converter.toReadable("Gen.1-Gen.2", "Gen") // "chapters 1-2"
converter.toReadable("Ps.1", "Ps") // "Ps. 1"
converter.toReadable("Ps.1-Ps.2", "Ps") // "Pss. 1-2"
```

In this case, the `^c` option formats a string that starts with a chapter because it has a starting context. The script then inserts the appropriate value.

The `Ps.$chapters` array in the `setBooks()` call works similarly. In this case, we don't want to refer to a Psalm as `chapter`, but as `Ps.` Setting this option allows us to avoid this awkward construction.

#### Single-Chapter Books

You can control how to format single chapter books with the `singleChapterFormat` key. It takes one of three values:

1. `b` tries not to use a chapter reference.
2. `bv` (the default) uses a chapter reference only when referring to the chapter without a verse.
3. `bcv` always uses a chapter reference when there's a chapter or verse.

```javscript
converter.setBooks({
	"Phlm": ["Philemon"]
})
converter.setOptions({"singleChapterFormat": "b"})
converter.toReadable("Phlm.1.2") // "Philemon 2"
converter.toReadable("Phlm.1") // "Philemon"
converter.toReadable("Phlm") // "Philemon"

converter.setOptions({"singleChapterFormat": "bv"})
converter.toReadable("Phlm.1.2") // "Philemon 2"
converter.toReadable("Phlm.1") // "Philemon 1"
converter.toReadable("Phlm") // "Philemon"

converter.setOptions({"singleChapterFormat": "bcv"})
converter.toReadable("Phlm.1.2") // "Philemon 1:2"
converter.toReadable("Phlm.1") // "Philemon 1"
converter.toReadable("Phlm") // "Philemon"
```

There is also a `singleChapterBooks` key that takes an array of OSIS book names that only contain one chapter. The default value should be comprehensive; you shouldn't need to change it.

#### Psalms

Psalms have a couple of special cases.

`Ps151Format` indicates whether to treat the osis `Ps151` as a book (`b`) or as a chapter in Psalms (`bc`). The latter, which is the default, generally leads to more comprehensible output:

```javascript
converter.setBooks({
	"Ps": ["Ps.", "Pss."],
	"Ps151": ["Psalm 151"],
})
converter.setOptions({"Ps151Format": "b"})
converter.toReadable("Ps151.1.5") // "Psalm 151 5"

converter.setOptions({"Ps151Format": "b", "singleChapterFormat": "bcv"})
converter.toReadable("Ps151.1.5") // "Psalm 151 1:5"

converter.setOptions({"Ps151Format": "bc"})
converter.toReadable("Ps151.1.5") // "Ps. 151:5"
```

You can also set `maxPs` (default `150`) to indicate the number of Psalms, a value that is used in some unusual plural situations. I'm not sure why you'd change it.

#### Separators

Separators separate individual components of an OSIS: the `.` in `Gen.1.2`. They come in several different types:

1. `.` is the fallback separator when nothing else is defined. It defaults to a space (` `), which means that all the below separators except `c.v` also default to a space.
2. `c.v` separates chapter numbers from verse numbers. It defaults to a colon (`:`); for example, the colon in `Genesis 1:2`
3. `b.c` separates a preceding book from a following chapter; for example, the space in `Genesis 1:2`. It defaults to a space.
4. `b1.c` separates a single-chapter book from the following chapter; for example, the space in `Philemon 1:2`. It defaults to a space, though you also need to set `"singleChapterFormat": "bc"` for it to appear; otherwise, you will see a `b.v`.
5. `b.v` separates a single-chapter book from a following verse; for example, the space in `Philemon 2`. It defaults to a space.
6. `.c` separates a preceding book (`b` or `b1`) from a following chapter. It defults to a space.
7. `.v` works out to be an alias for `b.v` if `b.v` isn't set. Because `c.v` is set to a colon by default, `c.v` overrides the value of `.v`.

A separator with higher specificity overrides a separator with lower specificity. For example, `b.v` overrides `.v`, which in turn overrides `.`.

## Files

`flow` contains the raw [Flow](https://flowtype.org/) (Javascript with type annotations) source.

`es6` contains the output Javascript (ES6-compatible) files for use by Node.

`js` contains browser-compatible Javascript (ES5) files for inclusion in HTML.

`test` contains about 5,000 [Jasmine](http://jasmine.github.io/)-style tests.

## System Requirements

The `es6/` files require an ES6-capable Node.js. I test it on 6.3.0.

The `js/` files require any modern browser or IE10 or higher. They use ES5 syntax.

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
