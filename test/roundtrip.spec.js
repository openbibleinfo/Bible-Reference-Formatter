const osisToParatext = require("../es6/osisToParatext")
const paratextToOsis = require("../es6/paratextToOsis")

const osises = {"Gen": "GEN", "Exod": "EXO", "Lev": "LEV", "Num": "NUM", "Deut": "DEU", "Josh": "JOS", "Judg": "JDG", "Ruth": "RUT", "1Sam": "1SA", "2Sam": "2SA", "1Kgs": "1KI", "2Kgs": "2KI", "1Chr": "1CH", "2Chr": "2CH", "Ezra": "EZR", "Neh": "NEH", "Esth": "EST", "Job": "JOB", "Ps": "PSA", "Prov": "PRO", "Eccl": "ECC", "Song": "SNG", "Isa": "ISA", "Jer": "JER", "Lam": "LAM", "Ezek": "EZK", "Dan": "DAN", "Hos": "HOS", "Joel": "JOL", "Amos": "AMO", "Obad": "OBA", "Jonah": "JON", "Mic": "MIC", "Nah": "NAM", "Hab": "HAB", "Zeph": "ZEP", "Hag": "HAG", "Zech": "ZEC", "Mal": "MAL", "Matt": "MAT", "Mark": "MRK", "Luke": "LUK", "John": "JHN", "Acts": "ACT", "Rom": "ROM", "1Cor": "1CO", "2Cor": "2CO", "Gal": "GAL", "Eph": "EPH", "Phil": "PHP", "Col": "COL", "1Thess": "1TH", "2Thess": "2TH", "1Tim": "1TI", "2Tim": "2TI", "Titus": "TIT", "Phlm": "PHM", "Heb": "HEB", "Jas": "JAS", "1Pet": "1PE", "2Pet": "2PE", "1John": "1JN", "2John": "2JN", "3John": "3JN", "Jude": "JUD", "Rev": "REV", "Tob": "TOB", "Jdt": "JDT", "EsthGr": "ESG", "AddEsth": "ADE", "Wis": "WIS", "Sir": "SIR", "Bar": "BAR", "EpJer": "LJE", "DanGr": "DAG", "PrAzar": "S3Y", "Sus": "SUS", "Bel": "BEL", "1Macc": "1MA", "2Macc": "2MA", "3Macc": "3MA", "4Macc": "4MA", "PrMan": "MAN", "1Esd": "1ES", "2Esd": "2ES", "AddPs": "PS2", "GkEsth": {paratext: "ESG", osis: "EsthGr"}, "SgThree": {paratext: "S3Y", osis: "PrAzar"}
}

describe("Variants", function() {
	for (const osisBook of Object.keys(osises)) {
		it (`should round-trip '${osisBook}'`, function() {
			let paratextBook = osises[osisBook]
			let expectedOsisBook = osisBook
			if (typeof paratextBook === "object") {
				expectedOsisBook = paratextBook.osis
				paratextBook = paratextBook.paratext
			}
			const inputOsis = `${osisBook}.1.2-${osisBook}.3.4`
			const expectedOsis = `${expectedOsisBook}.1.2-${expectedOsisBook}.3.4`
			const expectedParatext = `${paratextBook} 1:2-3:4`
			const resultParatext = osisToParatext(inputOsis)
			const resultOsis = paratextToOsis(resultParatext)
			expect(resultParatext).toEqual(expectedParatext)
			expect(resultOsis).toEqual(expectedOsis)
		})
	}
})
