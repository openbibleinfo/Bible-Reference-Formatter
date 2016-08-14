"use strict"
/* global require, describe, it, expect, beforeEach */
const OsisFormatter = require("../es6/osisFormatter")
const f = new OsisFormatter()

function resetBooks() {
	f.setBooks({
		"Gen": ["Gen."],
		"Ps": ["Ps.", "Pss.", "Psalms"],
		"Ps.$chapters": ["Ps.", "Pss."],
		"Ps151": ["Ps. 151"],
		"AddPs": ["Ps. 151"],
		"Matt": ["Matt."],
		"Luke": ["Luke"],
		"Phlm": ["Philem."],
		"Heb": ["Heb. S.", "Heb. P."],
		"1John": ["1 John"],
		"2John": ["2 John"],
		"3John": ["3 John"],
		"Rev": ["Rev."],
		"1John-3John": ["1\u20143 John"],
		"1John-2John": ["1\u20142 John"],
		"2John-3John": ["2\u20143 John"],
		"1John,2John": ["1 and 2 John"],
		"2John,3John": ["2 and 3 John"],
		"1John,3John": ["1 and 3 John"],
		"1John,2John,3John": ["1, 2, and 3 John"]
	})
}

function setOptions(newOptions={}) {
	const options = {
		"^v": "$verses ",
		"^c": "$chapters ",
		"b1^v": "$verses ",
		"b1^c": "$b ",
		//"^cv": "",

		"$chapters": ["ch.", "chs."],
		"$verses": ["v.", "vv."],

		"-b": "\u2014", // Matt-Mark
		"-c": "\u2013", // Matt-Matt.3
		"-v": "\u2013", // Phlm-Phlm.1.2

		"c-v": "-$verses ", // Matt.1-Matt.1.2

		"v-c": "\u2013$chapters ", // Matt.1.1-Matt.3
		"v-cv": "\u2013", // Matt.1.1-Matt.3.4
		"v-v": "-", // Matt.1.1-Matt.1.2

		",b": "; ", // Matt,Mark
		",c": "; ", // Matt,Matt.3
		"b,v": "; $b ", // Phlm,Phlm.1.2

		"v,c": "; $chapters ",
		"v,cv": "; ",

		"bc,v": ", $c:",
		"c,v": ", $c:",

		".c": " ", // Matt.1
		".v": ":", // (Matt.)1.1
		"b.v": " " // Phlm.(1.)2
	}
	for (const key of Object.keys(newOptions)) {
		options[key] = newOptions[key]
	}
	f.setOptions(options)
}

resetBooks()
describe("Initialization", function() {
	it("should initialize", function() {
		expect(f.format("Matt")).toEqual("Matt.")
	})
})

