# Bible Reference Formatter

This project formats [OSIS-style](http://www.bibletechnologies.net/) Bible references (`Matt.1.2-Matt.1.3`) as:

1. Human-readable references in English (`Matthew 1:2-3`).
2. [Paratext-style](https://www.thedigitalbiblelibrary.org/static/docs/usx/elements.html#ref) Bible references (`MAT 1:2-3`).

For the reverse, to convert human-readable passage references to OSIS references, see [Bible Passage Reference Parser](https://github.com/openbibleinfo/Bible-Passage-Reference-Parser).

## Node Usage

### Convert OSIS to English

`en.js` exports exactly one function (below as `osisToEn`) that takes two required string arguments and one optional string argument:

1. Output format type (described below).
2. OSIS string. A comma-separated list of references: e.g., `Matt.1.2-Matt.1.3,Matt.1.4`.
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
<tr><th>Style</th><th>OSIS: Song</th><th>OSIS: Phlm</th><th>OSIS: 1John</th></tr>
<tr><td>esv-long</td><td>Song of Solomon</td><td>Philemon</td><td>1 John</td></tr>
<tr><td>esv-short</td><td>Song</td><td>Philem.</td><td>1 John</td></tr>
<tr><td>niv-long</td><td>Song of Songs</td><td>Philemon</td><td>1 John</td></tr>
<tr><td>niv-short</td><td>Song</td><td>Phlm</td><td>1 John</td></tr>
<tr><td>niv-shortest</td><td>SS</td><td>Phm</td><td>1Jn</td></tr>
<tr><td>nlt-long</td><td>Song of Songs</td><td>Philemon</td><td>1 John</td></tr>
<tr><td>nlt-short</td><td>Song</td><td>Phlm</td><td>1 Jn</td></tr>
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

`paratextToOsis.js` exports exactly one function that takes a single string argument: the Paratext reference(s) to convert to OSIS. You can include multiple references by separating them with commas. It expects a book name after every comma.

```javascript
const paratextToOsis = require("./es6/paratextToOsis")
let osis = paratextToOsis("MAT 1:2-3,MAT 1:4") // "Matt.1.2-Matt.1.3,Matt.1.4"
```

## Browser Usage

The browser versions of these scripts (in `js/`) are compatible with modern browsers and IE10 and later.

```html
<script src="js/osisFormatter.js" charset="utf-8"></script>
<script>
	var osisFormatter = new OsisFormatter
	osisFormatter.setBooks({"Phlm":["Phlm"]})
	osisFormatter.format("Phlm.1.2") // "Phlm 2"
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

`osisFormatter.js` provides the foundation to build a variety of output styles. This section explains how to use it.

```javascript
const OsisFormatter = require("./osisFormatter")
const osisFormatter = new OsisFormatter

osisFormatter.setBooks({"Ps": ["Psalm", "Psalms"]})
osisFormatter.setOptions({"^v": "$verses "})
osisFormatter.format("Ps.1.1") // "Psalm 1:1"
osisFormatter.format("Ps.2-Ps.3") // "Psalms 2-3"
osisFormatter.format("Ps.2.2,Ps.2.3", "Ps.2") // "vv 2, 3"
```

In this code, `osisFormatter` is an `OsisFormatter` object that exports three functions:

1. `setBooks({})` defines the book names to use in the output string.
2. `setOptions({})` defines the options to use when formatting the output.
3. `format("", "")` returns a string formatted according to the books and options you specified.

Above, the first call to `.format()` returns a single verse (including the default ":" chapter/verse separator). The second call returns a chapter range (using the default "-" range separator). The third call returns a sequence of verses, with the second argument providing context; the `vv` is the default value for multiple `$verses`, where `$verses` is a variable that knows when it's followed by a single verse or multiple verses and adjusts its output accordingly.

### `.setBooks()`

`.setBooks()` takes a single object where each key is an OSIS book abbreviation, and each value is an array of one, two, or three strings. Every book that you want to translate to a readable format should have a key, which means that you probably want to set at least 66 books in this object.

For example:

```javascript
osisFormatter.setBooks({
	"Ps": ["Ps.", "Pss.", "Psalms"],
	"Gen": ["Gen."]
})
```

The first string is the book name; in English, every book except Psalms will probably only have one element in the array.

The second, optional, string is the book name to use when the OSIS refers to more than one chapter (e.g., `Pss. 3-4` or `Pss. 5:6-7:8`) or when there is a sequence of multiple chapters (e.g., `Pss. 3, 4` or `Pss. 5:6, 7:8`).

The third, optional, string is the book name to use when referring to the complete book on its own:

```javascript
osisFormatter.format("Ps,Gen") // "Psalms; Gen."
```

#### Chapters

In English, for Psalms, you never want to say, "Psalms chapter 23" or "chapter 23"--it's always Psalm 23.

You can achieve this effect by setting an `OSIS.$chapters` key in the `setBooks()` object:

```javascript
osisFormatter.setBooks({
	"Ps": ["Ps.", "Pss."],
	"Ps.$chapters": ["Ps.", "Pss."]
})
osisFormatter.setOptions({
	"^c": "$chapters "
})

osisFormatter.format("Ps.1", "Ps") // "Ps. 1"
osisFormatter.format("Ps.1-Ps.2", "Ps") // "Pss. 1-2"
```

By default, these two cases would show `ch 1` and `chs 1-2`. The `Ps.$chapters` key tells the script to use the values in the array (as usual, the first value is singular, and the second is plural) rather than the default `$chapters` value.

You can set this value for any book, but in practice you probably only need it for Psalms.

#### Special Ranges and Sequences

You may want to handle certain book ranges and sequences uniquely. For example:

```javascript
osisFormatter.setBooks({
	"1Kgs": ["1 Kings"],
	"2Kgs": ["2 Kings"],
	"1John": ["1 John"],
	"2John": ["2 John"],
	"3John": ["3 John"],
	"1Kgs-2Kgs": ["1-2 Kings"],
	"1John,2John": ["1 and 2 John"],
	"1John,2John,3John": ["1, 2, and 3 John"]
})
osisFormatter.format("1Kgs-2Kgs,1John,2John,3John") // "1-2 Kings, 1, 2, and 3 John"
osisFormatter.format("1John,2John,3John.1.5") // "1 and 2 John, 3 John 5"
```

This special formatting only occurs when the OSIS specifies no chapters or verse. In the second example, the specificity of `3John.1.5` prevents it from triggering the special formatting.

These special ranges and sequences always use the first item in the array for each key.

### `.setOptions()`

`.setOptions()` takes a single object where each key is the option to set, and the value is the value to set it to. Most options are strings.

The complete list of options appears in [OptionsType](https://github.com/openbibleinfo/Bible-Reference-Formatter/blob/master/flow/declarations/declarations.js).

#### Variables

You can set two variables to include in other outputs: `$chapters` and `$verses`.

Both `$chapters` and `$verses` take a one- or two-element array. The script uses the first element in an array when the chapter or verse appears on its own ("verse 1"), and it uses the second when there is a range or sequence ("verses 1-2", "verses 1, 2").

```javascript
osisFormatter.setBooks({
	"Ps": ["Ps.", "Pss."],
	"Gen": ["Gen."],
	"Ps.$chapters": ["Ps.", "Pss."]
})
osisFormatter.setOptions({
	"$chapters": ["chapter", "chapters"],
	"$verses": ["verse", "verses"],
	"^c": "$chapters "
})

osisFormatter.format("Gen.1", "Gen") // "chapter 1"
osisFormatter.format("Gen.1-Gen.2", "Gen") // "chapters 1-2"
osisFormatter.format("Ps.1", "Ps") // "Ps. 1"
osisFormatter.format("Ps.1-Ps.2", "Ps") // "Pss. 1-2"
```

In this case, the `^c` option formats a string that starts with a chapter because it has a starting context. The script then inserts the appropriate value.

The `Ps.$chapters` array in the `setBooks()` call works similarly. In this case, we don't want to refer to a Psalm as `chapter`, but as `Ps.`

Punctuation rules (separators, ranges, and sequences) can use the variables `$b`, `$c`, and `$v` in their values, which stand for the book, chapter, and verse (respectively) that precede the punctuation. If there is no preceding chapter or verse, then `$c` and `$v` return empty strings, respectively.

#### Single-Chapter Books

You can control how to format single-chapter books with the `singleChapterFormat` key. It takes one of three values:

1. `b` tries never to use a chapter number.
2. `bv` (the default) uses a chapter number only when referring to the chapter without a verse.
3. `bcv` always uses a chapter number when there's a chapter or verse.

```javscript
osisFormatter.setBooks({
	"Phlm": ["Philemon"]
})
```

<table>
<tr><th>"singleChapterFormat" value</th><th>Phlm</th><th>Phlm.1</th><th>Phlm.1.2</th></tr>
<tr><td>"b"</td><td>Philemon</td><td>Philemon</td><td>Philemon 2</td></tr>
<tr><td>"bv"</td><td>Philemon</td><td>Philemon 1</td><td>Philemon 2</td></tr>
<tr><td>"bcv"</td><td>Philemon</td><td>Philemon 1</td><td>Philemon 1:2</td></tr>
</table>

There is also a `singleChapterBooks` key that takes an array of OSIS book names that only contain one chapter. The default value should be comprehensive; you shouldn't need to change it.

#### Psalms

Psalms have a couple of special cases.

`Ps151Format` indicates whether to treat the osis `Ps151` (i.e., `AddPs`) as a book (`b`) or as a chapter in Psalms (`bc`). The latter, which is the default, generally leads to more comprehensible output:

```javascript
osisFormatter.setBooks({
	"Ps": ["Ps.", "Pss."],
	"Ps151": ["Psalm 151"],
})
osisFormatter.setOptions({"Ps151Format": "b"})
osisFormatter.format("Ps151.1.5") // "Psalm 151 5"

osisFormatter.setOptions({"Ps151Format": "b", "singleChapterFormat": "bcv"})
osisFormatter.format("Ps151.1.5") // "Psalm 151 1:5"

osisFormatter.setOptions({"Ps151Format": "bc"})
osisFormatter.format("Ps151.1.5") // "Ps. 151:5"
```

You can also set `maxPs` (default `150`) to indicate the number of Psalms, a value that is used in some unusual plural situations. You shouldn't need to change it.

#### Separators

Separators separate individual components of an OSIS: the two `.` in `Gen.1.2`. They come in several different types:

1. `.` is the fallback separator when nothing else is defined. It defaults to a space (` `), which means that all the below separators except `c.v` also default to a space.
2. `c.v` separates chapter numbers from verse numbers. It defaults to a colon (`:`); for example, the colon in `Genesis 1:2`.
3. `b.c` separates a preceding book from a chapter number; for example, the space in `Genesis 1:2`. It defaults to a space.
4. `b1.c` separates a single-chapter book from the chapter number; for example, the space in `Philemon 1:2`. It defaults to a space, though you also need to set `"singleChapterFormat": "bc"` for it to appear; otherwise, you will see a `b.v`.
5. `b.v` separates a single-chapter book from a verse number; for example, the space in `Philemon 2`. It defaults to a space.
6. `.c` separates a preceding book (`b` or `b1`) from a chapter number. It defaults to a space.
7. `.v` works out to be an alias for `b.v` if `b.v` isn't set. Because `c.v` is set to a colon by default, `c.v` overrides the value of `.v`.

A separator with higher specificity overrides a separator with lower specificity. For example, `b.v` overrides `.v`, which in turn overrides `.`.

### Ranges

Ranges separate start and end OSIS references: the `-` in `Gen.1.2-Gen.3.4`. Range options always include the `-` character and, if they have any other characters, include an optional start type and a required end type.

In these options, a `b` indicates a book name; a `c` indicates a chapter number; and a `v` indicates a verse number.

The basic idea is that you change the range character(s) depending on what the range is joining. You might want a `v-v` range (between verses in the same chapter) to use a different character from a `c-c` range (between chapters in the same book).

As with separators, higher-specificity (longer) rules override lower-specificity (shroter) rules; `bcv-bcv` takes precedence over `v-b`.

Let's look at the `niv-long` range rules:

```javascript
osisFormatter.setOptions({
	// Default to an em-dash when no other rules match.
	"-": "\u2014",
	// `Gen-Gen.2`. An unusual situation, where there's only a start book, and the end part of the range is a chapter in the same book. Without this rule, this situation would lead to `Genesis—2`, which kind of makes sense, but by adding `$chapters ` after the em-dash, we get the somewhat more-intelligible `Genesis—ch. 2`. This rule also affects `Gen-Gen.1.2`, and outputs `Genesis—ch. 1:2`; if we wanted to do something different in that situation, we could set the `b-cv` option.
	"b-c": "\u2014$chapters ",
	// `Phlm-Phlm.1.2`. Another unusual situation. It results in `Philemon—Philemon 2` since we never want to use `$chapters` for a single-chapter book.
	"b-v": "\u2014$b ",
	// `Gen.1-Gen.1.2`. Another unusual situation. Without this rule, the script would output the misleading `Genesis 1—2`. This rule leads to `Genesis 1—1:2`.
	"c-v": "\u2014$c:",
	// `Gen.1.2-Gen.3`. Without this rule, we would see `Genesis 1:2—3`. With this rule, we see `Genesis 1:2—ch. 3`.
	"v-c": "\u2014$chapters ",
	// `Gen.1.2-Gen.3.4`. Because the above `v-c` rule also matches `v-cv` (resulting in `Genesis 1:2—ch. 3:4`), we override the `v-c` rule here so that it uses the standard em-dash: `Genesis 1:2—3:4`.
	"v-cv": "\u2014",
	// `Gen.1.2-Gen.1.3`. Use an en-dash rather than an em-dash for verse ranges within the same chapter: `Genesis 1:2–3`
	"v-v": "\u2013"
})
```

There are over 50 possible range rules in total, but in practice you probably only want to change a few of them. The full list is in [OptionsType](https://github.com/openbibleinfo/Bible-Reference-Formatter/blob/master/flow/declarations/declarations.js).

You can omit the first part of the range: `-b`, `-c`, and `-v` are all valid options, for example.

### Sequences

Sequence separators separate multiple OSIS references or ranges: the `,` in `Gen.1.2,Gen.3.4`. Sequence options always include the `,` character and, if they have any other characters, include an optional start type and a required end type.

In these options, a `b` indicates a book name; a `c` indicates a chapter number; and a `v` indicates a verse number.

The basic idea is that you change the sequence character(s) depending on what is on either side of the sequence. You might want a `v,v` sequence (between verses in the same chapter) to use a different character from a `c,c` sequence (between chapters in the same book.)

Let's look at the `niv-long` sequence rules:

```javascript
osisFormatter.setOptions({
	// Default to using a semicolon and a space to separate references in a sequence.
	",": "; ",
	// `Gen,Gen.2`. An unusual situation, where the first reference is only a start book, and the second reference is a chapter in the same book. Without this rule, this situation would lead to `Genesis; 2`.Adding `$chapters ` after the semicolon results in `Genesis; ch. 2`. This rule also affects `Gen,Gen.1.2`, and outputs `Genesis; ch. 1:2`; if we wanted to do something different in that situation, we could set the `b,cv` option.
	"b,c": "; $chapters ",
	// `Phlm,Phlm.1.2`. Another unusual situation. It results in `Philemon; Philemon 2` since the default (`Philemon; 2`) is a little confusing.
	"b,v": "; $b ",
	// `Gen.1,Gen.1.2`. Without this rule, we would see `Genesis 1; 2`. With this rule, we see `Genesis 1; 1:2`. The `$c` variable tells the script to insert the current chapter.
	"c,v": "; $c:",
	// `Gen.1.2,Gen.3`. Without this rule, we would see `Genesis 1:2; 3`. With this rule, we see `Genesis 1:2; ch. 3`.
	"v,c": "; $chapters ",
	// `Gen.1.2,Gen.3.4`. Because the above `v,c` rule also matches `v,cv` (resulting in `Genesis 1:2; ch. 3:4`), we override the `v,c` rule here so that it uses the standard semicolon and space: `Genesis 1:2; 3:4`.
	"v,cv": "; ",
	// `Gen.1.2,Gen.1.3`. When two verses in the same chapter appear in a sequence, separate them with a comma. The NIV style omits a space: `Genesis 1:2,3`
	"v,v": ","
})
```

### Start Contexts

You can specify several options for formatting the start of the output string when providing a start context to `.format()`.

For example, maybe you'd like the string to say `verses 2, 3` instead of just `2, 3` if `.format("Gen.1.2,Gen.1.3", "Gen.1")`, which you can do with `formatter.setOptions({"^v": "$verses ", "$verses": ["verse", "verses"]})`.

<table>
<tr><th>Option</th><th>.format()</th></tr>
<tr><td>^c</td><td>.format("Gen.1", "Gen")</td></tr>
<tr><td>^cv</td><td>.format("Gen.1.2", "Gen")</td></tr>
<tr><td>^v</td><td>.format("Gen.1.2", "Gen.1")</td></tr>
<tr><td>b1^c</td><td>.format("Phlm.1", "Phlm")</td></tr>
<tr><td>b1^cv</td><td>.format("Phlm.1.2", "Phlm")</td></tr>
<tr><td>b1^v</td><td>.format("Phlm.1.2", "Phlm.1") or .format("Phlm.1.2", "Phlm")</td></tr>
</table>

The `b1^cv` option requires `"singleChapterFormat": "bcv"`. The `b1^c` option does nothing if `"singleChapterFormat": "b"`.

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

My [Bible verse reference identifier](https://github.com/openbibleinfo/Bible-Passage-Reference-Parser) outputs OSIS, but you may want to transform OSIS back into a human-readable format. For example, if someone enters "genesis 1.2" into a Bible search engine, we could transform it internally to "Gen.1.2" and then output it as "Genesis 1:2".

I also wanted to try Flow and ES6.

## Future Directions

I don't have specific plans to develop this library further beyond bug fixes. However, if you're interested, here are some possibilities:

1. Add more conversion target formats (more translations and languages).
2. Use a standard Grunt-based build process.
3. Package it for npm.
