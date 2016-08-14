"use strict"
/* global require, describe, it, expect */
const OsisFormatter = require("../es6/osisFormatter")
const f = new OsisFormatter()
const books = {
	"Gen": ["Gen"], "Exod": ["Exod"], "Lev": ["Lev"], "Num": ["Num"], "Deut": ["Deut"], "Josh": ["Josh"], "Judg": ["Judg"], "Ruth": ["Ruth"], "1Sam": ["1Sam"], "2Sam": ["2Sam"], "1Kgs": ["1Kgs"], "2Kgs": ["2Kgs"], "1Chr": ["1Chr"], "2Chr": ["2Chr"], "Ezra": ["Ezra"], "Neh": ["Neh"], "Esth": ["Esth"], "Job": ["Job"], "Ps": ["Ps"], "Prov": ["Prov"], "Eccl": ["Eccl"], "Song": ["Song"], "Isa": ["Isa"], "Jer": ["Jer"], "Lam": ["Lam"], "Ezek": ["Ezek"], "Dan": ["Dan"], "Hos": ["Hos"], "Joel": ["Joel"], "Amos": ["Amos"], "Obad": ["Obad"], "Jonah": ["Jonah"], "Mic": ["Mic"], "Nah": ["Nah"], "Hab": ["Hab"], "Zeph": ["Zeph"], "Hag": ["Hag"], "Zech": ["Zech"], "Mal": ["Mal"], "Matt": ["Matt"], "Mark": ["Mark"], "Luke": ["Luke"], "John": ["John"], "Acts": ["Acts"], "Rom": ["Rom"], "1Cor": ["1Cor"], "2Cor": ["2Cor"], "Gal": ["Gal"], "Eph": ["Eph"], "Phil": ["Phil"], "Col": ["Col"], "1Thess": ["1Thess"], "2Thess": ["2Thess"], "1Tim": ["1Tim"], "2Tim": ["2Tim"], "Titus": ["Titus"], "Phlm": ["Phlm"], "Heb": ["Heb"], "Jas": ["Jas"], "1Pet": ["1Pet"], "2Pet": ["2Pet"], "1John": ["1John"], "2John": ["2John"], "3John": ["3John"], "Jude": ["Jude"], "Rev": ["Rev"], "Tob": ["Tob"], "Jdt": ["Jdt"], "GkEsth": ["GkEsth"], "EsthGr": ["EsthGr"], "AddEsth": ["AddEsth"], "Wis": ["Wis"], "Sir": ["Sir"], "Bar": ["Bar"], "EpJer": ["EpJer"], "DanGr": ["DanGr"], "SgThree": ["SgThree"], "PrAzar": ["PrAzar"], "Sus": ["Sus"], "Bel": ["Bel"], "1Macc": ["1Macc"], "2Macc": ["2Macc"], "3Macc": ["3Macc"], "4Macc": ["4Macc"], "PrMan": ["PrMan"], "1Esd": ["1Esd"], "2Esd": ["2Esd"], "Ps151": ["Ps151"], "AddPs": ["AddPs"]
}
f.setBooks(books)
f.setOptions({
	".": ".",
	"c.v": ".",
	",": ",",
	"$chapters": ["$b"],
	"$verses": ["$b.$c"],
	"singleChapterFormat": "bcv",
	// This isn't necessary, but it saves some lookups since we know we always want the full BCV.
	"singleChapterBooks": [],
	"Ps151Format": "b",
	"-v": "-$verses.",
	"-c": "-$b.",
	",c": ",$b.",
	",v": ",$verses."
})

describe("Initialization", function() {
	it("should initialize", function() {
		expect(f.format("Matt")).toEqual("Matt")
	})
})

describe("Round trips", function() {
	it("should round-trip single books", function() {
		const starts = ["", ".2", ".2.3"]
		const ends = ["", ".2", ".2.3", ".4", ".4.5"]
		for (const book of Object.keys(books)) {
			expect(f.format(`${book}`)).toEqual(`${book}`)
			expect(f.format(`${book}.2`)).toEqual(`${book}.2`)
			expect(f.format(`${book}.2.3`)).toEqual(`${book}.2.3`)

			for (const joiner of [",", "-"]) {
				for (const startSuffix of starts) {
					const start = book + startSuffix
					for (const endSuffix of ends) {
						const end = book + endSuffix
						expect(f.format(`${start}${joiner}${end}`)).toEqual(`${start}${joiner}${end}`)
					}
				}
			}
		}
	})

	it("should round-trip multiple books", function() {
		const tests = [
			"Matt-Mark",
			"Matt-Mark.1",
			"Matt-Mark.1.2",
			"Matt.1-Mark",
			"Matt.1-Mark.1",
			"Matt.1-Mark.1.2",
			"Matt.1.2-Mark",
			"Matt.1.2-Mark.1",
			"Matt.1.2-Mark.1.2",

			"Matt-Phlm",
			"Matt-Phlm.1",
			"Matt-Phlm.1.2",
			"Matt.1-Phlm",
			"Matt.1-Phlm.1",
			"Matt.1-Phlm.1.2",
			"Matt.1.2-Phlm",
			"Matt.1.2-Phlm.1",
			"Matt.1.2-Phlm.1.2",

			"Ps-Matt",
			"Ps.1-Matt",
			"Ps.1.2-Matt",
			"Ps-Matt.1",
			"Ps.1-Matt.1",
			"Ps.1-Matt.1.2",
			"Ps.150-Matt",
			"Ps.150-Matt.1",
			"Ps.150-Matt.1.2",
			"Ps.151-Matt",
			"Ps.151-Matt.1",
			"Ps.151-Matt.1.2",

			"Ps151-Matt",
			"Ps151-Matt.1",
			"Ps151-Matt.1.2",
			"Ps151.1-Matt",
			"Ps151.1-Matt.1",
			"Ps151.1-Matt.1.2",
			"Ps151.1.2-Matt",
			"Ps151.1.2-Matt.1",
			"Ps151.1.2-Matt.1.2"
		]
		for (const test of tests) {
			expect(f.format(test)).toEqual(test)
		}
		expect(f.format(tests.join(","))).toEqual(tests.join(","))
	})
})
