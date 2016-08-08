"use strict";
const osisToParatext = require("../es6/osisToParatext")

describe("Tests", function() {
	it ("should handle non-ranges", function() {
		expect(osisToParatext("Matt.1.2")).toEqual("MAT 1:2")
		expect(osisToParatext("Matt.1")).toEqual("MAT 1")
		expect(osisToParatext("Matt")).toEqual("MAT")
	})

	it ("should handle verse ranges", function() {
		expect(osisToParatext("Matt.1.3-Matt.1.8")).toEqual("MAT 1:3-8")
		expect(osisToParatext("Matt.1.4-Matt.2.3")).toEqual("MAT 1:4-2:3")
		expect(osisToParatext("Matt.1.5-Matt.2.3")).toEqual("MAT 1:5-2:3")
		expect(osisToParatext("Matt.1.6-Matt.3")).toEqual("MAT 1:6-MAT 3")
		expect(osisToParatext("Matt.1.7-Mark.2.3")).toEqual("MAT 1:7-MRK 2:3")
		expect(osisToParatext("Matt.1.8-Mark.2")).toEqual("MAT 1:8-MRK 2")
		expect(osisToParatext("Matt.1.9-Mark")).toEqual("MAT 1:9-MRK")
	})

	it ("should handle chapter ranges", function() {
		expect(osisToParatext("Matt.1-Matt.9")).toEqual("MAT 1-9")
		expect(osisToParatext("Matt.1-Matt.10.3")).toEqual("MAT 1-10:3")
		expect(osisToParatext("Matt.1-Mark.11.3")).toEqual("MAT 1-MRK 11:3")
		expect(osisToParatext("Matt.1-Mark.12")).toEqual("MAT 1-MRK 12")
		expect(osisToParatext("Matt.13-Mark")).toEqual("MAT 13-MRK")
	})

	it ("should handle book ranges", function() {
		expect(osisToParatext("Matt-Matt.14")).toEqual("MAT-MAT 14")
		expect(osisToParatext("Matt-Matt.15.3")).toEqual("MAT-MAT 15:3")
		expect(osisToParatext("Matt-Mark.16.3")).toEqual("MAT-MRK 16:3")
		expect(osisToParatext("Matt-Mark.17")).toEqual("MAT-MRK 17")
		expect(osisToParatext("Matt-Mark")).toEqual("MAT-MRK")
	})

	it ("should handle same-end ranges", function() {
		expect(osisToParatext("Matt.18.1-Matt.18.1")).toEqual("MAT 18:1-1")
		expect(osisToParatext("Matt.19-Matt.19")).toEqual("MAT 19-19")
		expect(osisToParatext("Matt.20.1-Mark.20.1")).toEqual("MAT 20:1-MRK 20:1")
		expect(osisToParatext("Matt.21-Mark.21")).toEqual("MAT 21-MRK 21")
	})

	it ("should handle single-chapter books", function() {
		expect(osisToParatext("Phlm-Phlm.1")).toEqual("PHM-PHM 1")
		expect(osisToParatext("Phlm.1-Phlm.1.2")).toEqual("PHM 1-1:2")
		expect(osisToParatext("Phlm-Phlm")).toEqual("PHM-PHM")
		expect(osisToParatext("Phlm.1-Phlm.1.2,Phlm.1")).toEqual("PHM 1-1:2,PHM 1")
	})

	it ("should handle sequences", function() {
		expect(osisToParatext("Matt.22.2,Matt.22.3,Matt.22-Matt.23,Matt.24.1-Matt.24.25")).toEqual("MAT 22:2,MAT 22:3,MAT 22-23,MAT 24:1-25")
	})

	it ("should handle examples from the readme", function() {
		expect(osisToParatext("Matt.1.2-Matt.1.3,Matt.1.4")).toEqual("MAT 1:2-3,MAT 1:4")
	})

	it ("should throw exceptions with unexpected input", function() {
		expect(() => osisToParatext("BBB-Matt.1")).toThrow()
		expect(() => osisToParatext("Matt-BBB.1")).toThrow()
		expect(() => osisToParatext("Matt-111.1")).toThrow()
		expect(() => osisToParatext("Matt.9999")).toThrow()
		expect(() => osisToParatext("MATT.1")).toThrow()
		expect(() => osisToParatext("Matt-Mark.1.1a")).toThrow()
		expect(() => osisToParatext("Matt.23,")).toThrow()
		expect(() => osisToParatext("Hi.")).toThrow()
		expect(() => osisToParatext(1)).toThrow()
		expect(() => osisToParatext("")).toThrow()
	})
})