describe("Basic parsing", function() {
	beforeEach(function() {
		setOptions()
	})

	it("should handle multi-chapter books", function() {
		expect(f.format("Matt.1.2-Matt.1.3,Matt.1.4,Matt.1.5,Matt.8.6-Luke.2.3")).toEqual("Matt. 1:2-3, 4, 5; 8:6\u2014Luke 2:3")
		expect(f.format("Matt.1.2-Phlm.1.3")).toEqual("Matt. 1:2\u2014Philem. 3")
		expect(f.format("Matt.8.6-Matt.9")).toEqual("Matt. 8:6\u2013ch. 9")
		expect(f.format("Matt.8.6,Matt.9-Matt.10")).toEqual("Matt. 8:6; chs. 9\u201310")
		expect(f.format("Matt.8,Matt.8.6-Matt.8.7,Matt.8.9")).toEqual("Matt. 8, 8:6-7, 9")
		expect(f.format("Matt.1.4-Phlm.1")).toEqual("Matt. 1:4\u2014Philem. 1")
		expect(f.format("Matt-Luke")).toEqual("Matt.\u2014Luke")
		expect(f.format("Matt.1,Luke.1")).toEqual("Matt. 1; Luke 1")
		expect(f.format("Matt.1.1,Luke.1.1")).toEqual("Matt. 1:1; Luke 1:1")
		expect(f.format("Matt.1,Matt.1.2-Matt.1.3")).toEqual("Matt. 1, 1:2-3")
		expect(f.format("Matt.2-Matt.2.3")).toEqual("Matt. 2-v. 3")
	})

	it("should handle single-chapter books", function() {
		expect(f.format("Phlm.1")).toEqual("Philem. 1")
		expect(f.format("Phlm.1-Rev")).toEqual("Philem. 1\u2014Rev.")
		expect(f.format("Phlm.1.4-Phlm.1")).toEqual("Philem. 4\u2013ch. 1")
		expect(f.format("Phlm.1.2-Phlm.1.3")).toEqual("Philem. 2-3")
		expect(f.format("Phlm,Phlm.1.2")).toEqual("Philem.; Philem. 2")
	})

	it("should handle single-chapter books with `bcv`", function() {
		setOptions({singleChapterFormat: "bcv"})
		expect(f.format("Phlm.1")).toEqual("Philem. 1")
		expect(f.format("Phlm.1-Rev")).toEqual("Philem. 1\u2014Rev.")
		expect(f.format("Phlm.1.4-Phlm.1")).toEqual("Philem. 1:4\u2013ch. 1")
		expect(f.format("Phlm.1.2-Phlm.1.3")).toEqual("Philem. 1:2-3")
		expect(f.format("Phlm,Phlm.1.2")).toEqual("Philem.; 1:2")
	})

	it("should handle Psalms", function() {
		expect(f.format("Ps.1.2-Ps.1.3")).toEqual("Ps. 1:2-3")
		expect(f.format("Ps.1")).toEqual("Ps. 1")
		expect(f.format("Ps.1-Ps.2")).toEqual("Pss. 1\u20132")
		expect(f.format("Ps.1,Ps.2")).toEqual("Pss. 1; 2")
		expect(f.format("Ps.1,Matt.2,Ps.3")).toEqual("Ps. 1; Matt. 2; Ps. 3")
		expect(f.format("Ps.1,Ps.2.2-Ps.2.3")).toEqual("Pss. 1; 2:2-3")
		expect(f.format("Ps.1.1-Ps.2.3")).toEqual("Pss. 1:1\u20132:3")
		expect(f.format("Ps.1.1-Matt.2.3")).toEqual("Pss. 1:1\u2014Matt. 2:3")
		expect(f.format("Ps.1,Ps.2.4,Ps.3-Ps.4")).toEqual("Pss. 1; 2:4; Pss. 3\u20134")
		expect(f.format("Ps.1,Ps.2.2-Ps.3")).toEqual("Pss. 1; 2:2\u2013Ps. 3")
		expect(f.format("Ps.1.2-Ps.3,Ps.4")).toEqual("Pss. 1:2\u2013Pss. 3; 4")
		expect(f.format("Ps.1.2,Ps.3,Ps.4")).toEqual("Pss. 1:2; Pss. 3; 4") // `Ps. 1:2` would be better.
		expect(f.format("Ps.1,Ps.3,Ps.4", "Ps")).toEqual("Pss. 1; 3; 4", "Ps")
		expect(f.format("Ps.1,Ps.3,Ps.4", "Ps.1")).toEqual("Pss. 1; 3; 4", "Ps")
	})

	it("should handle Psalm ranges", function() {
		expect(f.format("Ps.149-Matt.1")).toEqual("Pss. 149\u2014Matt. 1")
		expect(f.format("Ps.150-Matt.1")).toEqual("Ps. 150\u2014Matt. 1")
	})

	it("should handle a range as a context argument", function() {
		expect(f.format("Ps.3.2,Ps.1.3,Ps.1.4", "Ps.1-Ps.3")).toEqual("v. 2; 1:3, 4")
	})

	it("should handle chapter start contexts", function () {
		expect(f.format("Matt.2-Matt.2.3", "Matt.1")).toEqual("ch. 2-v. 3")
		expect(f.format("Matt.2-Matt.3.3", "Matt.1")).toEqual("chs. 2\u20133:3")
		expect(f.format("Matt.2-Matt.3.3,Matt.4", "Matt.1")).toEqual("chs. 2\u20133:3; ch. 4")
		expect(f.format("Matt.2-Matt.3,Matt.4", "Matt.1")).toEqual("chs. 2\u20133; 4")
		expect(f.format("Matt.2,Matt.4", "Matt.1")).toEqual("chs. 2; 4")
	})

	it("should handle verse start contexts", function () {
		expect(f.format("Matt.1.2-Matt.2.3", "Matt.1")).toEqual("vv. 2\u20132:3")
		expect(f.format("Matt.1.2-Matt.1.3", "Matt.1")).toEqual("vv. 2-3")
		expect(f.format("Matt.1.2-Matt.1.3,Matt.1.4", "Matt.1")).toEqual("vv. 2-3, 4")
		expect(f.format("Matt.1.2-Matt.1.3,Matt.4", "Matt.1")).toEqual("vv. 2-3; ch. 4")
		expect(f.format("Matt.1.2,Matt.1.4", "Matt.1")).toEqual("vv. 2, 4")
		expect(f.format("Ps.2.2,Ps.2.3", "Ps.2")).toEqual("vv. 2, 3")
	})
})

