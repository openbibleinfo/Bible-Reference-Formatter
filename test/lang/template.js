"use strict";
const osisToEnglish = require("../es6/$LANG")

function loopTest(osises) {
	for (const osisKey of Object.keys(osises)) {
		const [osis, context] = osisKey.split("/")
		for (const style of Object.keys(osises[osis])) {
			expect(osisToEnglish(style, osis, context)).toEqual(osises[osisKey][style])
		}
	}
}

