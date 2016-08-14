/* @flow */
"use strict"

/* global require, module */
const OsisFormatter: () => OsisFormatterInterface = require("./osisFormatter")
const osisFormatter: OsisFormatterInterface = new OsisFormatter()
let currentStyle: string = ""

const styles: StylesType = Object.freeze({
	// Set the `style-name` to whatever you like.
	"style-name": {
		options: {
			",": "; ",
			"b,c": "; $chapters ",
			"b,v": "; $b ",
			"c,v": "; $c:",
			"v,c": "; $chapters ",
			"v,cv": "; ",
			"v,v": ",",
			"$chapters": ["ch", "chs"],
			"$verses": ["v", "vv"],
			"singleChapterFormat": "b",
			",b": "; ",
			",c": "; ",
			"-": "\u2014",
			"b-c": "\u2014$chapters ",
			"b-v": "\u2014$b ",
			"c-v": "\u2014$c:",
			"v-c": "\u2014$chapters ",
			"v-cv": "\u2014",
			"v-v": "\u2013",
			"^c": "$chapters ",
			"b1^v": "$verses ",
			"^v": "$verses "
		},
		books: {
			// Delete any you don't need; you probably don't want to leave any of these books as empty strings.
			"Gen": [""],
			"Exod": [""],
			"Lev": [""],
			"Num": [""],
			"Deut": [""],
			"Josh": [""],
			"Judg": [""],
			"Ruth": [""],
			"1Sam": [""],
			"2Sam": [""],
			"1Kgs": [""],
			"2Kgs": [""],
			"1Chr": [""],
			"2Chr": [""],
			"Ezra": [""],
			"Neh": [""],
			"Esth": [""],
			"Job": [""],
			// You probably want two items for Psalms: the singular "Psalm" and the plural "Psalms".
			"Ps": [""],
			"Prov": [""],
			"Eccl": [""],
			"Song": [""],
			"Isa": [""],
			"Jer": [""],
			"Lam": [""],
			"Ezek": [""],
			"Dan": [""],
			"Hos": [""],
			"Joel": [""],
			"Amos": [""],
			"Obad": [""],
			"Jonah": [""],
			"Mic": [""],
			"Nah": [""],
			"Hab": [""],
			"Zeph": [""],
			"Hag": [""],
			"Zech": [""],
			"Mal": [""],
			"Matt": [""],
			"Mark": [""],
			"Luke": [""],
			"John": [""],
			"Acts": [""],
			"Rom": [""],
			"1Cor": [""],
			"2Cor": [""],
			"Gal": [""],
			"Eph": [""],
			"Phil": [""],
			"Col": [""],
			"1Thess": [""],
			"2Thess": [""],
			"1Tim": [""],
			"2Tim": [""],
			"Titus": [""],
			"Phlm": [""],
			"Heb": [""],
			"Jas": [""],
			"1Pet": [""],
			"2Pet": [""],
			"1John": [""],
			"2John": [""],
			"3John": [""],
			"Jude": [""],
			"Rev": [""],
			"Tob": [""],
			"Jdt": [""],
			// `GkEsth` and `EsthGr` are identical.
			"GkEsth": [""],
			"EsthGr": [""],
			"AddEsth": [""],
			"Wis": [""],
			"Sir": [""],
			"Bar": [""],
			"EpJer": [""],
			"DanGr": [""],
			"SgThree": [""],
			"PrAzar": [""],
			"Sus": [""],
			"Bel": [""],
			"1Macc": [""],
			"2Macc": [""],
			"3Macc": [""],
			"4Macc": [""],
			"PrMan": [""],
			"1Esd": [""],
			"2Esd": [""],
			// `Ps151` and `AddPs` are identical.
			"Ps151": [""],
			"AddPs": [""],
			// Psalm chapters. You probably want two items for Psalms: the singular "Psalm" and the plural "Psalms".
			"Ps.$chapters": [],
			// Ranges.
			"1Sam-2Sam": [""],
			"1Kgs-2Kgs": [""],
			"1Chr-2Chr": [""],
			"1Cor-2Cor": [""],
			"1Thess-2Thess": [""],
			"1Tim-2Tim": [""],
			"1Pet-2Pet": [""],
			"1John-2John": [""],
			"1John-3John": [""],
			"2John-3John": [""],
			"1Macc-2Macc": [""],
			"1Macc-3Macc": [""],
			"1Macc-4Macc": [""],
			"2Macc-3Macc": [""],
			"2Macc-4Macc": [""],
			"3Macc-4Macc": [""],
			"1Esd-2Esd": [""],
			// Sequences.
			"1Sam,2Sam": [""],
			"1Kgs,2Kgs": [""],
			"1Chr,2Chr": [""],
			"1Cor,2Cor": [""],
			"1Thess,2Thess": [""],
			"1Tim,2Tim": [""],
			"1Pet,2Pet": [""],
			"1John,2John": [""],
			"1John,3John": [""],
			"2John,3John": [""],
			"1Macc,2Macc": [""],
			"1Macc,2Macc,3Macc": [""],
			"1Macc,2Macc,3Macc,4Macc": [""],
			"1Macc,3Macc": [""],
			"1Macc,3Macc,4Macc": [""],
			"1Macc,4Macc": [""],
			"2Macc,3Macc": [""],
			"2Macc,3Macc,4Macc": [""],
			"2Macc,4Macc": [""],
			"3Macc,4Macc": [""],
			"1Esd,2Esd": [""]
		}
	}
})

function convertOsis(style: string, osis: string, context?: string) : string {
	if (style !== currentStyle) {
		setStyle(style)
	}
	return osisFormatter.format(osis, context)
}

function setStyle(style: string): void {
	if (typeof styles[style] === "undefined") {
		throw `Unknown style: ${style}. Please choose: ${Object.keys(styles).join(", ")}`
	}
	osisFormatter.setBooks(styles[style].books)
	osisFormatter.setOptions(styles[style].options)
	currentStyle = style
}

module.exports = convertOsis
