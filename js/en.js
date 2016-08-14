var osisToEn =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* global require, module */

	var OsisFormatter = __webpack_require__(1);
	var osisFormatter = new OsisFormatter();
	var currentStyle = "";

	var styles = Object.freeze({
		"niv-long": {
			options: {
				",": "; ",
				"b,c": "; $chapters ",
				"b,v": "; $b ",
				"c,v": "; $c:",
				"v,c": "; $chapters ",
				"v,cv": "; ",
				"v,v": ",",
				"$chapters": ["ch.", "chs."],
				"$verses": ["v.", "vv."],
				"singleChapterFormat": "b",
				",b": "; ",
				",c": "; ",
				"-": "—",
				"b-c": "—$chapters ",
				"b-v": "—$b ",
				"c-v": "—$c:",
				"v-c": "—$chapters ",
				"v-cv": "—",
				"v-v": "–",
				"^c": "$chapters ",
				"b1^v": "$verses ",
				"^v": "$verses "
			},
			// Many DC book names come from Zondervan's Christian Writer's Manual of Style. https://books.google.com/books?id=qC8XIEFdyYAC&pg=PA21&dq=%22S+of+III+Ch%22&hl=en&sa=X&ved=0ahUKEwiasYy5nbzOAhVJLyYKHYkZBbQQ6AEIHjAA#v=onepage&q=%22S%20of%20III%20Ch%22&f=false
			books: {
				"Gen": ["Genesis"], "Exod": ["Exodus"], "Lev": ["Leviticus"], "Num": ["Numbers"], "Deut": ["Deuteronomy"], "Josh": ["Joshua"], "Judg": ["Judges"], "Ruth": ["Ruth"], "1Sam": ["1 Samuel"], "2Sam": ["2 Samuel"], "1Kgs": ["1 Kings"], "2Kgs": ["2 Kings"], "1Chr": ["1 Chronicles"], "2Chr": ["2 Chronicles"], "Ezra": ["Ezra"], "Neh": ["Nehemiah"], "Esth": ["Esther"], "Job": ["Job"], "Ps": ["Psalm", "Psalms"], "Prov": ["Proverbs"], "Eccl": ["Ecclesiastes"], "Song": ["Song of Songs"], "Isa": ["Isaiah"], "Jer": ["Jeremiah"], "Lam": ["Lamentations"], "Ezek": ["Ezekiel"], "Dan": ["Daniel"], "Hos": ["Hosea"], "Joel": ["Joel"], "Amos": ["Amos"], "Obad": ["Obadiah"], "Jonah": ["Jonah"], "Mic": ["Micah"], "Nah": ["Nahum"], "Hab": ["Habakkuk"], "Zeph": ["Zephaniah"], "Hag": ["Haggai"], "Zech": ["Zechariah"], "Mal": ["Malachi"], "Matt": ["Matthew"], "Mark": ["Mark"], "Luke": ["Luke"], "John": ["John"], "Acts": ["Acts"], "Rom": ["Romans"], "1Cor": ["1 Corinthians"], "2Cor": ["2 Corinthians"], "Gal": ["Galatians"], "Eph": ["Ephesians"], "Phil": ["Philippians"], "Col": ["Colossians"], "1Thess": ["1 Thessalonians"], "2Thess": ["2 Thessalonians"], "1Tim": ["1 Timothy"], "2Tim": ["2 Timothy"], "Titus": ["Titus"], "Phlm": ["Philemon"], "Heb": ["Hebrews"], "Jas": ["James"], "1Pet": ["1 Peter"], "2Pet": ["2 Peter"], "1John": ["1 John"], "2John": ["2 John"], "3John": ["3 John"], "Jude": ["Jude"], "Rev": ["Revelation"], "Tob": ["Tobit"], "Jdt": ["Judith"], "GkEsth": ["Greek Esther"], "EsthGr": ["Greek Esther"], "AddEsth": ["Rest of Esther"], "Wis": ["Wisdom of Solomon"], "Sir": ["Sirach"], "Bar": ["Baruch"], "EpJer": ["Epistle of Jeremiah"], "DanGr": ["Greek Daniel"], "SgThree": ["Song of the Three Holy Children"], "PrAzar": ["Prayer of Azariah"], "Sus": ["Susanna"], "Bel": ["Bel and the Dragon"], "1Macc": ["1 Maccabees"], "2Macc": ["2 Maccabees"], "3Macc": ["3 Maccabees"], "4Macc": ["4 Maccabees"], "PrMan": ["Prayer of Manasseh"], "1Esd": ["1 Esdras"], "2Esd": ["2 Esdras"], "Ps151": ["Psalm 151"], "AddPs": ["Psalm 151"],
				// Psalms
				"Ps.$chapters": ["Psalm", "Psalms"],
				// Ranges
				"1Sam-2Sam": ["1—2 Samuel"], "1Kgs-2Kgs": ["1—2 Kings"], "1Chr-2Chr": ["1—2 Chronicles"], "1Cor-2Cor": ["1—2 Corinthians"], "1Thess-2Thess": ["1—2 Thessalonians"], "1Tim-2Tim": ["1—2 Timothy"], "1Pet-2Pet": ["1—2 Peter"], "1John-2John": ["1—2 John"], "1John-3John": ["1—3 John"], "2John-3John": ["2—3 John"], "1Macc-2Macc": ["1—2 Maccabees"], "1Macc-3Macc": ["1—3 Maccabees"], "1Macc-4Macc": ["1—4 Maccabees"], "2Macc-3Macc": ["2—3 Maccabees"], "2Macc-4Macc": ["2—4 Maccabees"], "3Macc-4Macc": ["3—4 Maccabees"], "1Esd-2Esd": ["1—2 Esdras"],
				// Sequences
				"1Sam,2Sam": ["1 and 2 Samuel"], "1Kgs,2Kgs": ["1 and 2 Kings"], "1Chr,2Chr": ["1 and 2 Chronicles"], "1Cor,2Cor": ["1 and 2 Corinthians"], "1Thess,2Thess": ["1 and 2 Thessalonians"], "1Tim,2Tim": ["1 and 2 Timothy"], "1Pet,2Pet": ["1 and 2 Peter"], "1John,2John": ["1 and 2 John"], "1John,3John": ["1 and 3 John"], "2John,3John": ["2 and 3 John"], "1Macc,2Macc": ["1 and 2 Maccabees"], "1Macc,2Macc,3Macc": ["1, 2, and 3 Maccabees"], "1Macc,2Macc,3Macc,4Macc": ["1, 2, 3, and 4 Maccabees"], "1Macc,3Macc": ["1 and 3 Maccabees"], "1Macc,3Macc,4Macc": ["1, 3, and 4 Maccabees"], "1Macc,4Macc": ["1 and 4 Maccabees"], "2Macc,3Macc": ["2 and 3 Maccabees"], "2Macc,3Macc,4Macc": ["2, 3, and 4 Maccabees"], "2Macc,4Macc": ["2 and 4 Maccabees"], "3Macc,4Macc": ["3 and 4 Maccabees"], "1Esd,2Esd": ["1 and 2 Esdras"]
			}
		},
		"niv-short": {
			options: {
				",": "; ",
				"b,c": "; $chapters ",
				"b,v": "; $b ",
				"c,v": "; $c:",
				"v,c": "; $chapters ",
				"v,cv": "; ",
				"v,v": ",",
				"$chapters": ["ch.", "chs."],
				"$verses": ["v.", "vv."],
				"singleChapterFormat": "b",
				",b": "; ",
				",c": "; ",
				"-": "—",
				"b-c": "—$chapters ",
				"b-v": "—$b ",
				"c-v": "—$c:",
				"v-c": "—$chapters ",
				"v-cv": "—",
				"v-v": "–",
				"^c": "$chapters ",
				"b1^v": "$verses ",
				"^v": "$verses "
			},
			books: {
				"Gen": ["Gen"], "Exod": ["Exod"], "Lev": ["Lev"], "Num": ["Num"], "Deut": ["Deut"], "Josh": ["Josh"], "Judg": ["Judg"], "Ruth": ["Ruth"], "1Sam": ["1 Sam"], "2Sam": ["2 Sam"], "1Kgs": ["1 Kgs"], "2Kgs": ["2 Kgs"], "1Chr": ["1 Chr"], "2Chr": ["2 Chr"], "Ezra": ["Ezra"], "Neh": ["Neh"], "Esth": ["Esth"], "Job": ["Job"], "Ps": ["Ps", "Pss"], "Prov": ["Prov"], "Eccl": ["Eccl"], "Song": ["Song"], "Isa": ["Isa"], "Jer": ["Jer"], "Lam": ["Lam"], "Ezek": ["Ezek"], "Dan": ["Dan"], "Hos": ["Hos"], "Joel": ["Joel"], "Amos": ["Amos"], "Obad": ["Obad"], "Jonah": ["Jonah"], "Mic": ["Mic"], "Nah": ["Nah"], "Hab": ["Hab"], "Zeph": ["Zeph"], "Hag": ["Hag"], "Zech": ["Zech"], "Mal": ["Mal"], "Matt": ["Matt"], "Mark": ["Mark"], "Luke": ["Luke"], "John": ["John"], "Acts": ["Acts"], "Rom": ["Rom"], "1Cor": ["1 Cor"], "2Cor": ["2 Cor"], "Gal": ["Gal"], "Eph": ["Eph"], "Phil": ["Phil"], "Col": ["Col"], "1Thess": ["1 Thess"], "2Thess": ["2 Thess"], "1Tim": ["1 Tim"], "2Tim": ["2 Tim"], "Titus": ["Titus"], "Phlm": ["Phlm"], "Heb": ["Heb"], "Jas": ["Jas"], "1Pet": ["1 Pet"], "2Pet": ["2 Pet"], "1John": ["1 John"], "2John": ["2 John"], "3John": ["3 John"], "Jude": ["Jude"], "Rev": ["Rev"], "Tob": ["Tobit"], "Jdt": ["Judith"], "GkEsth": ["Gr Esth"], "EsthGr": ["Gr Esth"], "AddEsth": ["Rest of Esth"], "Wis": ["Wisd Sol"], "Sir": ["Sir"], "Bar": ["Bar"], "EpJer": ["Ep Jer"], "DanGr": ["Gr Dan"], "SgThree": ["S of III Ch"], "PrAzar": ["Pr Azar"], "Sus": ["Sus"], "Bel": ["Bel"], "1Macc": ["1 Macc"], "2Macc": ["2 Macc"], "3Macc": ["3 Macc"], "4Macc": ["4 Macc"], "PrMan": ["Pr Man"], "1Esd": ["1 Esd"], "2Esd": ["2 Esd"], "Ps151": ["Ps151"], "AddPs": ["Ps151"],
				// Psalms
				"Ps.$chapters": ["Ps", "Pss"],
				// Ranges
				"1Sam-2Sam": ["1—2 Sam"], "1Kgs-2Kgs": ["1—2 Kgs"], "1Chr-2Chr": ["1—2 Chr"], "1Cor-2Cor": ["1—2 Cor"], "1Thess-2Thess": ["1—2 Thess"], "1Tim-2Tim": ["1—2 Tim"], "1Pet-2Pet": ["1—2 Pet"], "1John-2John": ["1—2 John"], "1John-3John": ["1—3 John"], "2John-3John": ["2—3 John"], "1Macc-2Macc": ["1—2 Macc"], "1Macc-3Macc": ["1—3 Macc"], "1Macc-4Macc": ["1—4 Macc"], "2Macc-3Macc": ["2—3 Macc"], "2Macc-4Macc": ["2—4 Macc"], "3Macc-4Macc": ["3—4 Macc"], "1Esd-2Esd": ["1—2 Esd"],
				// Sequences
				"1Sam,2Sam": ["1 and 2 Sam"], "1Kgs,2Kgs": ["1 and 2 Kgs"], "1Chr,2Chr": ["1 and 2 Chr"], "1Cor,2Cor": ["1 and 2 Cor"], "1Thess,2Thess": ["1 and 2 Thess"], "1Tim,2Tim": ["1 and 2 Tim"], "1Pet,2Pet": ["1 and 2 Pet"], "1John,2John": ["1 and 2 John"], "1John,2John,3John": ["1, 2, and 3 John"], "1John,3John": ["1 and 3 John"], "2John,3John": ["2 and 3 John"], "1Macc,2Macc": ["1 and 2 Macc"], "1Macc,2Macc,3Macc": ["1, 2, and 3 Macc"], "1Macc,2Macc,3Macc,4Macc": ["1, 2, 3, and 4 Macc"], "1Macc,3Macc": ["1 and 3 Macc"], "1Macc,3Macc,4Macc": ["1, 3, and 4 Macc"], "1Macc,4Macc": ["1 and 4 Macc"], "2Macc,3Macc": ["2 and 3 Macc"], "2Macc,3Macc,4Macc": ["2, 3, and 4 Macc"], "2Macc,4Macc": ["2 and 4 Macc"], "3Macc,4Macc": ["3 and 4 Macc"], "1Esd,2Esd": ["1 and 2 Esd"]
			}
		},
		"niv-shortest": {
			options: {
				",": "; ",
				"b,c": "; $b ",
				"b,v": "; $b ",
				"c,v": "; $c:",
				"v,c": "; $chapters ", // see Gen.10.15
				"v,cv": "; ",
				"v,v": ", ",
				"$chapters": ["$b"],
				"$verses": ["ver"], // see Gen.18.2 for plural
				"singleChapterFormat": "b",
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
				"Gen": ["Ge"], "Exod": ["Ex"], "Lev": ["Lev"], "Num": ["Nu"], "Deut": ["Dt"], "Josh": ["Jos"], "Judg": ["Jdg"], "Ruth": ["Ru"], "1Sam": ["1Sa"], "2Sam": ["2Sa"], "1Kgs": ["1Ki"], "2Kgs": ["2Ki"], "1Chr": ["1Ch"], "2Chr": ["2Ch"], "Ezra": ["Ezr"], "Neh": ["Ne"], "Esth": ["Est"], "Job": ["Job"], "Ps": ["Ps"], "Prov": ["Pr"], "Eccl": ["Ecc"], "Song": ["SS"], "Isa": ["Isa"], "Jer": ["Jer"], "Lam": ["La"], "Ezek": ["Eze"], "Dan": ["Da"], "Hos": ["Hos"], "Joel": ["Joel"], "Amos": ["Am"], "Obad": ["Ob"], "Jonah": ["Jnh"], "Mic": ["Mic"], "Nah": ["Na"], "Hab": ["Hab"], "Zeph": ["Zep"], "Hag": ["Hag"], "Zech": ["Zec"], "Mal": ["Mal"], "Matt": ["Mt"], "Mark": ["Mk"], "Luke": ["Lk"], "John": ["Jn"], "Acts": ["Ac"], "Rom": ["Ro"], "1Cor": ["1Co"], "2Cor": ["2Co"], "Gal": ["Gal"], "Eph": ["Eph"], "Phil": ["Php"], "Col": ["Col"], "1Thess": ["1Th"], "2Thess": ["2Th"], "1Tim": ["1Ti"], "2Tim": ["2Ti"], "Titus": ["Titus"], "Phlm": ["Phm"], "Heb": ["Heb"], "Jas": ["Jas"], "1Pet": ["1Pe"], "2Pet": ["2Pe"], "1John": ["1Jn"], "2John": ["2Jn"], "3John": ["3Jn"], "Jude": ["Jude"], "Rev": ["Rev"], "Tob": ["Tb"], "Jdt": ["Jth"], "GkEsth": ["Gr Est"], "EsthGr": ["Gr Est"], "AddEsth": ["RE"], "Wis": ["WS"], "Sir": ["Sir"], "Bar": ["Bar"], "EpJer": ["Ep Jer"], "DanGr": ["Gr Da"], "SgThree": ["STHC"], "PrAzar": ["PrAz"], "Sus": ["Sus"], "Bel": ["Bel"], "1Macc": ["1Mc"], "2Macc": ["2Mc"], "3Macc": ["3Mc"], "4Macc": ["4Mc"], "PrMan": ["PrM"], "1Esd": ["1Es"], "2Esd": ["2Es"], "Ps151": ["Ps 151"], "AddPs": ["Ps 151"],
				// Psalms
				"Ps.$chapters": ["Ps"],
				// Ranges
				"1Sam-2Sam": ["1-2Sa"], "1Kgs-2Kgs": ["1-2Ki"], "1Chr-2Chr": ["1-2Ch"], "1Cor-2Cor": ["1-2Co"], "1Thess-2Thess": ["1-2Th"], "1Tim-2Tim": ["1-2Ti"], "1Pet-2Pet": ["1-2Pe"], "1John-2John": ["1-2Jn"], "1John-3John": ["1-3Jn"], "2John-3John": ["2-3Jn"], "1Macc-2Macc": ["1-2Mc"], "1Macc-3Macc": ["1-3Mc"], "1Macc-4Macc": ["1-4Mc"], "2Macc-3Macc": ["2-3Mc"], "2Macc-4Macc": ["2-4Mc"], "3Macc-4Macc": ["3-4Mc"], "1Esd-2Esd": ["1-2Es"]
				// No sequences
			}
		},
		// Some DC books are from the Tyndale Bible Dictionary.
		"nlt-long": {
			options: {
				",": "; ",
				"b,c": "; $chapters ",
				"b,v": "; $b ",
				"c,v": "; $c:",
				"v,c": "; $chapters ",
				"v,cv": "; ",
				"v,v": ", ",
				"$chapters": ["ch", "chs"],
				"$verses": ["v", "vv"],
				"singleChapterFormat": "b",
				",b": "; ",
				",c": "; ",
				"-": "—",
				"b-c": "—$chapters ",
				"b-v": "—$b ",
				"c-v": "—$c:",
				"v-c": "—$chapters ",
				"v-cv": "—",
				"v-v": "–",
				"^c": "$chapters ",
				"b1^v": "$verses ",
				"^v": "$verses "
			},
			books: {
				"Gen": ["Genesis"], "Exod": ["Exodus"], "Lev": ["Leviticus"], "Num": ["Numbers"], "Deut": ["Deuteronomy"], "Josh": ["Joshua"], "Judg": ["Judges"], "Ruth": ["Ruth"], "1Sam": ["1 Samuel"], "2Sam": ["2 Samuel"], "1Kgs": ["1 Kings"], "2Kgs": ["2 Kings"], "1Chr": ["1 Chronicles"], "2Chr": ["2 Chronicles"], "Ezra": ["Ezra"], "Neh": ["Nehemiah"], "Esth": ["Esther"], "Job": ["Job"], "Ps": ["Psalm", "Psalms"], "Prov": ["Proverbs"], "Eccl": ["Ecclesiastes"], "Song": ["Song of Songs"], "Isa": ["Isaiah"], "Jer": ["Jeremiah"], "Lam": ["Lamentations"], "Ezek": ["Ezekiel"], "Dan": ["Daniel"], "Hos": ["Hosea"], "Joel": ["Joel"], "Amos": ["Amos"], "Obad": ["Obadiah"], "Jonah": ["Jonah"], "Mic": ["Micah"], "Nah": ["Nahum"], "Hab": ["Habakkuk"], "Zeph": ["Zephaniah"], "Hag": ["Haggai"], "Zech": ["Zechariah"], "Mal": ["Malachi"], "Matt": ["Matthew"], "Mark": ["Mark"], "Luke": ["Luke"], "John": ["John"], "Acts": ["Acts"], "Rom": ["Romans"], "1Cor": ["1 Corinthians"], "2Cor": ["2 Corinthians"], "Gal": ["Galatians"], "Eph": ["Ephesians"], "Phil": ["Philippians"], "Col": ["Colossians"], "1Thess": ["1 Thessalonians"], "2Thess": ["2 Thessalonians"], "1Tim": ["1 Timothy"], "2Tim": ["2 Timothy"], "Titus": ["Titus"], "Phlm": ["Philemon"], "Heb": ["Hebrews"], "Jas": ["James"], "1Pet": ["1 Peter"], "2Pet": ["2 Peter"], "1John": ["1 John"], "2John": ["2 John"], "3John": ["3 John"], "Jude": ["Jude"], "Rev": ["Revelation"], "Tob": ["Tobit"], "Jdt": ["Judith"], "GkEsth": ["Greek Esther"], "EsthGr": ["Greek Esther"], "AddEsth": ["Additions to Esther"], "Wis": ["Wisdom of Solomon"], "Sir": ["Sirach"], "Bar": ["Baruch"], "EpJer": ["Epistle of Jeremiah"], "DanGr": ["Greek Daniel"], "SgThree": ["Song of the Three Jews"], "PrAzar": ["Prayer of Azariah"], "Sus": ["Susanna"], "Bel": ["Bel and the Dragon"], "1Macc": ["1 Maccabees"], "2Macc": ["2 Maccabees"], "3Macc": ["3 Maccabees"], "4Macc": ["4 Maccabees"], "PrMan": ["Prayer of Manasseh"], "1Esd": ["1 Esdras"], "2Esd": ["2 Esdras"], "Ps151": ["Psalm 151"], "AddPs": ["Psalm 151"],
				// Psalms
				"Ps.$chapters": ["Psalm", "Psalms"],
				// Ranges
				"1Sam-2Sam": ["1—2 Samuel"], "1Kgs-2Kgs": ["1—2 Kings"], "1Chr-2Chr": ["1—2 Chronicles"], "1Cor-2Cor": ["1—2 Corinthians"], "1Thess-2Thess": ["1—2 Thessalonians"], "1Tim-2Tim": ["1—2 Timothy"], "1Pet-2Pet": ["1—2 Peter"], "1John-2John": ["1—2 John"], "1John-3John": ["1—3 John"], "2John-3John": ["2—3 John"], "1Macc-2Macc": ["1—2 Maccabees"], "1Macc-3Macc": ["1—3 Maccabees"], "1Macc-4Macc": ["1—4 Maccabees"], "2Macc-3Macc": ["2—3 Maccabees"], "2Macc-4Macc": ["2—4 Maccabees"], "3Macc-4Macc": ["3—4 Maccabees"], "1Esd-2Esd": ["1—2 Esdras"],
				// Sequences
				"1Sam,2Sam": ["1 and 2 Samuel"], "1Kgs,2Kgs": ["1 and 2 Kings"], "1Chr,2Chr": ["1 and 2 Chronicles"], "1Cor,2Cor": ["1 and 2 Corinthians"], "1Thess,2Thess": ["1 and 2 Thessalonians"], "1Tim,2Tim": ["1 and 2 Timothy"], "1Pet,2Pet": ["1 and 2 Peter"], "1John,2John": ["1 and 2 John"], "1John,3John": ["1 and 3 John"], "2John,3John": ["2 and 3 John"], "1Macc,2Macc": ["1 and 2 Maccabees"], "1Macc,2Macc,3Macc": ["1, 2, and 3 Maccabees"], "1Macc,2Macc,3Macc,4Macc": ["1, 2, 3, and 4 Maccabees"], "1Macc,3Macc": ["1 and 3 Maccabees"], "1Macc,3Macc,4Macc": ["1, 3, and 4 Maccabees"], "1Macc,4Macc": ["1 and 4 Maccabees"], "2Macc,3Macc": ["2 and 3 Maccabees"], "2Macc,3Macc,4Macc": ["2, 3, and 4 Maccabees"], "2Macc,4Macc": ["2 and 4 Maccabees"], "3Macc,4Macc": ["3 and 4 Maccabees"], "1Esd,2Esd": ["1 and 2 Esdras"]
			}
		},
		"nlt-short": {
			options: {
				",": "; ",
				"b,c": "; $chapters ",
				"b,v": "; $b ",
				"c,v": "; $c:",
				"v,c": "; $chapters ",
				"v,cv": "; ",
				"v,v": ", ",
				"$chapters": ["ch", "chs"],
				"$verses": ["v", "vv"],
				"singleChapterFormat": "b",
				",b": "; ",
				",c": "; ",
				"-": "—",
				"b-c": "—$chapters ",
				"b-v": "—$b ",
				"c-v": "—$c:",
				"v-c": "—$chapters ",
				"v-cv": "—",
				"v-v": "–",
				"^c": "$chapters ",
				"b1^v": "$verses ",
				"^v": "$verses "
			},
			books: {
				"Gen": ["Gen"], "Exod": ["Exod"], "Lev": ["Lev"], "Num": ["Num"], "Deut": ["Deut"], "Josh": ["Josh"], "Judg": ["Judg"], "Ruth": ["Ruth"], "1Sam": ["1 Sam"], "2Sam": ["2 Sam"], "1Kgs": ["1 Kgs"], "2Kgs": ["2 Kgs"], "1Chr": ["1 Chr"], "2Chr": ["2 Chr"], "Ezra": ["Ezra"], "Neh": ["Neh"], "Esth": ["Esth"], "Job": ["Job"], "Ps": ["Ps", "Pss"], "Prov": ["Prov"], "Eccl": ["Eccl"], "Song": ["Song"], "Isa": ["Isa"], "Jer": ["Jer"], "Lam": ["Lam"], "Ezek": ["Ezek"], "Dan": ["Dan"], "Hos": ["Hos"], "Joel": ["Joel"], "Amos": ["Amos"], "Obad": ["Obad"], "Jonah": ["Jonah"], "Mic": ["Mic"], "Nah": ["Nah"], "Hab": ["Hab"], "Zeph": ["Zeph"], "Hag": ["Hag"], "Zech": ["Zech"], "Mal": ["Mal"], "Matt": ["Matt"], "Mark": ["Mark"], "Luke": ["Luke"], "John": ["John"], "Acts": ["Acts"], "Rom": ["Rom"], "1Cor": ["1 Cor"], "2Cor": ["2 Cor"], "Gal": ["Gal"], "Eph": ["Eph"], "Phil": ["Phil"], "Col": ["Col"], "1Thess": ["1 Thes"], "2Thess": ["2 Thes"], "1Tim": ["1 Tim"], "2Tim": ["2 Tim"], "Titus": ["Titus"], "Phlm": ["Phlm"], "Heb": ["Heb"], "Jas": ["Jas"], "1Pet": ["1 Pet"], "2Pet": ["2 Pet"], "1John": ["1 Jn"], "2John": ["2 Jn"], "3John": ["3 Jn"], "Jude": ["Jude"], "Rev": ["Rev"], "Tob": ["Tb"], "Jdt": ["Jdt"], "GkEsth": ["Gr Esth"], "EsthGr": ["Gr Esth"], "AddEsth": ["Add Esth"], "Wis": ["Wisd Sol"], "Sir": ["Sir"], "Bar": ["Bar"], "EpJer": ["Ep Jer"], "DanGr": ["Gr Dan"], "SgThree": ["Pr Azar"], "PrAzar": ["Pr Azar"], "Sus": ["Sus"], "Bel": ["Bel"], "1Macc": ["1 Macc"], "2Macc": ["2 Macc"], "3Macc": ["3 Macc"], "4Macc": ["4 Macc"], "PrMan": ["Pr Man"], "1Esd": ["1 Esd"], "2Esd": ["2 Esd"], "Ps151": ["Ps151"], "AddPs": ["Ps151"],
				// Psalms
				"Ps.$chapters": ["Ps", "Pss"],
				// Ranges
				"1Sam-2Sam": ["1—2 Sam"], "1Kgs-2Kgs": ["1—2 Kgs"], "1Chr-2Chr": ["1—2 Chr"], "1Cor-2Cor": ["1—2 Cor"], "1Thess-2Thess": ["1—2 Thes"], "1Tim-2Tim": ["1—2 Tim"], "1Pet-2Pet": ["1—2 Pet"], "1John-2John": ["1—2 Jn"], "1John-3John": ["1—3 Jn"], "2John-3John": ["2—3 Jn"], "1Macc-2Macc": ["1—2 Macc"], "1Macc-3Macc": ["1—3 Macc"], "1Macc-4Macc": ["1—4 Macc"], "2Macc-3Macc": ["2—3 Macc"], "2Macc-4Macc": ["2—4 Macc"], "3Macc-4Macc": ["3—4 Macc"], "1Esd-2Esd": ["1—2 Esd"],
				// Sequences
				"1Sam,2Sam": ["1 and 2 Sam"], "1Kgs,2Kgs": ["1 and 2 Kgs"], "1Chr,2Chr": ["1 and 2 Chr"], "1Cor,2Cor": ["1 and 2 Cor"], "1Thess,2Thess": ["1 and 2 Thes"], "1Tim,2Tim": ["1 and 2 Tim"], "1Pet,2Pet": ["1 and 2 Pet"], "1John,2John": ["1 and 2 Jn"], "1John,2John,3John": ["1, 2, and 3 Jn"], "1John,3John": ["1 and 3 Jn"], "2John,3John": ["2 and 3 Jn"], "1Macc,2Macc": ["1 and 2 Macc"], "1Macc,2Macc,3Macc": ["1, 2, and 3 Macc"], "1Macc,2Macc,3Macc,4Macc": ["1, 2, 3, and 4 Macc"], "1Macc,3Macc": ["1 and 3 Macc"], "1Macc,3Macc,4Macc": ["1, 3, and 4 Macc"], "1Macc,4Macc": ["1 and 4 Macc"], "2Macc,3Macc": ["2 and 3 Macc"], "2Macc,3Macc,4Macc": ["2, 3, and 4 Macc"], "2Macc,4Macc": ["2 and 4 Macc"], "3Macc,4Macc": ["3 and 4 Macc"], "1Esd,2Esd": ["1 and 2 Esd"]
			}
		},
		// This format is based on the ESV Study Bible (2008). Some DC books are from the ESV Apocrypha (http://www.cph.org/pdf/012065.pdf).
		"esv-long": {
			options: {
				",": "; ",
				"b,c": "; $chapters ",
				"b,v": "; $b ",
				"c,v": "; $c:",
				"v,c": "; $chapters ",
				"v,cv": "; ",
				"v,v": ", ",
				"$chapters": ["ch.", "chs."],
				"$verses": ["v.", "vv."],
				"singleChapterFormat": "b",
				",b": "; ",
				",c": "; ",
				"-": "—",
				"b-c": "—$chapters ",
				"b-v": "—$b ",
				"c-v": "—$c:",
				"v-c": "—$chapters ",
				"v-cv": "—",
				"v-v": "–",
				"^c": "$chapters ",
				"b1^v": "$verses ",
				"^v": "$verses "
			},
			books: {
				"Gen": ["Genesis"], "Exod": ["Exodus"], "Lev": ["Leviticus"], "Num": ["Numbers"], "Deut": ["Deuteronomy"], "Josh": ["Joshua"], "Judg": ["Judges"], "Ruth": ["Ruth"], "1Sam": ["1 Samuel"], "2Sam": ["2 Samuel"], "1Kgs": ["1 Kings"], "2Kgs": ["2 Kings"], "1Chr": ["1 Chronicles"], "2Chr": ["2 Chronicles"], "Ezra": ["Ezra"], "Neh": ["Nehemiah"], "Esth": ["Esther"], "Job": ["Job"], "Ps": ["Psalm", "Psalms"], "Prov": ["Proverbs"], "Eccl": ["Ecclesiastes"], "Song": ["Song of Solomon"], "Isa": ["Isaiah"], "Jer": ["Jeremiah"], "Lam": ["Lamentations"], "Ezek": ["Ezekiel"], "Dan": ["Daniel"], "Hos": ["Hosea"], "Joel": ["Joel"], "Amos": ["Amos"], "Obad": ["Obadiah"], "Jonah": ["Jonah"], "Mic": ["Micah"], "Nah": ["Nahum"], "Hab": ["Habakkuk"], "Zeph": ["Zephaniah"], "Hag": ["Haggai"], "Zech": ["Zechariah"], "Mal": ["Malachi"], "Matt": ["Matthew"], "Mark": ["Mark"], "Luke": ["Luke"], "John": ["John"], "Acts": ["Acts"], "Rom": ["Romans"], "1Cor": ["1 Corinthians"], "2Cor": ["2 Corinthians"], "Gal": ["Galatians"], "Eph": ["Ephesians"], "Phil": ["Philippians"], "Col": ["Colossians"], "1Thess": ["1 Thessalonians"], "2Thess": ["2 Thessalonians"], "1Tim": ["1 Timothy"], "2Tim": ["2 Timothy"], "Titus": ["Titus"], "Phlm": ["Philemon"], "Heb": ["Hebrews"], "Jas": ["James"], "1Pet": ["1 Peter"], "2Pet": ["2 Peter"], "1John": ["1 John"], "2John": ["2 John"], "3John": ["3 John"], "Jude": ["Jude"], "Rev": ["Revelation"], "Tob": ["Tobit"], "Jdt": ["Judith"], "GkEsth": ["Greek Esther"], "EsthGr": ["Greek Esther"], "AddEsth": ["Additions to Esther"], "Wis": ["Wisdom of Solomon"], "Sir": ["Sirach"], "Bar": ["Baruch"], "EpJer": ["Epistle of Jeremiah"], "DanGr": ["Greek Daniel"], "SgThree": ["Song of the Three Jews"], "PrAzar": ["Prayer of Azariah"], "Sus": ["Susanna"], "Bel": ["Bel and the Dragon"], "1Macc": ["1 Maccabees"], "2Macc": ["2 Maccabees"], "3Macc": ["3 Maccabees"], "4Macc": ["4 Maccabees"], "PrMan": ["Prayer of Manasseh"], "1Esd": ["1 Esdras"], "2Esd": ["2 Esdras"], "Ps151": ["Psalm 151"], "AddPs": ["Psalm 151"],
				// Psalms
				"Ps.$chapters": ["Psalm", "Psalms"],
				// Ranges
				"1Sam-2Sam": ["1—2 Samuel"], "1Kgs-2Kgs": ["1—2 Kings"], "1Chr-2Chr": ["1—2 Chronicles"], "1Cor-2Cor": ["1—2 Corinthians"], "1Thess-2Thess": ["1—2 Thessalonians"], "1Tim-2Tim": ["1—2 Timothy"], "1Pet-2Pet": ["1—2 Peter"], "1John-2John": ["1—2 John"], "1John-3John": ["1—3 John"], "2John-3John": ["2—3 John"], "1Macc-2Macc": ["1—2 Maccabees"], "1Macc-3Macc": ["1—3 Maccabees"], "1Macc-4Macc": ["1—4 Maccabees"], "2Macc-3Macc": ["2—3 Maccabees"], "2Macc-4Macc": ["2—4 Maccabees"], "3Macc-4Macc": ["3—4 Maccabees"], "1Esd-2Esd": ["1—2 Esdras"],
				// Sequences
				"1Sam,2Sam": ["1 and 2 Samuel"], "1Kgs,2Kgs": ["1 and 2 Kings"], "1Chr,2Chr": ["1 and 2 Chronicles"], "1Cor,2Cor": ["1 and 2 Corinthians"], "1Thess,2Thess": ["1 and 2 Thessalonians"], "1Tim,2Tim": ["1 and 2 Timothy"], "1Pet,2Pet": ["1 and 2 Peter"], "1John,2John": ["1 and 2 John"], "1John,3John": ["1 and 3 John"], "2John,3John": ["2 and 3 John"], "1Macc,2Macc": ["1 and 2 Maccabees"], "1Macc,2Macc,3Macc": ["1, 2, and 3 Maccabees"], "1Macc,2Macc,3Macc,4Macc": ["1, 2, 3, and 4 Maccabees"], "1Macc,3Macc": ["1 and 3 Maccabees"], "1Macc,3Macc,4Macc": ["1, 3, and 4 Maccabees"], "1Macc,4Macc": ["1 and 4 Maccabees"], "2Macc,3Macc": ["2 and 3 Maccabees"], "2Macc,3Macc,4Macc": ["2, 3, and 4 Maccabees"], "2Macc,4Macc": ["2 and 4 Maccabees"], "3Macc,4Macc": ["3 and 4 Maccabees"], "1Esd,2Esd": ["1 and 2 Esdras"]
			}
		},
		"esv-short": {
			options: {
				",": "; ",
				"b,c": "; $chapters ",
				"b,v": "; $b ",
				"c,v": "; $c:",
				"v,c": "; $chapters ",
				"v,cv": "; ",
				"v,v": ", ",
				"$chapters": ["ch.", "chs."],
				"$verses": ["v.", "vv."],
				"singleChapterFormat": "b",
				",b": "; ",
				",c": "; ",
				"-": "—",
				"b-c": "—$chapters ",
				"b-v": "—$b ",
				"c-v": "—$c:",
				"v-c": "—$chapters ",
				"v-cv": "—",
				"v-v": "–",
				"^c": "$chapters ",
				"b1^v": "$verses ",
				"^v": "$verses "
			},
			books: {
				"Gen": ["Gen."], "Exod": ["Ex."], "Lev": ["Lev."], "Num": ["Num."], "Deut": ["Deut."], "Josh": ["Josh."], "Judg": ["Judg."], "Ruth": ["Ruth"], "1Sam": ["1 Sam."], "2Sam": ["2 Sam."], "1Kgs": ["1 Kings"], "2Kgs": ["2 Kings"], "1Chr": ["1 Chron."], "2Chr": ["2 Chron."], "Ezra": ["Ezra"], "Neh": ["Neh."], "Esth": ["Est."], "Job": ["Job"], "Ps": ["Ps.", "Pss."], "Prov": ["Prov."], "Eccl": ["Eccles."], "Song": ["Song"], "Isa": ["Isa."], "Jer": ["Jer."], "Lam": ["Lam."], "Ezek": ["Ezek."], "Dan": ["Dan."], "Hos": ["Hos."], "Joel": ["Joel"], "Amos": ["Amos"], "Obad": ["Obad."], "Jonah": ["Jonah"], "Mic": ["Mic."], "Nah": ["Nah."], "Hab": ["Hab."], "Zeph": ["Zeph."], "Hag": ["Hag."], "Zech": ["Zech."], "Mal": ["Mal."], "Matt": ["Matt."], "Mark": ["Mark"], "Luke": ["Luke"], "John": ["John"], "Acts": ["Acts"], "Rom": ["Rom."], "1Cor": ["1 Cor."], "2Cor": ["2 Cor."], "Gal": ["Gal."], "Eph": ["Eph."], "Phil": ["Phil."], "Col": ["Col."], "1Thess": ["1 Thess."], "2Thess": ["2 Thess."], "1Tim": ["1 Tim."], "2Tim": ["2 Tim."], "Titus": ["Titus"], "Phlm": ["Philem."], "Heb": ["Heb."], "Jas": ["James"], "1Pet": ["1 Pet."], "2Pet": ["2 Pet."], "1John": ["1 John"], "2John": ["2 John"], "3John": ["3 John"], "Jude": ["Jude"], "Rev": ["Rev."], "Tob": ["Tob."], "Jdt": ["Jdt."], "GkEsth": ["Gr. Est."], "EsthGr": ["Gr. Est."], "AddEsth": ["Add. Est."], "Wis": ["Wisd. Sol."], "Sir": ["Sir."], "Bar": ["Bar."], "EpJer": ["Ep. Jer."], "DanGr": ["Gr. Dan."], "SgThree": ["Song of the Three Jews"], "PrAzar": ["Pr. Azar."], "Sus": ["Sus."], "Bel": ["Bel and Dragon"], "1Macc": ["1 Macc."], "2Macc": ["2 Macc."], "3Macc": ["3 Macc."], "4Macc": ["4 Macc."], "PrMan": ["Pr. Man."], "1Esd": ["1 Esd."], "2Esd": ["2 Esd."], "Ps151": ["Ps. 151"], "AddPs": ["Ps. 151"],
				// Psalms
				"Ps.$chapters": ["Ps.", "Pss."],
				// Ranges
				"1Sam-2Sam": ["1—2 Sam."], "1Kgs-2Kgs": ["1—2 Kings"], "1Chr-2Chr": ["1—2 Chron."], "1Cor-2Cor": ["1—2 Cor."], "1Thess-2Thess": ["1—2 Thess."], "1Tim-2Tim": ["1—2 Tim."], "1Pet-2Pet": ["1—2 Pet."], "1John-2John": ["1—2 John"], "1John-3John": ["1—3 John"], "2John-3John": ["2—3 John"], "1Macc-2Macc": ["1—2 Macc."], "1Macc-3Macc": ["1—3 Macc."], "1Macc-4Macc": ["1—4 Macc."], "2Macc-3Macc": ["2—3 Macc."], "2Macc-4Macc": ["2—4 Macc."], "3Macc-4Macc": ["3—4 Macc."], "1Esd-2Esd": ["1—2 Esd."],
				// Sequences
				"1Sam,2Sam": ["1 and 2 Sam."], "1Kgs,2Kgs": ["1 and 2 Kings"], "1Chr,2Chr": ["1 and 2 Chron."], "1Cor,2Cor": ["1 and 2 Cor."], "1Thess,2Thess": ["1 and 2 Thess."], "1Tim,2Tim": ["1 and 2 Tim."], "1Pet,2Pet": ["1 and 2 Pet."], "1John,2John": ["1 and 2 John"], "1John,2John,3John": ["1, 2, and 3 John"], "1John,3John": ["1 and 3 John"], "2John,3John": ["2 and 3 John"], "1Macc,2Macc": ["1 and 2 Macc."], "1Macc,2Macc,3Macc": ["1, 2, and 3 Macc."], "1Macc,2Macc,3Macc,4Macc": ["1, 2, 3, and 4 Macc."], "1Macc,3Macc": ["1 and 3 Macc."], "1Macc,3Macc,4Macc": ["1, 3, and 4 Macc."], "1Macc,4Macc": ["1 and 4 Macc."], "2Macc,3Macc": ["2 and 3 Macc."], "2Macc,3Macc,4Macc": ["2, 3, and 4 Macc."], "2Macc,4Macc": ["2 and 4 Macc."], "3Macc,4Macc": ["3 and 4 Macc."], "1Esd,2Esd": ["1 and 2 Esd."]
			}
		}
	});

	function formatOsis(style, osis, context) {
		if (style !== currentStyle) {
			setStyle(style);
		}
		return osisFormatter.format(osis, context);
	}

	function setStyle(style) {
		if (typeof styles[style] === "undefined") {
			throw "Unknown style: " + style + ". Please choose: " + Object.keys(styles).join(", ");
		}
		osisFormatter.setBooks(styles[style].books);
		osisFormatter.setOptions(styles[style].options);
		currentStyle = style;
	}

	module.exports = formatOsis;


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	function getDefaults() {
		return {
			"b": "$b",
			"c": "$c",
			"v": "$v",
			"-": "-",
			",": ", ",
			".": " ",
			"c.v": ":",
			"$chapters": ["ch", "chs"],
			"$verses": ["v", "vv"],

			"singleChapterFormat": "bv", // or `b` or `bcv`
			"singleChapterBooks": ["Obad", "Phlm", "2John", "3John", "Jude", "PrAzar", "SgThree", "Sus", "Bel", "EpJer", "PrMan", "Ps151", "AddPs"],

			"Ps151Format": "bc", // or `b`
			"maxPs": 150
		};
	}

	function OsisFormatter() {
		// Some subset of "Matt.1.2-Mark.3.4"
		var osisFormat = /^[1-5A-Za-z]{2,}(?:\.\d{1,3}(?:\.\d{1,3})?)?(?:-[1-5A-Za-z]{2,}(?:\.\d{1,3}(?:\.\d{1,3})?)?)?$/;

		var books = {};
		var options = getDefaults();

		// Convert an OSIS string, and an optional OSIS context, to human-readable form. Aim for the shortest understandable string: `Matt.1-Matt.2` might become `Matthew 1-2`.
		function format(osisString, osisContext) {
			if (typeof osisString !== "string") {
				throw "OsisFormatter.format(): first argument must be a string.";
			}
			// Create a context object, using the supplied context (if available).
			var context = setContext(osisContext);
			// Separate the supplied OSISes into individual OSIS references.
			var osises = osisString.split(",");
			var tokens = [];
			while (osises.length > 0) {
				// Make sure we're dealing with a valid OSIS string. It throws an exception if there's a problem.
				var _osis = normalizeOsis(osises.shift());
				// Tokenize the OSIS string.
				tokens.push(osisToToken(_osis, context));
				// Add a separator token if there are more OSIS strings to tokenize. We don't want to add it at the end of the loop, which is why we use `while (true)` at the top.
				if (osises.length > 0) {
					tokens.push({
						osis: ",",
						type: ",",
						parts: [],
						laters: []
					});
				}
			}
			return formatTokens(tokens);
		}

		// Format an array of tokens in a sequence.
		function formatTokens(tokens) {
			// Calculate data that we may need about future tokens in the sequence.
			tokens = annotateTokens(tokens);
			var out = [];
			// First iterate over each token.
			while (tokens.length > 0) {
				var token = tokens.shift();
				if (typeof token.bookSequence !== "undefined") {
					out.push(formatBookSequence(token, tokens));
				} else {
					out.push(formatToken(token));
				}
			}
			return out.join("");
		}

		// If given a sequence like `1John,2John`, we may want to turn that into `1 and 2 John`.
		function formatBookSequence(token, tokens) {
			// Really, we've already checked this, but we'll make Flow happy at the cost of losing 100% code coverage because the following `if` statement is never false. Most of the time the `while` loop won't return, so we still drop down to `formatToken()`.
			var sequenceArray = token.bookSequence;
			if (typeof sequenceArray !== "undefined") {
				// The `sequenceArray` includes the current token. If `length === 1`, then the only item left in the array is the current token, which we pass to `formatToken()`.
				while (sequenceArray.length > 1) {
					// Look for a comma-joined sequence in `books`.
					var _bookSequence = sequenceArray.join(",");
					if (typeof books[_bookSequence] !== "undefined" && typeof books[_bookSequence][0] === "string") {
						// First remove future tokens that we've already taken care of in this sequence.
						removeBookSequenceTokens(sequenceArray.length, tokens);
						// And then return the desired book string.
						return books[_bookSequence][0];
					}
					sequenceArray.pop();
				}
			}
			// Otherwise, there was no match, so handle the token as usual.
			return formatToken(token);
		}

		// Remove the number of items in the sequence. Let's say there are three items: `["1John", "2John", "3John"]`. `1John` is the current token, which is already gone from the array. That means we need to hop ahead two books, or `3 - 1`, to prevent us from stringifying the token again.
		function removeBookSequenceTokens(numberToRemove, tokens) {
			while (numberToRemove > 1) {
				// Just remove sequence tokens (`type: ","`); we don't need them.
				tokens.shift();
				// Next is the `b` token we want to remove.
				tokens.shift();
				numberToRemove--;
			}
		}

		// Format a single token.
		function formatToken(token) {
			// First check to see if we have a book range to handle specially (`1John-2John` might become `1-2 John`).
			if (typeof token.bookRange === "string" && typeof books[token.bookRange] !== "undefined" && typeof books[token.bookRange][0] === "string") {
				return books[token.bookRange][0];
			}

			// Most of the time, iterate over its `parts` to build the output string.
			var out = [];
			for (var i = 0, max = token.parts.length; i < max; i++) {
				out.push(formatPart(token, token.parts[i]));
			}
			return out.join("");
		}

		// Format a `part` in a `token.parts`.
		function formatPart(token, part) {
			var prefix = "";
			switch (part.type) {
				case "c":
				case "v":
					// If we specify a specific format for this `subType`, then calculate the value to prepend to the final output. For example, `^v` when a verse appears first in a string (when `format()` has a `context`) might want a `vv. ` prefix.
					if (part.subType !== "" && typeof options[part.subType] !== "undefined") {
						prefix = formatVariable(part.subType, part, token);
					}
				// Fall through to `b`, which uses the same logic.
				case "b":
					return prefix + formatVariable(part.type, part, token);
				// Punctuation tokens all use the same logic. They never have prefixes because they can never appear first in a string.
				case ".":
				case "-":
				case ",":
				// Falls through. `default` is only here to satisfy code coverage. There are no other cases.
				default:
					return formatVariable(getBestOption(part.type, part.subType), part, token);
			}
		}

		// `options` can contain partial matches: `bc-bc`, `bc-b`, `c-bc`, `c-b`, `-bc`, `-b`, and `-` all match a `bc-bc` string. Take the best match that exists in options.
		function getBestOption(splitChar, option) {
			var _option$split = option.split(splitChar);

			var _option$split2 = _slicedToArray(_option$split, 2);

			var pre = _option$split2[0];
			var post = _option$split2[1];

			var postChars = post;
			// Start by matching the full string. Progressively remove ending possibilities and then beginning possibilities. For `bc-bc`, it tries to find options in the following order, knowing that the last one, the `splitChar` on its own, will always match: `bc-bc`, `bc-b`, `c-bc`, `c-b`, `-bc`, `-` 
			for (var i = 0, length = pre.length; i <= length; i++) {
				post = postChars;
				while (post.length > 0) {
					if (typeof options["" + pre + splitChar + post] === "string") {
						return "" + pre + splitChar + post;
					}
					// Remove the last character so that we match characters closer to `splitChar` (in `-bcv`, the `v` is the least-important part).
					post = post.substr(0, post.length - 1);
				}
				pre = pre.substr(1);
			}
			return splitChar;
		}

		// Some values can have variables indicated by a `$`. Replace them if we can.
		function formatVariable(optionsKey, part, token) {
			var pattern = options[optionsKey];
			// We can short-circuit all this logic if there are no `$`.
			if (pattern.indexOf("$") === -1) {
				return pattern;
			}
			// Replace `$chapters` with a literal value like `ch.` or `chs.` It's a RegExp rather than a string to allow the `/g` flag.
			pattern = pattern.replace(/\$chapters/g, function () {
				// If `books` defines a string to use (e.g., with `Ps.$chapters`, maybe you want "Ps. 3" rather than "ch. 3"), use that instead.
				var arrayToUse = typeof books[part.b + ".$chapters"] === "undefined" ? options.$chapters : books[part.b + ".$chapters"];
				// Only retun the plural if there's a plural variant to use and there are later chapters.
				if (arrayToUse.length > 1 && multipleChaptersPosition(part, token) > 0) {
					return arrayToUse[1];
				}
				return arrayToUse[0];
			});
			// It's a RegExp rather than a string to allow the `/g` flag.
			pattern = pattern.replace(/\$verses/g, function () {
				// Unlike `$chapters`, `$verses` doesn't require a check inside `books` since `Ps.1.2-Ps.1.3` is going to be `vv. 2-3`.
				if (options.$verses.length > 1 && hasMultipleVerses(part, token) === true) {
					return options.$verses[1];
				}
				return options.$verses[0];
			});
			pattern = pattern.replace(/\$b/g, function () {
				// We know that `part.b` exists in `books` because it would have already thrown an exception in `osisWithContext` or `setContext`.
				var maxPosition = books[part.b].length - 1;
				// If there's only one possible book name, use that.
				if (maxPosition === 0) {
					return books[part.b][0];
				}
				// Otherwise, calculate the one that we prefer to use. [0] = singular; [1] = plural; [2] = book on its own.
				var preferredPosition = multipleChaptersPosition(part, token);
				if (preferredPosition > maxPosition) {
					return books[part.b][maxPosition];
				}
				return books[part.b][preferredPosition];
			});
			// Don't accidentally insert `undefined` into a string.
			pattern = pattern.replace(/\$c/g, typeof part.c === "string" ? part.c : "");
			pattern = pattern.replace(/\$v/g, typeof part.v === "string" ? part.v : "");
			return pattern;
		}

		// If a range or sequence has multiple chapters, we may want to change the output: `chapters 1-2` rather than `chapter 1-2`, for example. The return value is 0-2, indicating which `books[osis][]` is preferred.
		function multipleChaptersPosition(part, token) {
			// If we're looking at a whole book and there are multiple chapters in the book, we know there are multiple chapters.
			if (token.type === "b" && !isSingleChapterBook(part.b)) {
				// It's a book on its own, so prefer the full-book abbreviation if available.
				return 2;
			}
			// If we're currently looking at a chapter, include it in our calculations.
			var later = part.type === "c" ? "c" : "";
			// All the part types until the next book.
			later += part.laters.join("") + "," + token.laters.join(",");
			// A chapter range always has multiple chapters.
			if (later.indexOf("-c") >= 0) {
				return 1;
			}
			// An unusual situation, a Psalms range into another book (e.g., `Ps.149-Prov.1` or `Ps.150-Prov.1`). In the first case, we want to use the plural; in the second, we want to use the singular. `later` only has a `-b` if it's in the current `part`--`token.laters` ends before it reaches the next book in a sequence.
			if (part.b === "Ps" && later.indexOf("-b") >= 0) {
				// Find the chapter number.
				for (var i = 0, max = token.parts.length; i < max; i++) {
					var otherPart = token.parts[i];
					if (otherPart.type === "c") {
						// If it's less than the number of Psalms, we know that more than one chapter is involved.
						if (parseInt(otherPart.c, 10) < options.maxPs) {
							return 1;
						}
						// Once we've looked at the chapter, we don't need to look any further. We know this situation doesn't apply.
						break;
					}
				}
				return 0;
			}
			// If there are two or more chapter instances in a sequence, we know there are multiple chapters. "cc" = "", "", ""
			if (later.split("c").length > 2) {
				return 1;
			}
			return 0;
		}

		// Possibly handle `verse 1` and `verses 1-2` differently.
		function hasMultipleVerses(part, token) {
			// If we're currently looking at a verse, include it in our calculations.
			var later = part.type === "v" ? "v" : "";
			later += part.laters.join("") + "," + token.laters.join(",");
			// We only care about the current chapter.

			var _later$split = later.split("c");

			var _later$split2 = _slicedToArray(_later$split, 1);

			var thisChapter = _later$split2[0];
			// If there's a range, we know there are multiple verses.

			if (thisChapter.indexOf("-") >= 0) {
				return true;
			}
			// "vv" = "", "", ""
			if (thisChapter.split("v").length > 2) {
				return true;
			}
			return false;
		}

		// Add data we'll use later to construct the final output.
		function annotateTokens(tokens) {
			var out = [];
			// We only need `prevToken` in a sequence, which is never first, so it's OK that this value is wrong on the first loop run.
			var prevToken = tokens[0];
			var i = 0;
			while (tokens.length > 0) {
				var token = tokens.shift();
				// Never first.
				if (token.type === ",") {
					annotateSequenceToken(token, prevToken, tokens);
				} else {
					annotateToken(token, tokens, i);
				}
				// Add future context.
				annotateTokenLaters(token, tokens);
				annotateTokenParts(token.parts);
				out.push(token);
				prevToken = token;
				i++;
			}
			return out;
		}

		// Add data to a single token that we can't derive elsewehre.
		function annotateToken(token, tokens, i) {
			// The first `part.type` could be `c` or `v` if `format()` is provided a start context.
			if (i === 0 && token.parts[0].type !== "b") {
				// `c` or `v` or `cv`
				var _token$type$split = token.type.split("-");

				var _token$type$split2 = _slicedToArray(_token$type$split, 1);

				var pre = _token$type$split2[0];

				var prefix = "";
				// Note that we're dealing with a single-chapter book in case we want to handle it differently.
				if (isSingleChapterBook(token.parts[0].b)) {
					prefix = "b1";
				}
				// Set the `subType` (`c` and `v` don't normally have a `subType`) for later use.
				token.parts[0].subType = prefix + "^" + pre;
			}
		}

		// Create a sequence `token.parts` with the keys we'll need later.
		function annotateSequenceToken(token, prevToken, tokens) {
			var prevPart = prevToken.parts[prevToken.parts.length - 1];
			// If preceded or followed by a range, only use the parts closest to the sequence token: `bcv-cv,bc-v` returns the subType `cv,bc`.
			var prevTypes = prevToken.type.split("-");
			var nextTypes = tokens[0].type.split("-");
			token.parts = [{
				type: ",",
				// Indicates the preceding and following token types so that we can join different types differently if we want.
				subType: prevTypes.pop() + "," + nextTypes[0],
				b: prevPart.b,
				c: prevPart.c,
				v: prevPart.v,
				laters: []
			}];
		}

		// Fill in the `laters` array for each token.
		function annotateTokenLaters(token, tokens) {
			var currentType = token.type;
			var bookSequence = [];
			// If we have a `b` sequence, we want to continue past when we would normally stop.
			var keepCheckingBooks = false;
			// But we still want to stop adding `token.laters`.
			var latersDone = false;
			if (currentType === "b") {
				bookSequence.push(token.parts[0].b);
				keepCheckingBooks = true;
			}

			for (var i = 0, max = tokens.length; i < max; i++) {
				var laterToken = tokens[i];
				var laterType = laterToken.type;
				// Doing it this way avoids possible leading and trailing `,`.
				if (laterType === ",") {
					continue;
				}
				// If we're still in a `b` sequence, keep going.
				if (keepCheckingBooks === true) {
					if (laterType === "b") {
						bookSequence.push(laterToken.parts[0].b);
					} else {
						keepCheckingBooks = false;
					}
				}
				// Stop here if we've already encountered a book and don't need to go further.
				if (latersDone === true) {
					continue;
				}
				// Only go as far as the next book.
				if (laterType.indexOf("b") >= 0) {
					var _laterType$split = laterType.split("b");

					var _laterType$split2 = _slicedToArray(_laterType$split, 1);

					var pre = _laterType$split2[0];
					// Only add it to the array if there's something to add. We don't care about empty strings.

					if (pre.length > 0) {
						token.laters.push(pre);
					}
					if (keepCheckingBooks === false) {
						break;
					}
					latersDone = true;
					// If there's not a book in `laterType`, then we know we need to keep looking until we find one or reach the end of the array.
				} else {
					token.laters.push(laterType);
				}
			}
			if (bookSequence.length > 1) {
				token.bookSequence = bookSequence;
			}
		}

		// Add `laters` to each `token.parts`.
		function annotateTokenParts(parts) {
			var laters = [];
			var max = parts.length;
			// First we need to know what all the `laters` are.
			for (var i = 0; i < max; i++) {
				laters.push(parts[i].type);
			}
			// Then we can add them to each `part`.
			for (var _i = 0; _i < max; _i++) {
				// The first element is the current type.
				laters.shift();
				// Create a copy rather than a reference and remove spacing parts (`.`).
				parts[_i].laters = laters.filter(function (value) {
					return value !== ".";
				});
			}
		}

		// Convert an OSIS string to a single token.
		function osisToToken(osis, context) {
			// `end` may be undefined.
			var _osis$split = osis.split("-");

			var _osis$split2 = _slicedToArray(_osis$split, 2);

			var start = _osis$split2[0];
			var end = _osis$split2[1];

			var startToken = osisWithContext(start, context);
			// If there's  no `end`, we don't need to do any further processing. `startToken` is itself a complete token.
			if (end === undefined) {
				return startToken;
			}
			var endToken = osisWithContext(end, context);
			// Construct a unified set of `parts`, including the range.
			var parts = startToken.parts;
			parts.push(makeRangePart(startToken, endToken));

			var token = {
				osis: osis,
				type: startToken.type + "-" + endToken.type,
				// Add the end `parts` to the array.
				parts: parts.concat(endToken.parts),
				laters: []
			};
			// We may want to handle certain book-only ranges differently (`1John-2John` might be `1-2 John`).
			if (token.type === "b-b") {
				token.bookRange = startToken.parts[0].b + "-" + endToken.parts[0].b;
			}
			return token;
		}

		// Construct a range token with data from one preceding and following token.
		function makeRangePart(startToken, endToken) {
			var prevPart = startToken.parts[startToken.parts.length - 1];
			var range = {
				type: "-",
				// We may need to know what kind of objects it's joining.
				subType: startToken.type + "-" + endToken.type,
				b: prevPart.b,
				laters: []
			};
			// Only add these if they exist in the previous part. These values reflect the current context, not the future context.
			if (typeof prevPart.c !== "undefined") {
				range.c = prevPart.c;
			}
			if (typeof prevPart.v !== "undefined") {
				range.v = prevPart.v;
			}
			return range;
		}

		// Tokenize a non-range OSIS string, taking context into account. The goal is to omit needless parts: if your context is `Matt.1` and the current OSIS is `Matt.2`, we can omit the book from the return token.
		function osisWithContext(osis, context) {
			// `c` and `v` may be undefined. `c` always exists if `v` does.
			var _osis$split3 = osis.split(".");

			var _osis$split4 = _slicedToArray(_osis$split3, 3);

			var b = _osis$split4[0];
			var c = _osis$split4[1];
			var v = _osis$split4[2];
			// Don't try to guess if we encounter an unexpected book.

			if (typeof books[b] === "undefined") {
				throw "Unknown OSIS book: \"" + b + "\" (" + osis + ")\"";
			}
			var out = {
				osis: osis,
				type: "",
				parts: [],
				laters: []
			};
			var isSingleChapter = isSingleChapterBook(b);
			// If there's an end verse, if we've set the relevant option to `bv` rather than `bcv`, and if the book only has one chapter, then we want to omit the chapter: `Phlm.1.1` = `Philemon 1`.
			var omitChapter = isSingleChapter && typeof v === "string" && (options.singleChapterFormat === "bv" || options.singleChapterFormat === "b");
			// Returns true if there's a chapter. It modifies `out` in-place.
			if (osisBookWithContext(b, c, v, isSingleChapter, omitChapter, context, out) === false) {
				return out;
			}
			// Returns true if there's a verse. It modifies `out` in-place.
			if (osisChapterWithContext(b, c, v, omitChapter, context, out) === false) {
				return out;
			}
			// We know there's a verse.
			out.type += "v";
			out.parts.push({
				type: "v",
				subType: "",
				b: b,
				c: c,
				v: v,
				laters: []
			});
			context.v = parseInt(v, 10);
			return out;
		}

		// Handle a "book" part.
		function osisBookWithContext(b, c, v, isSingleChapter, omitChapter, context, out) {
			// If we're looking at something like `Phlm-Phlm.1` or `Matt-Phlm.1`, we may want to treat `Phlm.1` as a book rather than include a chapter. This is unusual.
			if (v === undefined && isSingleChapter === true && options.singleChapterFormat === "b") {
				context.b = b, context.c = 0, context.v = 0;
				out.type = "b";
				out.parts.push({
					type: "b",
					subType: "",
					b: b,
					laters: []
				});
				return false;
			}

			// Gen.1,Exod = "Exod" || Gen.1,Gen = "Gen"
			if (b !== context.b || c === undefined) {
				// Do it this way to keep the reference to the original object.
				context.b = b, context.c = 0, context.v = 0;
				out.parts.push({
					type: "b",
					subType: "",
					b: b,
					laters: []
				});
				out.type = "b";
				// There's no chapter, so we don't need to continue.
				if (c === undefined) {
					return false;
				}
				// In general, the `subType` will be `b.c`.
				var _subType = "b.c";
				// If we want to omit the chapter reference in a single-chapter book.
				if (omitChapter === true) {
					_subType = "b.v";
					// It's a single-chapter book, but there's no end verse.
				} else if (isSingleChapter === true) {
					// `b1` means a single-chapter book.
					_subType = "b1.c";
				}
				// We know there's a chapter, so insert the joiner.
				out.parts.push({
					type: ".",
					subType: _subType,
					b: b,
					laters: []
				});
			}
			// Otherwise, we know that it's the same book as in `context` and there's a chapter.
			return true;
		}

		// Handle a "chapter" part.
		function osisChapterWithContext(b, c, v, omitChapter, context, out) {
			// We already know that the context book and current book are the same.
			if (parseInt(c, 10) !== context.c || v === undefined) {
				// We need to set `context.v` because we don't know that `osisBookWithContext()` reset it.
				context.c = parseInt(c, 10), context.v = 0;
				// If only `Phlm.1`, we want to include the chapter if `options.singleChapterFormat === "bv"`, but omit the chapter if it's `=== "b"`. `omitChapter` is always `false` when `v === undefined`.
				if (omitChapter === false) {
					out.parts.push({
						type: "c",
						subType: "",
						b: b,
						c: c,
						laters: []
					});
					out.type += "c";
					// There's no verse, so we don't need any further processing.
					if (v === undefined) {
						return false;
					}
					// We know there's a verse, so insert the joiner.
					out.parts.push({
						type: ".",
						subType: "c.v",
						b: b,
						laters: []
					});
				}
			}
			// Otherwise, we know that it's the same book and chapter as in `context` and that there's a verse.
			return true;
		}

		// Only checks if the book is in an array in `options`.
		function isSingleChapterBook(b) {
			return options.singleChapterBooks.indexOf(b) >= 0;
		}

		// Confirm that the string matches the expected format of an OSIS string. Throw an exception if not. Also handle Ps151 quirks.
		function normalizeOsis(osis) {
			if (osisFormat.test(osis) === false) {
				throw "Invalid osis format: '" + osis + "'";
			}
			// If we want to treat Ps151 as just another Psalm (so `Ps151.1.2` might output `Psalm 151:2`).
			if (options.Ps151Format === "bc") {
				// Remove the chapter and treat it as `Ps.151`.
				osis = osis.replace(/(?:Ps151|AddPs)(?:\.\d+\b)?/g, "Ps.151");
			}
			return osis;
		}

		// Given an optional string context, create a `context` obect.
		function setContext(osis) {
			// We always only want these three keys. Flow doesn't like calling `Object.seal`, however.
			var out = {
				b: "",
				c: 0,
				v: 0
			};
			// There's no provided context.
			if (osis == null) {
				return out;
			}
			// Don't allow sequences.
			osis = normalizeOsis(osis);
			// Use the end value of the range if there is one.
			if (osis.indexOf("-") >= 0) {
				var _osis$split5 = osis.split("-");

				var _osis$split6 = _slicedToArray(_osis$split5, 2);

				var end = _osis$split6[1];

				return setContext(end);
			}

			var _osis$split7 = osis.split(".");

			var _osis$split8 = _slicedToArray(_osis$split7, 3);

			var b = _osis$split8[0];
			var c = _osis$split8[1];
			var v = _osis$split8[2];

			if (typeof books[b] === "undefined") {
				throw "Unknown OSIS book provided for \"context\": \"" + b + "\" (" + osis + ")\"";
			}
			// `b` always exists.
			out.b = b;
			// `c` and `v` don't necessarily exist. `v` only exists if `c` does.
			if (typeof c === "string") {
				out.c = parseInt(c, 10);
				if (typeof v === "string") {
					out.v = parseInt(v, 10);
				}
			}
			return out;
		}

		// Override any default parameters with user-supplied parameters. Also make sure `userOptions` has all the keys we need. Each call is independent, which means that `userOptions` should contain all the keys to override defaults.
		function setOptions(userOptions) {
			// Reset them to the default.
			options = getDefaults();
			// No need to match properties if there's no argument.
			if (userOptions == null) {
				return;
			}
			// We want to ensure type consistency, so we don't just use `Object.assign`. Flow complains if we just iterate over `Object.keys()`.
			var userKeys = Object.keys(userOptions);
			for (var i = 0, max = userKeys.length; i < max; i++) {
				var key = userKeys[i];
				var defaultType = _typeof(options[key]);
				// If it's not in `defaults`, or if its type matches, set it.
				if (defaultType === "undefined" || _typeof(userOptions[key]) === defaultType) {
					options[key] = userOptions[key];
					// Otherwise, the types don't match.
				} else {
					throw "Invalid type for options[\"" + key + "\"]. It should be \"" + defaultType + "\".";
				}
			}
		}

		// Set valid books and abbreviations. It takes an object where each key is the OSIS book (e.g., `Matt`), and each value is a one- or two-item array. The first item is the book name to use, and the second item is the book name to use for plural cases. For example: `{"Ps": ["Psalm", "Psalms"]}`. You can also use a special key of the type `OSIS.$chapters` (e.g., `Ps.$chapters`), which overrides any chapter abbreviations. For example, `{"Ps": ["Ps.", "Pss."]` could result in `Psalms 1:2, Pss. 3, 4` if given the OSIS `Ps.1.2,Ps.3,Ps.4`.
		function setBooks(userBooks) {
			books = {};
			Object.keys(userBooks).forEach(function (key) {
				var value = userBooks[key];
				if (Array.isArray(value) === false) {
					throw "books[\"" + key + "\"] should be an array: " + Object.prototype.toString.call(value) + ".";
				}
				if (value.length < 1 || value.length > 3) {
					throw "books[\"" + key + "\"] should have exactly 1, 2, or 3 items. ";
				}
				books[key] = value;
			});
		}

		return {
			format: format,
			setOptions: setOptions,
			setBooks: setBooks
		};
	}

	/* global module */
	module.exports = OsisFormatter;


/***/ }
/******/ ]);