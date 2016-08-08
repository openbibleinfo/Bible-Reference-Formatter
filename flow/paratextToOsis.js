/* @flow */
"use strict";
(function() : void {

const paratexts: { [key: string]: string } = Object.freeze({"GEN": "Gen", "EXO": "Exod", "LEV": "Lev", "NUM": "Num", "DEU": "Deut", "JOS": "Josh", "JDG": "Judg", "RUT": "Ruth", "1SA": "1Sam", "2SA": "2Sam", "1KI": "1Kgs", "2KI": "2Kgs", "1CH": "1Chr", "2CH": "2Chr", "EZR": "Ezra", "NEH": "Neh", "EST": "Esth", "JOB": "Job", "PSA": "Ps", "PRO": "Prov", "ECC": "Eccl", "SNG": "Song", "ISA": "Isa", "JER": "Jer", "LAM": "Lam", "EZK": "Ezek", "DAN": "Dan", "HOS": "Hos", "JOL": "Joel", "AMO": "Amos", "OBA": "Obad", "JON": "Jonah", "MIC": "Mic", "NAM": "Nah", "HAB": "Hab", "ZEP": "Zeph", "HAG": "Hag", "ZEC": "Zech", "MAL": "Mal", "MAT": "Matt", "MRK": "Mark", "LUK": "Luke", "JHN": "John", "ACT": "Acts", "ROM": "Rom", "1CO": "1Cor", "2CO": "2Cor", "GAL": "Gal", "EPH": "Eph", "PHP": "Phil", "COL": "Col", "1TH": "1Thess", "2TH": "2Thess", "1TI": "1Tim", "2TI": "2Tim", "TIT": "Titus", "PHM": "Phlm", "HEB": "Heb", "JAS": "Jas", "1PE": "1Pet", "2PE": "2Pet", "1JN": "1John", "2JN": "2John", "3JN": "3John", "JUD": "Jude", "REV": "Rev", "TOB": "Tob", "JDT": "Jdt", "ESG": "EsthGr", "ADE": "AddEsth", "WIS": "Wis", "SIR": "Sir", "BAR": "Bar", "LJE": "EpJer", "DAG": "DanGr", "S3Y": "PrAzar", "SUS": "Sus", "BEL": "Bel", "1MA": "1Macc", "2MA": "2Macc", "3MA": "3Macc", "4MA": "4Macc", "MAN": "PrMan", "1ES": "1Esd", "2ES": "2Esd", "PS2": "AddPs"})
// Some subset of "MAT 1:2-MRK 3:4"
const paratextFormat: RegExp = /^[1-4A-Z]{3}(?: \d{1,3}(?::\d{1,3})?)?(?:-(?:[1-4A-Z]{3}(?: \d{1,3}(?::\d{1,3})?)?|\d{1,3}(?::\d{1,3})?))?$/
const paratextBookFormat: RegExp = /^[1-4A-Z]{3}$/
const paratextCVFormat: RegExp = /^\d{1,3}:\d{1,3}$/
const numberFormat: RegExp = /^\d+$/

// Convert a Paratext reference (`GEN 1:1`) to the equivalent OSIS reference (`Gen.1.1`).
function paratextToOsis(paratext: string) : string {
	if (typeof paratext !== "string") {
		throw "paratextToOsis: first argument must be a string."
	}
	// The string can be a comma-separated list.
	const parts: Array<string> = paratext.split(",")
	const osises: Array<string> = []
	// Handle each item in the list individually. Context doesn't propagate across comma boundaries.
	for (const part: string of parts) {
		// Throws an exception on failure.
		validateFormat(part)
		osises.push(partToOsis(part))
	}
	return osises.join(",")
}

// Confirm that the string matches the expected format of a Paratext string. Throw an exception if not.
function validateFormat(paratext: string) : boolean {
	if (paratextFormat.test(paratext)) {
		return true
	}
	throw `Invalid paratext format: '${paratext}'`
}

// Convert a single, non-comma-separated Paratext reference to OSIS.
function partToOsis(paratext: string) : string {
	// `end` may be undefined.
	const [start, end]: Array<string> = paratext.split("-")
	const [startBook, startChapter, startVerse]: Array<string> = splitPart(start)
	if (typeof paratexts[startBook] === "undefined") {
		throw `Unknown paratext start book: ${startBook}`
	}
	const startOsis: string = bcvToOsis(startBook, startChapter, startVerse)
	// If `end` is undefined, don't go any further.
	if (end === undefined) {
		return startOsis
	}
	const [endBook, endChapter, endVerse]: [string, void | string, void | string] = getEnd(end, startBook, startChapter, startVerse)
	const endOsis: string = bcvToOsis(endBook, endChapter, endVerse)
	return startOsis + "-" + endOsis
}

// Given a book and possible chapter and verse, convert them to OSIS. We already know that `book` exists in `paratexts`.
function bcvToOsis(book: string, chapter: ?string, verse: ?string) : string {
	const out: Array<string> = [paratexts[book]]
	if (typeof chapter === "string") {
		out.push(chapter)
		if (typeof verse === "string") {
			out.push(verse)
		}
	}
	return out.join(".")
}

// Handle the end of a range. It needs the start context to fill in missing values in some cases.
function getEnd(end: string, startBook: string, startChapter: void | string, startVerse: void | string) : [string, void | string, void | string] {
	const [endBook, endChapter, endVerse]: Array<string> = splitPart(end)
	// If there's a valid book, use all the end values.
	if (endBook.length > 0) {
		// Throw an exception if the book name isn't a valid Paratext abbreviation.
		if (typeof paratexts[endBook] === "undefined") {
			throw `Unknown paratext end book: ${endBook}`
		}
		return [endBook, endChapter, endVerse]
	// If there's an `endVerse`, we know that both `endChapter` and `endVerse` are defined. Use the `startBook` but the other end values.
	}
	if (typeof endVerse === "string") {
		return [startBook, endChapter, endVerse]
	// There's a single numeric value, but whether it's a chapter or a verse depends on the context.
	}
	// If there was a verse specified in `start`, then assume the value is an ending verse.
	if (typeof startVerse === "string") {
		return [startBook, startChapter, endChapter]
	}
	return [startBook, endChapter]
}

// Try to put the values in the right slot. The only ambiguous one is when the part consists of only a number. In that case, the number could be either a chapter or a verse.
function splitPart(paratext: string) : Array<string> {
	// `1:2`. It omits a book.
	if (paratextCVFormat.test(paratext)) {
		const [chapter, verse]: Array<string> = paratext.split(":")
		return ["", chapter, verse]
	// `3`. Not sure whether it's a chapter or a verse (only happens at the end of a range). We return it as a chapter and let the calling function decide what to do.
	} else if (numberFormat.test(paratext)) {
		return ["", paratext]
	// `MAT`. If it's only a book, we don't need to figure out what to do with it.
	} else if (paratextBookFormat.test(paratext)) {
		return [paratext]
	}
	// Otherwise, we know it's of the format `MAT 1:2` (`B C:V`).
	return paratext.split(/[ :]/)
}

module.exports = paratextToOsis
}).call(this)