describe("Setting options", function() {
	beforeEach(function() {
		setOptions()
	})

	it("should handle adding text to single-chapter books", function() {
		setOptions({"b.v": " $verses "}) // Phlm.(1.)2

		expect(f.format("Matt.1.2-Phlm.1.3")).toEqual("Matt. 1:2\u2014Philem. v. 3")
		expect(f.format("Phlm.1.4-Phlm.1")).toEqual("Philem. vv. 4\u2013ch. 1")
		expect(f.format("Phlm.1.2-Phlm.1.3")).toEqual("Philem. vv. 2-3")
		expect(f.format("Phlm.1.2,Phlm.1.3,Phlm.1.4", "Phlm.1.2")).toEqual("vv. 2, 3, 4")
		expect(f.format("Phlm.1.2,Phlm.1.3,Phlm.1.4", "Phlm.1")).toEqual("vv. 2, 3, 4")
		expect(f.format("Phlm.1.2,Phlm.1.3,Phlm.1.4", "Phlm")).toEqual("vv. 2, 3, 4")
		expect(f.format("Phlm.1,Phlm", "Phlm.1.2-Phlm.1.2")).toEqual("Philem. 1; Philem.")
		expect(f.format("Phlm.1,Phlm", "Phlm.1-Phlm.1")).toEqual("Philem. 1; Philem.")
		expect(f.format("Phlm.1,Phlm", "Phlm-Phlm")).toEqual("Philem. 1; Philem.")
	})

	it("should handle adding text to multi-chapter books", function() {
		setOptions({"b.v": " $verses "}) // Phlm.(1.)2
		expect(f.format("Matt.1.2-Matt.1.4", "Matt.1.2")).toEqual("vv. 2-4")
		expect(f.format("Matt.1.2,Matt.1.3,Matt.1.4", "Matt.1.2")).toEqual("vv. 2, 3, 4")
		expect(f.format("Matt.1.2,Matt.1.3,Matt.1.4", "Matt.1")).toEqual("vv. 2, 3, 4")
		expect(f.format("Matt.1.2,Matt.1.3,Matt.1.4", "Matt")).toEqual("1:2, 3, 4")
		expect(f.format("Matt.1,Matt.2,Matt.3", "Matt.1.2")).toEqual("chs. 1; 2; 3")
		expect(f.format("Matt.1,Matt.2,Matt.3", "Matt.1")).toEqual("chs. 1; 2; 3")
		expect(f.format("Matt.1,Matt.2,Matt.3", "Matt")).toEqual("chs. 1; 2; 3")
	})

	it("should handle adding text to Psalms", function() {
		setOptions({"b.v": " $verses "}) // Phlm.(1.)2
		expect(f.format("Ps.1.2-Ps.1.4", "Ps.1.2")).toEqual("vv. 2-4")
		expect(f.format("Ps.1.2,Ps.1.3,Ps.1.4", "Ps.1.2")).toEqual("vv. 2, 3, 4")
		expect(f.format("Ps.1.2,Ps.1.3,Ps.1.4", "Ps.2")).toEqual("1:2, 3, 4")
		expect(f.format("Ps.1.2,Ps.1.3,Ps.1.4", "Ps")).toEqual("1:2, 3, 4")

		expect(f.format("Ps.1,Ps.2-Ps.4", "Ps.5")).toEqual("Pss. 1; 2\u20134")
		expect(f.format("Ps.1,Ps.2-Ps.4", "Ps.5.5")).toEqual("Pss. 1; 2\u20134")
		expect(f.format("Ps.1,Ps.2-Ps.4", "Ps")).toEqual("Pss. 1; 2\u20134")
	})

	it("should handle a single chapter option", function() {
		setOptions({"$chapters": ["chapter"]})
		expect(f.format("Matt.2-Matt.3", "Matt")).toEqual("chapter 2\u20133")
		expect(f.format("Matt.2", "Matt")).toEqual("chapter 2")
	})

	it("should handle a single verse option", function() {
		setOptions({"$verses": ["v."]})
		expect(f.format("Ps.1.2-Ps.1.3", "Ps.1")).toEqual("v. 2-3")
	})

	it("should handle an odd `$chapters`", function() {
		setOptions({"c.v": " $chapters "})
		expect(f.format("Matt.2.3,Matt.2.4", "Matt")).toEqual("2 ch. 3, 4")
		expect(f.format("Matt.3.3,Matt.4.4")).toEqual("Matt. 3 ch. 3; 4 ch. 4")
	})

	it("should handle multiple `$chapters` replacements", function() {
		setOptions({"b.c": " $chapters $chapters "})
		expect(f.format("Matt.2.3,Ps.2.4")).toEqual("Matt. ch. ch. 2:3; Ps. Ps. Ps. 2:4")
		expect(f.format("Matt.3.3,Matt.4.4")).toEqual("Matt. chs. chs. 3:3; 4:4")
	})

	it("should handle multiple `$verses` replacements", function() {
		setOptions({"c.v": " $verses $verses "})
		expect(f.format("Matt.2.3,Ps.2.4")).toEqual("Matt. 2 v. v. 3; Ps. 2 v. v. 4")
		expect(f.format("Matt.3.3,Matt.4.4")).toEqual("Matt. 3 v. v. 3; 4 v. v. 4")
	})

	it("should handle multiple `$b` replacements", function() {
		setOptions({"b.c": " ($b $b) "})
		expect(f.format("Matt.2.3,Ps.2.4")).toEqual("Matt. (Matt. Matt.) 2:3; Ps. (Ps. Ps.) 2:4")
		expect(f.format("Matt.3.3,Matt.4.4")).toEqual("Matt. (Matt. Matt.) 3:3; 4:4")
	})

	it("should return an empty string for `$c` and `$v` when they're not defined", function() {
		setOptions({"b.c": " (chapter $c $c) ", "c.v": " (verse $v $v) "})
		expect(f.format("Matt.2.3,Ps.2.4")).toEqual("Matt. (chapter  ) 2 (verse  ) 3; Ps. (chapter  ) 2 (verse  ) 4")
		expect(f.format("Matt.3.3,Matt.3.4")).toEqual("Matt. (chapter  ) 3 (verse  ) 3, 4")
	})

	it("should handle `singleChapterFormat = \"b\"` with the same book", function () {
		setOptions({"singleChapterFormat": "b", "b1^v": "$b V ", "b-v": "\u2014$b R "})
		expect(f.format("Phlm-Phlm.1")).toEqual("Philem.\u2014Philem\.")
		expect(f.format("Phlm-Phlm.1.2")).toEqual("Philem.\u2014Philem\. R 2")
		expect(f.format("Phlm,Phlm.1")).toEqual("Philem.; Philem\.")
		expect(f.format("Phlm,Phlm.1.3")).toEqual("Philem.; Philem\. 3")
		expect(f.format("Phlm.1", "Phlm")).toEqual("Philem\.")
		expect(f.format("Phlm.1.4", "Phlm")).toEqual("Philem\. V 4")
		expect(f.format("Phlm.1", "Phlm.1")).toEqual("Philem\.")
		expect(f.format("Phlm.1.4", "Phlm.1")).toEqual("Philem\. V 4")
	})

	it("should handle `singleChapterFormat = \"b\"` with a different book", function () {
		setOptions({"singleChapterFormat": "b", "b1^v": "$b V ", "b-v": "\u2014$b R "})
		expect(f.format("Matt-Phlm.1")).toEqual("Matt.\u2014Philem\.")
		expect(f.format("Matt-Phlm.1.2")).toEqual("Matt.\u2014Philem\. 2")
		expect(f.format("Matt,Phlm.1")).toEqual("Matt.; Philem\.")
		expect(f.format("Matt,Phlm.1.3")).toEqual("Matt.; Philem\. 3")
		expect(f.format("Phlm.1", "Matt")).toEqual("Philem\.")
		expect(f.format("Phlm.1.4", "Matt")).toEqual("Philem\. 4")
		expect(f.format("Phlm.1", "Matt.1")).toEqual("Philem\.")
		expect(f.format("Phlm.1.4", "Matt.1")).toEqual("Philem\. 4")
	})

	it("should show the plural when looking at the whole book of Psalms", function() {
		expect(f.format("Ps")).toEqual("Psalms")
		expect(f.format("Heb")).toEqual("Heb. P.")
		expect(f.format("Phlm")).toEqual("Philem.")
	})
})

