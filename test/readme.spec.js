"use strict"
/* global require, describe, it, expect, beforeEach */
const OsisFormatter = require("../es6/osisFormatter")
const paratextToOsis = require("../es6/paratextToOsis")
const osisToEn = require("../es6/en")
const osisToParatext = require("../es6/osisToParatext")

describe("Convert OSIS to English", function() {
	it("should handle the first block", function() {
		expect(osisToEn("niv-long", "Matt.1.2-Matt.1.3,Matt.1.4", "Matt.1")).toEqual("vv. 2–3,4")
		expect(osisToEn("niv-short", "Matt.1.2-Matt.1.3,Matt.1.4", "Matt.1")).toEqual("vv. 2–3,4")
		expect(osisToEn("niv-shortest", "Matt.1.2-Matt.1.3,Matt.1.4", "Matt.1")).toEqual("ver 2-3, 4")
	})

	it("should handle the second block", function() {
		expect(osisToEn("niv-long", "Matt.1.2-Matt.1.3,Matt.1.4")).toEqual("Matthew 1:2–3,4")
		expect(osisToEn("niv-short", "Matt.1.2-Matt.1.3,Matt.1.4")).toEqual("Matt 1:2–3,4")
		expect(osisToEn("niv-shortest", "Matt.1.2-Matt.1.3,Matt.1.4")).toEqual("Mt 1:2-3, 4")
	})
})

describe("Output Format Type", function() {
	it("should handle the table", function() {
		expect(osisToEn("esv-long", "Song")).toEqual("Song of Solomon")
		expect(osisToEn("esv-long", "Phlm")).toEqual("Philemon")
		expect(osisToEn("esv-long", "1John")).toEqual("1 John")

		expect(osisToEn("esv-short", "Song")).toEqual("Song")
		expect(osisToEn("esv-short", "Phlm")).toEqual("Philem.")
		expect(osisToEn("esv-short", "1John")).toEqual("1 John")

		expect(osisToEn("niv-long", "Song")).toEqual("Song of Songs")
		expect(osisToEn("niv-long", "Phlm")).toEqual("Philemon")
		expect(osisToEn("niv-long", "1John")).toEqual("1 John")

		expect(osisToEn("niv-short", "Song")).toEqual("Song")
		expect(osisToEn("niv-short", "Phlm")).toEqual("Phlm")
		expect(osisToEn("niv-short", "1John")).toEqual("1 John")

		expect(osisToEn("niv-shortest", "Song")).toEqual("SS")
		expect(osisToEn("niv-shortest", "Phlm")).toEqual("Phm")
		expect(osisToEn("niv-shortest", "1John")).toEqual("1Jn")

		expect(osisToEn("nlt-long", "Song")).toEqual("Song of Songs")
		expect(osisToEn("nlt-long", "Phlm")).toEqual("Philemon")
		expect(osisToEn("nlt-long", "1John")).toEqual("1 John")

		expect(osisToEn("nlt-short", "Song")).toEqual("Song")
		expect(osisToEn("nlt-short", "Phlm")).toEqual("Phlm")
		expect(osisToEn("nlt-short", "1John")).toEqual("1 Jn")
	})
})

describe("Convert OSIS to Paratext", function() {
	it("should handle the block", function() {
		expect(paratextToOsis("MAT 1:2-3,MAT 1:4")).toEqual("Matt.1.2-Matt.1.3,Matt.1.4")
	})
})

describe("Browser Usage", function() {
	it("should handle OsisFormatter", function() {
		const osisFormatter = new OsisFormatter
		osisFormatter.setBooks({"Phlm":["Phlm"]})
		expect(osisFormatter.format("Phlm.1.2")).toEqual("Phlm 2")
	})

	it("should handle paratextToOsis", function() {
		expect(paratextToOsis("PHM 1:2")).toEqual("Phlm.1.2")
	})

	it("should handle en", function() {
		expect(osisToEn("niv-long", "Phlm.1.2")).toEqual("Philemon 2")
	})

	it("should handle osisToParatext", function() {
		expect(osisToParatext("Phlm.1.2")).toEqual("PHM 1:2")
	})
})

