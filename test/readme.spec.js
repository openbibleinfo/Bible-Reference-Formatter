"use strict"
/* global require, describe, it, expect, beforeEach */
const OsisToReadable = require("../es6/osisToReadable")
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
	it("should handle osisToReadable", function() {
		const osisToReadable = new OsisToReadable
		osisToReadable.setBooks({"Phlm":["Phlm"]})
		expect(osisToReadable.toReadable("Phlm.1.2")).toEqual("Phlm 2")
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
	let converter = new OsisToReadable()
	beforeEach(function() {
		converter = new OsisToReadable()
	})

	it("should handle the first block", function() {
		converter.setBooks({"Ps": ["Psalm", "Psalms"]})
		converter.setOptions({"c.v": ":", "^v": "$verses "})
		expect(converter.toReadable("Ps.1.1")).toEqual("Psalm 1:1")
		expect(converter.toReadable("Ps.2-Ps.3")).toEqual("Psalms 2-3")
		expect(converter.toReadable("Ps.2.2,Ps.2.3", "Ps.2")).toEqual("vv 2, 3")
	})

	it("should handle `.setBooks()`", function() {
		expect(converter.setBooks({
			"Ps": ["Ps.", "Pss.", "Psalms"],
			"Gen": ["Gen."]
		})).not.toBeDefined()
		expect(converter.toReadable("Ps.3-Ps.4")).toEqual("Pss. 3-4")
		expect(converter.toReadable("Ps.5.6-Ps.7.8")).toEqual("Pss. 5:6-7:8")
		expect(converter.toReadable("Ps.3,Ps.4")).toEqual("Pss. 3, 4")
		expect(converter.toReadable("Ps.5.6,Ps.7.8")).toEqual("Pss. 5:6, 7:8")
	})

	it("should handle `.setBooks() Chapters`", function() {
		converter.setBooks({
			"Ps": ["Ps.", "Pss."],
			"Ps.$chapters": ["Ps.", "Pss."]
		})
		converter.setOptions({
			"^c": "$chapters "
		})

		expect(converter.toReadable("Ps.1", "Ps")).toEqual("Ps. 1")
		expect(converter.toReadable("Ps.1-Ps.2", "Ps")).toEqual("Pss. 1-2")
	})

	it("should handle `.setBooks() Ranges and Sequences`", function() {
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
		expect(converter.toReadable("1Kgs-2Kgs,1John,2John,3John")).toEqual("1-2 Kings, 1, 2, and 3 John")
		expect(converter.toReadable("1John,2John,3John.1.5")).toEqual("1 and 2 John, 3 John 5")
	})

	it("should handle Variables", function() {
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

		expect(converter.toReadable("Gen.1", "Gen")).toEqual("chapter 1")
		expect(converter.toReadable("Gen.1-Gen.2", "Gen")).toEqual("chapters 1-2")
		expect(converter.toReadable("Ps.1", "Ps")).toEqual("Ps. 1")
		expect(converter.toReadable("Ps.1-Ps.2", "Ps")).toEqual("Pss. 1-2")
	})

	it("should handle Single-Chapter Books", function() {
		converter.setBooks({
			"Phlm": ["Philemon"]
		})
		converter.setOptions({"singleChapterFormat": "b"})
		expect(converter.toReadable("Phlm.1.2")).toEqual("Philemon 2")
		expect(converter.toReadable("Phlm.1")).toEqual("Philemon")
		expect(converter.toReadable("Phlm")).toEqual("Philemon")

		converter.setOptions({"singleChapterFormat": "bv"})
		expect(converter.toReadable("Phlm.1.2")).toEqual("Philemon 2")
		expect(converter.toReadable("Phlm.1")).toEqual("Philemon 1")
		expect(converter.toReadable("Phlm")).toEqual("Philemon")

		converter.setOptions({"singleChapterFormat": "bcv"})
		expect(converter.toReadable("Phlm.1.2")).toEqual("Philemon 1:2")
		expect(converter.toReadable("Phlm.1")).toEqual("Philemon 1")
		expect(converter.toReadable("Phlm")).toEqual("Philemon")
	})

	it("should handle Psalms", function() {
		converter.setBooks({
			"Ps": ["Ps.", "Pss."],
			"Ps151": ["Psalm 151"],
		})
		converter.setOptions({"Ps151Format": "b"})
		expect(converter.toReadable("Ps151.1.5")).toEqual("Psalm 151 5")

		converter.setOptions({"Ps151Format": "b", "singleChapterFormat": "bcv"})
		expect(converter.toReadable("Ps151.1.5")).toEqual("Psalm 151 1:5")

		converter.setOptions({"Ps151Format": "bc"})
		expect(converter.toReadable("Ps151.1.5")).toEqual("Ps. 151:5")
	})

	it("should handle Separators", function() {
		converter.setBooks({
			"Gen": ["Gen"],
			"Phlm": ["Phlm"]
		})

		converter.setOptions({".": "~"})
		expect(converter.toReadable("Gen.1.2")).toEqual("Gen~1:2")

		converter.setOptions({"c.v": "~"})
		expect(converter.toReadable("Gen.1.2")).toEqual("Gen 1~2")

		converter.setOptions({"b.c": "~", "singleChapterFormat": "bcv"})
		expect(converter.toReadable("Gen.1.2")).toEqual("Gen~1:2")
		expect(converter.toReadable("Phlm.1.2")).toEqual("Phlm 1:2")

		converter.setOptions({"b1.c": "~", "singleChapterFormat": "bcv"})
		expect(converter.toReadable("Phlm.1.2")).toEqual("Phlm~1:2")

		converter.setOptions({"b.v": "~"})
		expect(converter.toReadable("Phlm.1.2")).toEqual("Phlm~2")

		converter.setOptions({".c": "~", "singleChapterFormat": "bcv"})
		expect(converter.toReadable("Gen.1.2")).toEqual("Gen~1:2")
		expect(converter.toReadable("Phlm.1.2")).toEqual("Phlm~1:2")

		converter.setOptions({".v": "~"})
		expect(converter.toReadable("Gen.1.2")).toEqual("Gen 1:2")
		expect(converter.toReadable("Phlm.1.2")).toEqual("Phlm~2")

	})
})