describe("Psalm 151", function() {
	beforeEach(function() {
		setOptions()
	})

	it("should handle Ps151 as a `bc`", function() {
		setOptions({"b.v": " $verses ", "Ps151Format": "bc"})

		expect(f.format("Ps.1-Ps151")).toEqual("Pss. 1\u2013151")
		expect(f.format("Ps.1.2-Ps151")).toEqual("Pss. 1:2\u2013Ps. 151")
		expect(f.format("Ps151")).toEqual("Ps. 151")
		expect(f.format("Ps151.1")).toEqual("Ps. 151")
		expect(f.format("Ps151.1.2-Ps151.1.3")).toEqual("Ps. 151:2-3")
		expect(f.format("Ps151-Matt.1")).toEqual("Ps. 151\u2014Matt. 1")
		expect(f.format("Ps151.1-Matt.1")).toEqual("Ps. 151\u2014Matt. 1")
		expect(f.format("Ps151.1.1-Matt.1")).toEqual("Ps. 151:1\u2014Matt. 1")
	})

	it("should handle Ps151 as a `b` with `singleChapterFormat: bv`", function() {
		setOptions({"Ps151Format": "b", "singleChapterFormat": "bv" })

		expect(f.format("Ps.1-Ps151")).toEqual("Pss. 1\u2014Ps. 151")
		expect(f.format("Ps.1.2-Ps151")).toEqual("Pss. 1:2\u2014Ps. 151")
		expect(f.format("Ps151")).toEqual("Ps. 151")
		expect(f.format("Ps151.1")).toEqual("Ps. 151 1")
		expect(f.format("Ps151.1.3-Ps151.1.4")).toEqual("Ps. 151 3-4")
		expect(f.format("Ps151-Matt.1")).toEqual("Ps. 151\u2014Matt. 1")
		expect(f.format("Ps151.1-Matt.1")).toEqual("Ps. 151 1\u2014Matt. 1")
		expect(f.format("Ps151.1.1-Matt.1")).toEqual("Ps. 151 1\u2014Matt. 1")
	})

	it("should handle Ps151 as a `b` with `singleChapterFormat: bcv`", function() {
		setOptions({"Ps151Format": "b", "singleChapterFormat": "bcv"})
		expect(f.format("Ps151.1.4-Ps151.1.5")).toEqual("Ps. 151 1:4-5")
		expect(f.format("Ps151-Matt.1")).toEqual("Ps. 151\u2014Matt. 1")
		expect(f.format("Ps151.1-Matt.1")).toEqual("Ps. 151 1\u2014Matt. 1")
		expect(f.format("Ps151.1.1-Matt.1")).toEqual("Ps. 151 1:1\u2014Matt. 1")
	})
})