describe("Build Your Own Output Style", function() {
	let formatter = new OsisFormatter()
	beforeEach(function() {
		formatter = new OsisFormatter()
	})

	it("should handle the first block", function() {
		formatter.setBooks({"Ps": ["Psalm", "Psalms"]})
		formatter.setOptions({"c.v": ":", "^v": "$verses "})
		expect(formatter.format("Ps.1.1")).toEqual("Psalm 1:1")
		expect(formatter.format("Ps.2-Ps.3")).toEqual("Psalms 2-3")
		expect(formatter.format("Ps.2.2,Ps.2.3", "Ps.2")).toEqual("vv 2, 3")
	})

	it("should handle `.setBooks()`", function() {
		expect(formatter.setBooks({
			"Ps": ["Ps.", "Pss.", "Psalms"],
			"Gen": ["Gen."]
		})).not.toBeDefined()
		expect(formatter.format("Ps.3-Ps.4")).toEqual("Pss. 3-4")
		expect(formatter.format("Ps.5.6-Ps.7.8")).toEqual("Pss. 5:6-7:8")
		expect(formatter.format("Ps.3,Ps.4")).toEqual("Pss. 3, 4")
		expect(formatter.format("Ps.5.6,Ps.7.8")).toEqual("Pss. 5:6, 7:8")
	})

	it("should handle `.setBooks() Chapters`", function() {
		formatter.setBooks({
			"Ps": ["Ps.", "Pss."],
			"Ps.$chapters": ["Ps.", "Pss."]
		})
		formatter.setOptions({
			"^c": "$chapters "
		})

		expect(formatter.format("Ps.1", "Ps")).toEqual("Ps. 1")
		expect(formatter.format("Ps.1-Ps.2", "Ps")).toEqual("Pss. 1-2")
	})

	it("should handle `.setBooks() Special Ranges and Sequences`", function() {
		formatter.setBooks({
			"1Kgs": ["1 Kings"],
			"2Kgs": ["2 Kings"],
			"1John": ["1 John"],
			"2John": ["2 John"],
			"3John": ["3 John"],
			"1Kgs-2Kgs": ["1-2 Kings"],
			"1John,2John": ["1 and 2 John"],
			"1John,2John,3John": ["1, 2, and 3 John"]
		})
		expect(formatter.format("1Kgs-2Kgs,1John,2John,3John")).toEqual("1-2 Kings, 1, 2, and 3 John")
		expect(formatter.format("1John,2John,3John.1.5")).toEqual("1 and 2 John, 3 John 5")
	})

	it("should handle Variables", function() {
		formatter.setBooks({
			"Ps": ["Ps.", "Pss."],
			"Gen": ["Gen."],
			"Ps.$chapters": ["Ps.", "Pss."]
		})
		formatter.setOptions({
			"$chapters": ["chapter", "chapters"],
			"$verses": ["verse", "verses"],
			"^c": "$chapters "
		})

		expect(formatter.format("Gen.1", "Gen")).toEqual("chapter 1")
		expect(formatter.format("Gen.1-Gen.2", "Gen")).toEqual("chapters 1-2")
		expect(formatter.format("Ps.1", "Ps")).toEqual("Ps. 1")
		expect(formatter.format("Ps.1-Ps.2", "Ps")).toEqual("Pss. 1-2")
	})

	it("should handle Single-Chapter Books", function() {
		formatter.setBooks({
			"Phlm": ["Philemon"]
		})
		formatter.setOptions({"singleChapterFormat": "b"})
		expect(formatter.format("Phlm.1.2")).toEqual("Philemon 2")
		expect(formatter.format("Phlm.1")).toEqual("Philemon")
		expect(formatter.format("Phlm")).toEqual("Philemon")

		formatter.setOptions({"singleChapterFormat": "bv"})
		expect(formatter.format("Phlm.1.2")).toEqual("Philemon 2")
		expect(formatter.format("Phlm.1")).toEqual("Philemon 1")
		expect(formatter.format("Phlm")).toEqual("Philemon")

		formatter.setOptions({"singleChapterFormat": "bcv"})
		expect(formatter.format("Phlm.1.2")).toEqual("Philemon 1:2")
		expect(formatter.format("Phlm.1")).toEqual("Philemon 1")
		expect(formatter.format("Phlm")).toEqual("Philemon")
	})

	it("should handle Psalms", function() {
		formatter.setBooks({
			"Ps": ["Ps.", "Pss."],
			"Ps151": ["Psalm 151"],
		})
		formatter.setOptions({"Ps151Format": "b"})
		expect(formatter.format("Ps151.1.5")).toEqual("Psalm 151 5")

		formatter.setOptions({"Ps151Format": "b", "singleChapterFormat": "bcv"})
		expect(formatter.format("Ps151.1.5")).toEqual("Psalm 151 1:5")

		formatter.setOptions({"Ps151Format": "bc"})
		expect(formatter.format("Ps151.1.5")).toEqual("Ps. 151:5")
	})

	it("should handle Separators", function() {
		formatter.setBooks({
			"Gen": ["Gen"],
			"Phlm": ["Phlm"]
		})

		formatter.setOptions({".": "~"})
		expect(formatter.format("Gen.1.2")).toEqual("Gen~1:2")

		formatter.setOptions({"c.v": "~"})
		expect(formatter.format("Gen.1.2")).toEqual("Gen 1~2")

		formatter.setOptions({"b.c": "~", "singleChapterFormat": "bcv"})
		expect(formatter.format("Gen.1.2")).toEqual("Gen~1:2")
		expect(formatter.format("Phlm.1.2")).toEqual("Phlm 1:2")

		formatter.setOptions({"b1.c": "~", "singleChapterFormat": "bcv"})
		expect(formatter.format("Phlm.1.2")).toEqual("Phlm~1:2")

		formatter.setOptions({"b.v": "~"})
		expect(formatter.format("Phlm.1.2")).toEqual("Phlm~2")

		formatter.setOptions({".c": "~", "singleChapterFormat": "bcv"})
		expect(formatter.format("Gen.1.2")).toEqual("Gen~1:2")
		expect(formatter.format("Phlm.1.2")).toEqual("Phlm~1:2")

		formatter.setOptions({".v": "~"})
		expect(formatter.format("Gen.1.2")).toEqual("Gen 1:2")
		expect(formatter.format("Phlm.1.2")).toEqual("Phlm~2")

	})

	it("should handle Ranges", function() {
		formatter.setBooks({
			"Gen": ["Genesis"],
			"Phlm": ["Philemon"]
		})
		formatter.setOptions({
			"-": "\u2014"
		})
		expect(formatter.format("Gen.1-Gen.2")).toEqual("Genesis 1\u20142")

		expect(formatter.format("Gen-Gen.2")).toEqual("Genesis\u20142")
		formatter.setOptions({
			"$chapters": ["ch."],
			"-": "\u2014",
			"b-c": "\u2014$chapters "
		})
		expect(formatter.format("Gen-Gen.2")).toEqual("Genesis\u2014ch. 2")
		expect(formatter.format("Gen-Gen.1.2")).toEqual("Genesis\u2014ch. 1:2")

		expect(formatter.format("Phlm-Phlm.1.2")).toEqual("Philemon\u20142")
		formatter.setOptions({
			"$chapters": ["ch."],
			"-": "\u2014",
			"b-v": "\u2014$b "
		})
		expect(formatter.format("Phlm-Phlm.1.2")).toEqual("Philemon\u2014Philemon 2")

		expect(formatter.format("Gen.1-Gen.1.2")).toEqual("Genesis 1\u20142")
		formatter.setOptions({
			"$chapters": ["ch."],
			"-": "\u2014",
			"c-v": "\u2014$c:"
		})
		expect(formatter.format("Gen.1-Gen.1.2")).toEqual("Genesis 1\u20141:2")

		expect(formatter.format("Gen.1.2-Gen.3")).toEqual("Genesis 1:2\u20143")
		formatter.setOptions({
			"$chapters": ["ch."],
			"-": "\u2014",
			"v-c": "\u2014$chapters "
		})
		expect(formatter.format("Gen.1.2-Gen.3")).toEqual("Genesis 1:2\u2014ch. 3")

		expect(formatter.format("Gen.1.2-Gen.3.4")).toEqual("Genesis 1:2\u2014ch. 3:4")
		formatter.setOptions({
			"$chapters": ["ch."],
			"-": "\u2014",
			"v-c": "\u2014$chapters ",
			"v-cv": "\u2014"
		})
		expect(formatter.format("Gen.1.2-Gen.3.4")).toEqual("Genesis 1:2\u20143:4")

		expect(formatter.format("Gen.1.2-Gen.1.3")).toEqual("Genesis 1:2\u20143")
		formatter.setOptions({
			"$chapters": ["ch."],
			"-": "\u2014",
			"b-c": "\u2014$chapters ",
			"b-v": "\u2014$b ",
			"c-v": "\u2014$c:",
			"v-c": "\u2014$chapters ",
			"v-cv": "\u2014",
			"v-v": "\u2013"
		})
		expect(formatter.format("Gen.1.2-Gen.1.3")).toEqual("Genesis 1:2\u20133")
	})

	it("should handle Sequences", function() {
		formatter.setBooks({
			"Gen": ["Genesis"],
			"Phlm": ["Philemon"]
		})
		formatter.setOptions({
			",": "; "
		})
		expect(formatter.format("Gen.1,Gen.2")).toEqual("Genesis 1; 2")

		expect(formatter.format("Gen,Gen.2")).toEqual("Genesis; 2")
		formatter.setOptions({
			"$chapters": ["ch."],
			",": "; ",
			"b,c": "; $chapters "
		})
		expect(formatter.format("Gen,Gen.2")).toEqual("Genesis; ch. 2")

		expect(formatter.format("Gen,Gen.1.2")).toEqual("Genesis; ch. 1:2")
		formatter.setOptions({
			"$chapters": ["ch."],
			",": "; ",
			"b,c": "; $chapters ",
			"b,cv": "; "
		})
		expect(formatter.format("Gen,Gen.1.2")).toEqual("Genesis; 1:2")

		expect(formatter.format("Phlm,Phlm.1.2")).toEqual("Philemon; 2")
		formatter.setOptions({
			",": "; ",
			"b,v": "; $b "
		})
		expect(formatter.format("Phlm,Phlm.1.2")).toEqual("Philemon; Philemon 2")

		expect(formatter.format("Gen.1,Gen.1.2")).toEqual("Genesis 1; 2")
		formatter.setOptions({
			",": "; ",
			"c,v": "; $c:"
		})
		expect(formatter.format("Gen.1,Gen.1.2")).toEqual("Genesis 1; 1:2")

		expect(formatter.format("Gen.1.2,Gen.3")).toEqual("Genesis 1:2; 3")
		formatter.setOptions({
			"$chapters": ["ch."],
			",": "; ",
			"v,c": "; $chapters "
		})
		expect(formatter.format("Gen.1.2,Gen.3")).toEqual("Genesis 1:2; ch. 3")

		expect(formatter.format("Gen.1.2,Gen.3.4")).toEqual("Genesis 1:2; ch. 3:4")
		formatter.setOptions({
			"$chapters": ["ch."],
			",": "; ",
			"v,c": "; $chapters ",
			"v,cv": "; "
		})
		expect(formatter.format("Gen.1.2,Gen.3.4")).toEqual("Genesis 1:2; 3:4")

		expect(formatter.format("Gen.1.2,Gen.1.3")).toEqual("Genesis 1:2; 3")
		formatter.setOptions({
			",": "; ",
			"v,v": ","
		})
		expect(formatter.format("Gen.1.2,Gen.1.3")).toEqual("Genesis 1:2,3")
	})

	it("should handle Ending Sequences", function() {
		formatter.setBooks({
			"Gen": ["Genesis"],
			"Phlm": ["Philemon"],
			"1John": ["1 John"],
			"2John": ["2 John"],
			"3John": ["3 John"],
			"1John,2John,3John": ["1, 2, and 3 John"],
		})
		formatter.setOptions({
			",": "; ",
			"v,c": "; $chapters ",
			"v,cv": "; ",
			"v,v": ",",
			"$chapters": ["ch.", "chs."],
			"&": " and ",
			"v&c": " and $chapters ",
			"v&cv": " and ",
			",&": "; and ",
			"v,&c": "; and $chapters ",
			"v,&cv": " and ",
			"v,&v": ", and "
		})
		expect(formatter.format("Gen.1,Gen.3")).toEqual("Genesis 1 and 3")
		expect(formatter.format("Gen.1.2,Gen.3")).toEqual("Genesis 1:2 and ch. 3")
		expect(formatter.format("Gen.1.2,Gen.1.4")).toEqual("Genesis 1:2 and 4")
		expect(formatter.format("Gen.1,Gen.3,Gen.5")).toEqual("Genesis 1; 3; and 5")
		expect(formatter.format("Gen.1.2,Gen.1.4,Gen.3")).toEqual("Genesis 1:2,4; and ch. 3")
		expect(formatter.format("Gen.1.2,Gen.1.4,Gen.1.6")).toEqual("Genesis 1:2,4, and 6")
		expect(formatter.format("Gen,1John,2John,3John")).toEqual("Genesis and 1, 2, and 3 John")
		expect(formatter.format("Gen,Phlm,1John,2John,3John")).toEqual("Genesis; Philemon; and 1, 2, and 3 John")
	})

	it("should handle Start Contexts", function() {
		formatter.setBooks({
			"Gen": ["Genesis"],
			"Phlm": ["Philemon"]
		})
		formatter.setOptions({
			"^v": "$verses ",
			"$verses": ["verse", "verses"]
		})
		expect(formatter.format("Gen.1.2,Gen.1.3", "Gen.1")).toEqual("verses 2, 3")

		formatter.setOptions({
			"^c": "^c ",
			"^cv": "^cv ",
			"^v": "^v ",
			"b1^c": "b1^c ",
			"b1^cv": "b1^cv ",
			"b1^v": "b1^v "
		})
		expect(formatter.format("Gen.1", "Gen")).toEqual("^c 1")
		expect(formatter.format("Gen.1.2", "Gen")).toEqual("^cv 1:2")
		expect(formatter.format("Gen.1.2", "Gen.1")).toEqual("^v 2")
		expect(formatter.format("Phlm.1", "Phlm")).toEqual("b1^c 1")
		expect(formatter.format("Phlm.1.2", "Phlm")).toEqual("b1^v 2")
		expect(formatter.format("Phlm.1.2", "Phlm.1")).toEqual("b1^v 2")
		formatter.setOptions({
			"singleChapterFormat": "bcv",
			"b1^c": "b1^c ",
			"b1^cv": "b1^cv "
		})
		expect(formatter.format("Phlm.1", "Phlm")).toEqual("b1^c 1")
		expect(formatter.format("Phlm.1.2", "Phlm")).toEqual("b1^cv 1:2")

		formatter.setOptions({
			"singleChapterFormat": "b",
			"b1^c": "b1^c ",
			"b1^cv": "b1^cv ",
			"b1^v": "b1^v "
		})
		expect(formatter.format("Phlm.1", "Phlm")).toEqual("Philemon")
		expect(formatter.format("Phlm.1.2", "Phlm")).toEqual("b1^v 2")
	})
})