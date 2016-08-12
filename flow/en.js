/* @flow */
"use strict";

const osisToReadable: () => OsisToReadableInterface = require("./osisToReadable")
const converter: OsisToReadableInterface = new osisToReadable;
let currentStyle: string = ""

const styles: StylesType = Object.freeze({
	"niv-long": {
		options: {
			",": "; ",
			"b,c": "; $chapters ",
			"b,v": "; $b ",
			"c,v": "; $verses ",
			"v,v": ",",
			"v,c": "; $chapters ",
			"v,cv": "; ",
			"$chapters": ["ch.", "chs."],
			"$verses": ["v.", "vv."],
			"singleChapterFormat": "b",
			"c.v": ":",
			",b": "; ",
			",c": "; ",
			"-": "\u2014",
			"b-c": "\u2014$chapters ",
			"b-v": "\u2014$b ",
			"b-b1c": "\u2014$b ",
			"c-v": "\u2014$c:",
			"v-c": "\u2014$chapters ",
			"v-cv": "\u2014",
			"v-v": "\u2013",
			"^c": "$chapters ",
			"b1^v": "$verses ",
			"^v": "$verses "
		},
		books: {
			"Gen": ["Genesis"], "Exod": ["Exodus"], "Lev": ["Leviticus"], "Num": ["Numbers"], "Deut": ["Deuteronomy"], "Josh": ["Joshua"], "Judg": ["Judges"], "Ruth": ["Ruth"], "1Sam": ["1 Samuel"], "2Sam": ["2 Samuel"], "1Kgs": ["1 Kings"], "2Kgs": ["2 Kings"], "1Chr": ["1 Chronicles"], "2Chr": ["2 Chronicles"], "Ezra": ["Ezra"], "Neh": ["Nehemiah"], "Esth": ["Esther"], "Job": ["Job"], "Ps": ["Psalm", "Psalms"], "Prov": ["Proverbs"], "Eccl": ["Ecclesiastes"], "Song": ["Song of Songs"], "Isa": ["Isaiah"], "Jer": ["Jeremiah"], "Lam": ["Lamentations"], "Ezek": ["Ezekiel"], "Dan": ["Daniel"], "Hos": ["Hosea"], "Joel": ["Joel"], "Amos": ["Amos"], "Obad": ["Obadiah"], "Jonah": ["Jonah"], "Mic": ["Micah"], "Nah": ["Nahum"], "Hab": ["Habakkuk"], "Zeph": ["Zephaniah"], "Hag": ["Haggai"], "Zech": ["Zechariah"], "Mal": ["Malachi"], "Matt": ["Matthew"], "Mark": ["Mark"], "Luke": ["Luke"], "John": ["John"], "Acts": ["Acts"], "Rom": ["Romans"], "1Cor": ["1 Corinthians"], "2Cor": ["2 Corinthians"], "Gal": ["Galatians"], "Eph": ["Ephesians"], "Phil": ["Philippians"], "Col": ["Colossians"], "1Thess": ["1 Thessalonians"], "2Thess": ["2 Thessalonians"], "1Tim": ["1 Timothy"], "2Tim": ["2 Timothy"], "Titus": ["Titus"], "Phlm": ["Philemon"], "Heb": ["Hebrews"], "Jas": ["James"], "1Pet": ["1 Peter"], "2Pet": ["2 Peter"], "1John": ["1 John"], "2John": ["2 John"], "3John": ["3 John"], "Jude": ["Jude"], "Rev": ["Revelation"], "Tob": ["Tobit"], "Jdt": ["Judith"], "GkEsth": ["Greek Esther"], "EsthGr": ["Greek Esther"], "AddEsth": ["Additions to Esther"], "Wis": ["Wisdom of Solomon"], "Sir": ["Sirach"], "Bar": ["Baruch"], "EpJer": ["Letter of Jeremiah"], "DanGr": ["Greek Daniel"], "SgThree": ["Song of the Three Holy Children"], "PrAzar": ["Prayer of Azariah"], "Sus": ["Susanna"], "Bel": ["Bel and the Dragon"], "1Macc": ["1 Maccabees"], "2Macc": ["2 Maccabees"], "3Macc": ["3 Maccabees"], "4Macc": ["4 Maccabees"], "PrMan": ["Prayer of Manasseh"], "1Esd": ["1 Esdras"], "2Esd": ["2 Esdras"], "Ps151": ["Psalm 151"], "AddPs": ["Psalm 151"],
			// Psalms
			"Ps.$chapters": ["Psalm", "Psalms"],
			// Ranges
			"1Sam-2Sam": ["1\u20142 Samuel"], "1Kgs-2Kgs": ["1\u20142 Kings"], "1Chr-2Chr": ["1\u20142 Chronicles"], "1Cor-2Cor": ["1\u20142 Corinthians"], "1Thess-2Thess": ["1\u20142 Thessalonians"], "1Tim-2Tim": ["1\u20142 Timothy"], "1Pet-2Pet": ["1\u20142 Peter"], "1John-2John": ["1\u20142 John"], "1John-3John": ["1\u20143 John"], "2John-3John": ["2\u20143 John"], "1Macc-2Macc": ["1\u20142 Maccabees"], "1Macc-3Macc": ["1\u20143 Maccabees"], "1Macc-4Macc": ["1\u20144 Maccabees"], "2Macc-3Macc": ["2\u20143 Maccabees"], "2Macc-4Macc": ["2\u20144 Maccabees"], "3Macc-4Macc": ["3\u20144 Maccabees"], "1Esd-2Esd": ["1\u20142 Esdras"],
			// Sequences
			"1Sam,2Sam": ["1 and 2 Samuel"], "1Kgs,2Kgs": ["1 and 2 Kings"], "1Chr,2Chr": ["1 and 2 Chronicles"], "1Cor,2Cor": ["1 and 2 Corinthians"], "1Thess,2Thess": ["1 and 2 Thessalonians"], "1Tim,2Tim": ["1 and 2 Timothy"], "1Pet,2Pet": ["1 and 2 Peter"], "1John,2John": ["1 and 2 John"], "1John,3John": ["1 and 3 John"], "2John,3John": ["1 and 2 John"], "1Macc,2Macc": ["1 and 2 Maccabees"], "1Macc,2Macc,3Macc": ["1, 2, and 3 Maccabees"], "1Macc,2Macc,3Macc,4Macc": ["1, 2, 3, and 4 Maccabees"], "1Macc,3Macc": ["1 and 3 Maccabees"], "1Macc,3Macc,4Macc": ["1, 3, and 4 Maccabees"], "1Macc,4Macc": ["1 and 4 Maccabees"], "2Macc,3Macc": ["2 and 3 Maccabees"], "2Macc,3Macc,4Macc": ["2, 3, and 4 Maccabees"], "2Macc,4Macc": ["2 and 4 Maccabees"], "3Macc,4Macc": ["3 and 4 Maccabees"], "1Esd,2Esd": ["1 and 2 Esdras"]
			}
	},
	"niv-short": {
		options: {
			",": "; ",
			"b,c": "; $chapters ",
			"b,v": "; $b ",
			"c,v": "; $verses ",
			"v,v": ",",
			"v,c": "; $chapters ",
			"v,cv": "; ",
			"$chapters": ["ch.", "chs."],
			"$verses": ["v.", "vv."],
			"singleChapterFormat": "b",
			"c.v": ":",
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
			"Gen": ["Gen"], "Exod": ["Exod"], "Lev": ["Lev"], "Num": ["Num"], "Deut": ["Deut"], "Josh": ["Josh"], "Judg": ["Judg"], "Ruth": ["Ruth"], "1Sam": ["1 Sam"], "2Sam": ["2 Sam"], "1Kgs": ["1 Kgs"], "2Kgs": ["2 Kgs"], "1Chr": ["1 Chr"], "2Chr": ["2 Chr"], "Ezra": ["Ezra"], "Neh": ["Neh"], "Esth": ["Esth"], "Job": ["Job"], "Ps": ["Ps", "Pss"], "Prov": ["Prov"], "Eccl": ["Eccl"], "Song": ["Song"], "Isa": ["Isa"], "Jer": ["Jer"], "Lam": ["Lam"], "Ezek": ["Ezek"], "Dan": ["Dan"], "Hos": ["Hos"], "Joel": ["Joel"], "Amos": ["Amos"], "Obad": ["Obad"], "Jonah": ["Jonah"], "Mic": ["Mic"], "Nah": ["Nah"], "Hab": ["Hab"], "Zeph": ["Zeph"], "Hag": ["Hag"], "Zech": ["Zech"], "Mal": ["Mal"], "Matt": ["Matt"], "Mark": ["Mark"], "Luke": ["Luke"], "John": ["John"], "Acts": ["Acts"], "Rom": ["Rom"], "1Cor": ["1 Cor"], "2Cor": ["2 Cor"], "Gal": ["Gal"], "Eph": ["Eph"], "Phil": ["Phil"], "Col": ["Col"], "1Thess": ["1 Thess"], "2Thess": ["2 Thess"], "1Tim": ["1 Tim"], "2Tim": ["2 Tim"], "Titus": ["Titus"], "Phlm": ["Phlm"], "Heb": ["Heb"], "Jas": ["Jas"], "1Pet": ["1 Pet"], "2Pet": ["2 Pet"], "1John": ["1 John"], "2John": ["2 John"], "3John": ["3 John"], "Jude": ["Jude"], "Rev": ["Rev"], "Tob": ["Tob"], "Jdt": ["Jdt"], "GkEsth": ["Gr Esth"], "EsthGr": ["Gr Esth"], "AddEsth": ["Add Esth"], "Wis": ["Wis"], "Sir": ["Sir"], "Bar": ["Bar"], "EpJer": ["L Jer"], "DanGr": ["Gr Dan"], "SgThree": ["S3Y"], "PrAzar": ["Pr Azar"], "Sus": ["Sus"], "Bel": ["Bel"], "1Macc": ["1 Macc"], "2Macc": ["2 Macc"], "3Macc": ["3 Macc"], "4Macc": ["4 Macc"], "PrMan": ["Pr Man"], "1Esd": ["1 Esd"], "2Esd": ["2 Esd"], "Ps151": ["Ps151"], "AddPs": ["Ps151"],
			// Psalms
			"Ps.$chapters": ["Ps", "Pss"],
			// Ranges
			"1Sam-2Sam": ["1\u20142 Sam"], "1Kgs-2Kgs": ["1\u20142 Kgs"], "1Chr-2Chr": ["1\u20142 Chr"], "1Cor-2Cor": ["1\u20142 Cor"], "1Thess-2Thess": ["1\u20142 Thess"], "1Tim-2Tim": ["1\u20142 Tim"], "1Pet-2Pet": ["1\u20142 Pet"], "1John-2John": ["1\u20142 John"], "1John-3John": ["1\u20143 John"], "2John-3John": ["2\u20143 John"], "1Macc-2Macc": ["1\u20142 Macc"], "1Macc-3Macc": ["1\u20143 Macc"], "1Macc-4Macc": ["1\u20144 Macc"], "2Macc-3Macc": ["2\u20143 Macc"], "2Macc-4Macc": ["2\u20144 Macc"], "3Macc-4Macc": ["3\u20144 Macc"], "1Esd-2Esd": ["1\u20142 Esd"],
			// Sequences
			"1Sam,2Sam": ["1 and 2 Sam"], "1Kgs,2Kgs": ["1 and 2 Kgs"], "1Chr,2Chr": ["1 and 2 Chr"], "1Cor,2Cor": ["1 and 2 Cor"], "1Thess,2Thess": ["1 and 2 Thess"], "1Tim,2Tim": ["1 and 2 Tim"], "1Pet,2Pet": ["1 and 2 Pet"], "1John,2John": ["1 and 2 John"], "1John,2John,3John": ["1, 2, and 3 John"], "1John,3John": ["1 and 3 John"], "2John,3John": ["1 and 2 John"], "1Macc,2Macc": ["1 and 2 Macc"], "1Macc,2Macc,3Macc": ["1, 2, and 3 Macc"], "1Macc,2Macc,3Macc,4Macc": ["1, 2, 3, and 4 Macc"], "1Macc,3Macc": ["1 and 3 Macc"], "1Macc,3Macc,4Macc": ["1, 3, and 4 Macc"], "1Macc,4Macc": ["1 and 4 Macc"], "2Macc,3Macc": ["2 and 3 Macc"], "2Macc,3Macc,4Macc": ["2, 3, and 4 Macc"], "2Macc,4Macc": ["2 and 4 Macc"], "3Macc,4Macc": ["3 and 4 Macc"], "1Esd,2Esd": ["1 and 2 Esd"]
		}
	},
	"niv-shortest": {
		options: {
			",": "; ",
			"b,c": "; $b ",
			"b,v": "; $b ",
			"c,v": "; $c:",
			"v,v": ", ",
			"v,c": "; $chapters ", // see Gen.10.15
			"v,cv": "; ",
			"$chapters": ["$b"],
			"$verses": ["ver"], // see Gen.18.2 for plural
			"singleChapterFormat": "b",
			"c.v": ":",
			",b": "; ",
			",c": "; ",
			"-": "-",
			"b-c": "-$chapters ",
			"b-v": "-$b ",
			"c-v": "-$c:",
			"v-c": "-$chapters ",
			"v-cv": "-",
			"^c": "$chapters ",
			"b1^v": "$verses ",
			"^v": "$verses "
		},
		books: {
			"Gen": ["Ge"], "Exod": ["Ex"], "Lev": ["Lev"], "Num": ["Nu"], "Deut": ["Dt"], "Josh": ["Jos"], "Judg": ["Jdg"], "Ruth": ["Ru"], "1Sam": ["1Sa"], "2Sam": ["2Sa"], "1Kgs": ["1Ki"], "2Kgs": ["2Ki"], "1Chr": ["1Ch"], "2Chr": ["2Ch"], "Ezra": ["Ezr"], "Neh": ["Ne"], "Esth": ["Est"], "Job": ["Job"], "Ps": ["Ps"], "Prov": ["Pr"], "Eccl": ["Ecc"], "Song": ["SS"], "Isa": ["Isa"], "Jer": ["Jer"], "Lam": ["La"], "Ezek": ["Eze"], "Dan": ["Da"], "Hos": ["Hos"], "Joel": ["Joel"], "Amos": ["Am"], "Obad": ["Ob"], "Jonah": ["Jnh"], "Mic": ["Mic"], "Nah": ["Na"], "Hab": ["Hab"], "Zeph": ["Zep"], "Hag": ["Hag"], "Zech": ["Zec"], "Mal": ["Mal"], "Matt": ["Mt"], "Mark": ["Mk"], "Luke": ["Lk"], "John": ["Jn"], "Acts": ["Ac"], "Rom": ["Ro"], "1Cor": ["1Co"], "2Cor": ["2Co"], "Gal": ["Gal"], "Eph": ["Eph"], "Phil": ["Php"], "Col": ["Col"], "1Thess": ["1Th"], "2Thess": ["2Th"], "1Tim": ["1Ti"], "2Tim": ["2Ti"], "Titus": ["Titus"], "Phlm": ["Phm"], "Heb": ["Heb"], "Jas": ["Jas"], "1Pet": ["1Pe"], "2Pet": ["2Pe"], "1John": ["1Jn"], "2John": ["2Jn"], "3John": ["3Jn"], "Jude": ["Jude"], "Rev": ["Rev"], "Tob": ["Tob"], "Jdt": ["Jdt"], "GkEsth": ["Gr Est"], "EsthGr": ["Gr Est"], "AddEsth": ["Add Est"], "Wis": ["Wis"], "Sir": ["Sir"], "Bar": ["Bar"], "EpJer": ["L Jer"], "DanGr": ["Gr Da"], "SgThree": ["S3Y"], "PrAzar": ["Pr Azar"], "Sus": ["Sus"], "Bel": ["Bel"], "1Macc": ["1Mac"], "2Macc": ["2Mac"], "3Macc": ["3Mac"], "4Macc": ["4Mac"], "PrMan": ["Pr Man"], "1Esd": ["1Esd"], "2Esd": ["2Esd"], "Ps151": ["Ps 151"], "AddPs": ["Ps 151"],
			// Psalms
			"Ps.$chapters": ["Ps"],
			// Ranges
			"1Sam-2Sam": ["1-2Sa"], "1Kgs-2Kgs": ["1-2Ki"], "1Chr-2Chr": ["1-2Ch"], "1Cor-2Cor": ["1-2Co"], "1Thess-2Thess": ["1-2Th"], "1Tim-2Tim": ["1-2Ti"], "1Pet-2Pet": ["1-2Pe"], "1John-2John": ["1-2Jn"], "1John-3John": ["1-3Jn"], "2John-3John": ["2-3Jn"], "1Macc-2Macc": ["1-2Mac"], "1Macc-3Macc": ["1-3Mac"], "1Macc-4Macc": ["1-4Mac"], "2Macc-3Macc": ["2-3Mac"], "2Macc-4Macc": ["2-4Mac"], "3Macc-4Macc": ["3-4Mac"], "1Esd-2Esd": ["1-2Esd"]
			// No sequences
		}
	},
})

function convertOsis(style: string, osis: string, context?: string) : string {
	if (style !== currentStyle) {
		setStyle(style)
	}
	return converter.toReadable(osis, context)
}

function setStyle(style: string): void {
	if (typeof styles[style] === "undefined") {
		throw `Unknown style: ${style}. Please choose: ${Object.keys(styles).join(", ")}`
	}
	converter.setBooks(styles[style].books)
	converter.setOptions(styles[style].options)
	currentStyle = style
}

module.exports = convertOsis