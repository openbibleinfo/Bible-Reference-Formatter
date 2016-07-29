/* @flow */
"use strict";
(function() : void {

const osises: { [key: string]: string } = Object.freeze({"Gen": "GEN", "Exod": "EXO", "Lev": "LEV", "Num": "NUM", "Deut": "DEU", "Josh": "JOS", "Judg": "JDG", "Ruth": "RUT", "1Sam": "1SA", "2Sam": "2SA", "1Kgs": "1KI", "2Kgs": "2KI", "1Chr": "1CH", "2Chr": "2CH", "Ezra": "EZR", "Neh": "NEH", "Esth": "EST", "Job": "JOB", "Ps": "PSA", "Prov": "PRO", "Eccl": "ECC", "Song": "SNG", "Isa": "ISA", "Jer": "JER", "Lam": "LAM", "Ezek": "EZK", "Dan": "DAN", "Hos": "HOS", "Joel": "JOL", "Amos": "AMO", "Obad": "OBA", "Jonah": "JON", "Mic": "MIC", "Nah": "NAM", "Hab": "HAB", "Zeph": "ZEP", "Hag": "HAG", "Zech": "ZEC", "Mal": "MAL", "Matt": "MAT", "Mark": "MRK", "Luke": "LUK", "John": "JHN", "Acts": "ACT", "Rom": "ROM", "1Cor": "1CO", "2Cor": "2CO", "Gal": "GAL", "Eph": "EPH", "Phil": "PHP", "Col": "COL", "1Thess": "1TH", "2Thess": "2TH", "1Tim": "1TI", "2Tim": "2TI", "Titus": "TIT", "Phlm": "PHM", "Heb": "HEB", "Jas": "JAS", "1Pet": "1PE", "2Pet": "2PE", "1John": "1JN", "2John": "2JN", "3John": "3JN", "Jude": "JUD", "Rev": "REV", "Tob": "TOB", "Jdt": "JDT", "GkEsth": "ESG", "EsthGr": "ESG", "AddEsth": "ADE", "Wis": "WIS", "Sir": "SIR", "Bar": "BAR", "EpJer": "LJE", "DanGr": "DAG", "SgThree": "S3Y", "PrAzar": "S3Y", "Sus": "SUS", "Bel": "BEL", "1Macc": "1MA", "2Macc": "2MA", "3Macc": "3MA", "4Macc": "4MA", "PrMan": "MAN", "1Esd": "1ES", "2Esd": "2ES", "AddPs": "PS2"})
// Some subset of "Matt.1.2-Mark.3.4"
const osisFormat: RegExp = /^[1-4A-Za-z]{2,}(?:\.\d{1,3}(?:\.\d{1,3})?)?(?:-[1-4A-Za-z]{2,}(?:\.\d{1,3}(?:\.\d{1,3})?)?)?$/

// Convert an OSIS reference (`Gen.1.1`) to the equivalent Paratext reference (`GEN 1:1`).
// The argument type is `mixed` to require a type check inside the function and only allow strings.
function osisToParatext(osis: mixed) : string {
	if (typeof osis !== "string") {
		throw "osisToParatext: first argument must be a string."
	}
	// The string can be a comma-separated list.
	const parts: Array<string> = osis.split(",")
	const paratexts: Array<string> = []
	// Handle each item in the list individually. Context doesn't propagate across comma boundaries.
	for (const part: string of parts) {
		// Throws an exception on failure.
		validateFormat(part)
		paratexts.push(partToParatext(part))
	}
	return paratexts.join(",")
}

// Confirm that the string matches the expected format of an OSIS string. Throw an exception if not.
function validateFormat(osis: string) : boolean {
	if (osisFormat.test(osis)) {
		return true
	}
	throw `Invalid osis format: '${osis}'`
}

// Convert a single, non-comma-separated OSIS reference to Paratext.
function partToParatext(paratext: string) : string {
	// `end` may be undefined.
	const [start, end]: Array<string> = paratext.split("-")
	const [startBook, startChapter, startVerse]: Array<string> = start.split(".")
	// We don't need to go any further if we don't understand the `startBook`.
	if (typeof osises[startBook] === "undefined") {
		throw `Unknown osis start book: ${startBook}`
	}
	const startParatext: string = getStart(startBook, startChapter, startVerse)
	// If `end` is undefined, don't go any further; we know it's not a range.
	if (end === undefined) {
		return startParatext
	}
	const endParatext: string = getEnd(end, startBook, startChapter, startVerse)
	return startParatext + "-" + endParatext
}

// Given a book and possible chapter and verse, convert them to Paratext. We already know that `book` exists in `osises`.
function getStart(book: string, chapter: ?string, verse: ?string) : string {
	let out: string = osises[book]
	if (typeof chapter === "string") {
		out += " " + chapter
		if (typeof verse === "string") {
			out += ":" + verse
		}
	}
	return out
}

// Handle the end of a range. It needs the start context to fill in missing values in some cases. Only `startBook` will always exist since a valid Paratext value could just be like `MAT`.
function getEnd(end: string, startBook: string, startChapter: void | string, startVerse: void | string) : string {
	const [endBook, endChapter, endVerse]: Array<string> = end.split(".")
	// Throw an exception if the book name isn't a valid OSIS abbreviation.
	if (typeof osises[endBook] === "undefined") {
		throw `Unknown osis end book: ${endBook}`
	}
	// If there's only an end book, always return it, even if it matches the start book (which we don't even need to check). `Matt.2-Matt` becomes `MAT 2-MAT`. This is an unusual case.
	if (endChapter === undefined) {
		return osises[endBook]
	}
	// If the end book is different from the start book, return as much as possible.
	if (endBook !== startBook) {
		// We already know that `endChapter` is defined.
		const out: string = osises[endBook] + " " + endChapter
		// So the only question is whether `endVerse` is also defined. Include it if so.
		if (typeof endVerse === "string") {
			return out + ":" + endVerse
		}
		return out
	}

	// We know that the books are the same.
	if (typeof endVerse === "string") {
		// We only need to return the end verse if it's in the same chapter.
		if (endChapter === startChapter) {
			return endVerse
		}
		return endChapter + ":" + endVerse
	}
	// `Matt.1.2-Matt.3`. To avoid ambiguity, always include the book if there's a start verse but no end verse: `MAT 1:2-MAT 3` is correct, not `MAT 1:2-3`.
	if (typeof startVerse === "string") {
		return osises[endBook] + " " + endChapter
	}
	// The books match, and there are no start or end verses, so just return the chapter. `Matt.1-Matt.2` becomes `MAT 1-2`.
	return endChapter
}

module.exports = osisToParatext
}).call(this)