describe("Exceptions", function() {
	beforeEach(function() {
		setOptions()
	})

	it("should not accept a sequence as a context argument", function() {
		expect(() => f.format("Ps.1.2", "Ps.2,Ps.3")).toThrow()
	})

	it("should not accept a non-string as a first argument", function() {
		expect(() => f.format(1, "Ps.1")).toThrow()
		expect(() => f.format([], "Ps.1")).toThrow()
		expect(() => f.format({}, "Ps.1")).toThrow()
	})

	it("should not accept a non-string as a second argument", function() {
		expect(() => f.format("Ps.2", 1)).toThrow()
		expect(() => f.format("Ps.2", [])).toThrow()
		expect(() => f.format("Ps.2", {})).toThrow()
	})

	it("should not accept an invalid OSIS as as first argument", function() {
		expect(() => f.format("Ps 2")).toThrow()
		expect(() => f.format("")).toThrow()
		expect(() => f.format("Book.2")).toThrow()
		expect(() => f.format("Matt.")).toThrow()
		expect(() => f.format("Matt.1.")).toThrow()
		expect(() => f.format("Matt.1.-")).toThrow()
		expect(() => f.format("Matt.1-")).toThrow()
	})
	it("should not accept an invalid OSIS as as second argument", function() {
		expect(() => f.format("Matt.1", "Ps 2")).toThrow()
		expect(() => f.format("Matt.1", "")).toThrow()
		expect(() => f.format("Matt.1", "Book.2")).toThrow()
		expect(() => f.format("Matt.1", "Matt.")).toThrow()
		expect(() => f.format("Matt.1", "Matt.1.")).toThrow()
		expect(() => f.format("Matt.1", "Matt.1.-")).toThrow()
		expect(() => f.format("Matt.1", "Matt.1-")).toThrow()
	})

	it("should not accept an invalid type when setting options", function() {
		expect(f.setOptions("")).not.toBeDefined()
		expect(() => f.setOptions({singleChapterBooks: "Phlm"})).toThrow()
		expect(() => f.setOptions({singleChapterFormat: ["bv"]})).toThrow()
	})

	it("should not accept an empty `setOptions()` call", function() {
		expect(f.setOptions()).not.toBeDefined()
	})
})

