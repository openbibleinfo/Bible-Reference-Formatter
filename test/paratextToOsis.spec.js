"use strict";
const paratextToOsis = require("../es6/paratextToOsis")

describe("Tests", function() {
	it ("should handle non-ranges", function() {
		expect(paratextToOsis("MAT 1:2")).toEqual("Matt.1.2")
		expect(paratextToOsis("MAT 1")).toEqual("Matt.1")
		expect(paratextToOsis("MAT")).toEqual("Matt")
	})

	it ("should handle verse ranges", function() {
		expect(paratextToOsis("MAT 1:3-8")).toEqual("Matt.1.3-Matt.1.8")
		expect(paratextToOsis("MAT 1:4-2:3")).toEqual("Matt.1.4-Matt.2.3")
		expect(paratextToOsis("MAT 1:5-MAT 2:3")).toEqual("Matt.1.5-Matt.2.3")
		expect(paratextToOsis("MAT 1:6-MAT 3")).toEqual("Matt.1.6-Matt.3")
		expect(paratextToOsis("MAT 1:7-MRK 2:3")).toEqual("Matt.1.7-Mark.2.3")
		expect(paratextToOsis("MAT 1:8-MRK 2")).toEqual("Matt.1.8-Mark.2")
		expect(paratextToOsis("MAT 1:9-MRK")).toEqual("Matt.1.9-Mark")
	})

	it ("should handle chapter ranges", function() {
		expect(paratextToOsis("MAT 1-9")).toEqual("Matt.1-Matt.9")
		expect(paratextToOsis("MAT 1-10:3")).toEqual("Matt.1-Matt.10.3")
		expect(paratextToOsis("MAT 1-MRK 11:3")).toEqual("Matt.1-Mark.11.3")
		expect(paratextToOsis("MAT 1-MRK 12")).toEqual("Matt.1-Mark.12")
		expect(paratextToOsis("MAT 13-MRK")).toEqual("Matt.13-Mark")
	})

	it ("should handle book ranges", function() {
		expect(paratextToOsis("MAT-14")).toEqual("Matt-Matt.14")
		expect(paratextToOsis("MAT-15:3")).toEqual("Matt-Matt.15.3")
		expect(paratextToOsis("MAT-MRK 16:3")).toEqual("Matt-Mark.16.3")
		expect(paratextToOsis("MAT-MRK 17")).toEqual("Matt-Mark.17")
		expect(paratextToOsis("MAT-MRK")).toEqual("Matt-Mark")
	})

	it ("should handle same-end ranges", function() {
		expect(paratextToOsis("MAT 18:1-1")).toEqual("Matt.18.1-Matt.18.1")
		expect(paratextToOsis("MAT 19-19")).toEqual("Matt.19-Matt.19")
		expect(paratextToOsis("MAT 20:1-MRK 20:1")).toEqual("Matt.20.1-Mark.20.1")
		expect(paratextToOsis("MAT 21-MRK 21")).toEqual("Matt.21-Mark.21")
	})

	it ("should handle sequences", function() {
		expect(paratextToOsis("MAT 22:2,MAT 22:3,MAT 22-23,MAT 24:1-25")).toEqual("Matt.22.2,Matt.22.3,Matt.22-Matt.23,Matt.24.1-Matt.24.25")
	})

	it ("should handle examples from the readme", function() {
		expect(paratextToOsis("MAT 1:2-3,MAT 1:4")).toEqual("Matt.1.2-Matt.1.3,Matt.1.4")
	})

	it ("should throw exceptions with unexpected input", function() {
		expect(() => paratextToOsis("BBB-MAT 1")).toThrow()
		expect(() => paratextToOsis("MAT-BBB 1")).toThrow()
		expect(() => paratextToOsis("MAT-111 1")).toThrow()
		expect(() => paratextToOsis("MAT 9999")).toThrow()
		expect(() => paratextToOsis("Mat 1")).toThrow()
		expect(() => paratextToOsis("MAT-MRK 1:1a")).toThrow()
		expect(() => paratextToOsis("MAT 23,")).toThrow()
		expect(() => paratextToOsis("Hi.")).toThrow()
		expect(() => paratextToOsis(1)).toThrow()
		expect(() => paratextToOsis("")).toThrow()
	})
})
