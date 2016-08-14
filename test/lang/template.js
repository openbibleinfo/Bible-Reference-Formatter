"use strict"
/* global require, describe, it, expect */
const osisToLang = require("../es6/$LANG")

function loopTest(osises) {
	for (const osisKey of Object.keys(osises)) {
		const [osis, context] = osisKey.split("/")
		for (const style of Object.keys(osises[osisKey])) {
			expect(osisToLang(style, osis, context)).toEqual(osises[osisKey][style])
		}
	}
}

describe("Exceptions", function() {
	it("should throw when given an invalid style", function() {
		expect(() => osisToLang("INVALID STYLE", "Matt.1")).toThrow()
	})
})