describe("Multiple objects", function() {
	beforeEach(function() {
		setOptions()
	})

	it("should allow multiple objects not to trample each other", function() {
		const c1 = new OsisFormatter
		c1.setBooks({Matt: ["Matt"]})
		c1.setOptions({".": "/", "c.v": "/"})
		expect(c1.format("Matt.1.1")).toEqual("Matt/1/1")
		expect(f.format("Matt.1.1")).toEqual("Matt. 1:1")
	})
})

describe("Multiple books by themselves", function() {
	beforeEach(function() {
		setOptions()
	})

	it("should handle special book ranges", function() {
		expect(f.format("Ps,1John-3John,Matt")).toEqual("Psalms; 1\u20143 John; Matt.")
		expect(f.format("Ps,1John-2John,3John")).toEqual("Psalms; 1\u20142 John; 3 John")
		expect(f.format("Ps,1John,2John-3John")).toEqual("Psalms; 1 John; 2\u20143 John")
	})

	it("should handle special book sequences", function() {
		expect(f.format("Ps,1John,2John,3John,Matt")).toEqual("Psalms; 1, 2, and 3 John; Matt.")
		expect(f.format("Ps,1John,2John,Matt")).toEqual("Psalms; 1 and 2 John; Matt.")
		expect(f.format("Ps,2John,3John,3John.1.2,2John,1John,2John")).toEqual("Psalms; 2 and 3 John; 3 John 2; 2 John; 1 and 2 John")
		expect(f.format("Ps,Matt,3John,Phlm,Heb,Rev")).toEqual("Psalms; Matt.; 3 John; Philem.; Heb. P.; Rev.")
	})
})

describe("setBooks", function() {
	beforeEach(function() {
		setOptions()
	})

	it("should not accept a non-array value", function() {
		expect(() => f.setBooks("Matt.1")).toThrow()
		expect(() => f.setBooks({"a": "Matt.1"})).toThrow()
		expect(() => f.setBooks({"a": {}})).toThrow()
	})

	it("should only accept arrays of lengths 1, 2, or 3", function() {
		expect(() => f.setBooks({"a": []})).toThrow()
		expect(f.setBooks({"a": ["b"]})).not.toBeDefined()
		expect(f.setBooks({"a": ["b", "c"]})).not.toBeDefined()
		expect(() => f.setBooks({"a": ["b", "c", "d", "e"]})).toThrow()
	})
	resetBooks()
})
