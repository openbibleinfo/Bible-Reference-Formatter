"use strict"
/* global require, describe, it, expect */
const OsisFormatter = require("../es6/osisFormatter")
const f = new OsisFormatter
f.setBooks({"Matt": ["Matt"], "Mark": ["Mark"], "Phlm": ["Phlm"], "Jude": ["Jude"]})

const vars = {
	"start:b": "Matt",
	"start:bc": "Matt.1",
	"start:bcv": "Matt.1.2",
	"start:bv": "Phlm.1.2",
	"start:c": "Matt.1",
	"start:cv": "Matt.1.2",
	"start:v": "Matt.1.2",
	"^b": "Matt",
	"^bcv": "Mark.5.6",
	"^c": "Matt.2",
	"^cv": "Matt.2.3",
	"^v": "Matt.1.2",
	"b1^b": "Phlm",
	"b1^c": "Phlm.1",
	"b1^cv": "Phlm.1.2",
	"b1^v": "Phlm.1.2",

	"end:b": "Mark",
	"end:bc": "Mark.3",
	"end:bcv": "Mark.3.4",
	"end:b1v": "Jude.1.4",
	"end:bv": "Phlm.1.4",
	"end:^v": "Matt.2.4",
	"end:c": "Matt.3",
	"end:c1": "Phlm.1",
	"end:cv": "Matt.3.4",
	"end:v": "Matt.1.4"
}

function formatCheck(check) {
	for (const pattern of Object.keys(vars).sort(function(a, b) {if (a.length > b.length) return -1; if (a.length === b.length) return 0; return 1})) {
		let escaped = pattern.replace("^", "\\^")
		check = check.replace(RegExp(escaped, "g"), vars[pattern])
	}
	return check
}

function checkResults(expectedResult, formats) {
	for (const format of Object.keys(formats)) {
		//console.log(format)
		for (const test of formats[format]) {
			let [check, options, context] = test
			//console.log(" ", check)
			check = formatCheck(check)
			//console.log(" ", check)
			if (typeof context === "string") {
				context = formatCheck(context)
			}
			f.setOptions(options)
			const result = f.format(check, context).indexOf("#") >= 0
			expect(result).toEqual(expectedResult)
		}
	}
}

describe("Individuals", function() {
	it("should handle positives", function() {
		checkResults(true, {
			"b": [["start:b", {"b":"#"}], ["start:bc", {"b":"#"}], ["start:bcv", {"b":"#"}]],
			"bc": [["start:bc", {"b.c":"#"}]],
			"bcv": [["start:bcv", {"b.c":"#"}], ["start:bcv", {"c.v":"#"}]],
			"bv": [["start:bv", {"b.v":"#"}]],
			"bv-v": [["start:bv-end:bv", {"bv-v":"#"}]],
			"c": [["start:c", {"c":"#"}], ["start:bc", {"c":"#"}], ["start:bcv", {"c":"#"}], ["start:c", {"c":"#"}, "^b"], ["start:cv", {"c":"#"}, "^b"]],
			"cv": [["start:cv", {"c.v":"#"}], ["start:bcv", {"c.v":"#"}], ["start:v", {"c.v":"#"}, "^cv"], ["start:v", {"c.v":"#"}, "^bcv"]],
			"v": [["start:cv", {"v":"#"}], ["start:bcv", {"v":"#"}], ["start:v", {"v":"#"}, "^cv"], ["start:v", {"v":"#"}, "^bcv"]],
			"^c": [["end:c", {"^c":"#"}, "start:bcv"]],
			"^cv": [["end:cv", {"^cv":"#"}, "start:bcv"]],
			"^v": [["end:v", {"^v":"#"}, "start:bcv"]],
			"b1^c": [["b1^c", {"singleChapterFormat":"bv", "b1^c": "#"}, "start:bv"], ["b1^c", {"singleChapterFormat":"bcv", "b1^c": "#"}, "start:bv"]],
			"b1^cv": [["b1^cv", {"singleChapterFormat":"bcv", "b1^cv": "#"}, "b1^b"]],
			"b1^v": [["b1^v", {"singleChapterFormat":"bcv", "b1^v": "#"}, "b1^v"], ["b1^v", {"singleChapterFormat":"b", "b1^v": "#"}, "b1^v"]]
		})
	})

	it("should handle negatives", function() {
		checkResults(false, {
			"b1^c": [["b1^c", {"singleChapterFormat":"b", "b1^c": "#"}, "start:bv"]],
			"b1^cv": [["b1^cv", {"singleChapterFormat":"bv", "b1^cv": "#"}, "b1^b"], ["b1^cv", {"singleChapterFormat":"b", "b1^cv": "#"}, "b1^b"]],
		})
	})
})

describe("Ranges", function() {
	it("should handle generic positives", function() {
		checkResults(true, {
			"-": [["start:b-end:b", {"-":"#"}]],
			"-b": [["start:b-end:b", {"-b":"#"}], ["start:b-end:bc", {"-b":"#"}], ["start:b-end:bcv", {"-bcv":"#"}]],
			"-bc": [["start:b-end:bc", {"-b":"#"}], ["start:b-end:bcv", {"-bcv":"#"}]],
			"-bcv": [["start:b-end:bcv", {"-bcv":"#"}]],
			"-bv": [["start:b-end:bv", {"-bv":"#"}]],
			"-c": [["start:b-end:c", {"-c":"#"}], ["start:b-end:cv", {"-c":"#"}]],
			"-v": [["start:bc-end:v", {"-v":"#"}]],
		})
	})

	it("should handle generic negatives", function() {
		checkResults(false, {
			"-b": [["start:b-end:cv", {"-b":"#"}]],
			"-bc": [["start:bc-end:c", {"-b":"#"}]],
			"-bcv": [["start:b-end:c", {"-b":"#"}]],
		})
	})

	it("should handle `b-` positives", function() {
		checkResults(true, {
			"b-b": [["start:b-end:b", {"b-b":"#"}], ["start:b-end:bc", {"b-b":"#"}], ["start:b-end:bcv", {"b-b":"#"}]],
			"b-bc": [["start:b-end:bc", {"b-bc":"#"}], ["start:b-end:bcv", {"b-bc":"#"}]],
			"b-bcv": [["start:b-end:bcv", {"b-bc":"#"}]],
			"b-bv": [["start:b-end:bv", {"b-bv":"#"}]],
			"b-c": [["start:b-end:c", {"b-c":"#"}], ["start:b-end:cv", {"b-c":"#"}]],
			"b-cv": [["start:b-end:cv", {"b-cv":"#"}]],
			"b-v": [["b1^b-end:bv", {"b-v":"#"}]],
		})
	})

	it("should handle `b-` negatives", function() {
		checkResults(false, {
			"b-bc": [["start:b-end:b", {"b-bc":"#"}]],
			"b-bcv": [["start:b-end:bc", {"b-bcv":"#"}]],
			"b-bv": [["start:b-end:bv", {"b-bv":"#", "singleChapterFormat":"bcv"}]],
			"b-cv": [["start:b-end:c", {"b-cv":"#"}]],
			"b-v": [["start:b-end:v", {"b-v":"#"}]],
		})
	})

	it("should handle `bc-` positives", function() {
		checkResults(true, {
			"bc-b": [["start:bc-end:b", {"bc-b":"#"}], ["start:bc-end:bc", {"bc-b":"#"}], ["start:bc-end:bcv", {"bc-b":"#"}]],
			"bc-bc": [["start:bc-end:bc", {"bc-bc":"#"}], ["start:bc-end:bcv", {"bc-bc":"#"}]],
			"bc-bcv": [["start:bc-end:bcv", {"bc-bc":"#"}]],
			"bc-bv": [["start:bc-end:bv", {"bc-bv":"#"}]],
			"bc-c": [["start:bc-end:c", {"bc-c":"#"}], ["start:bc-end:cv", {"bc-c":"#"}]],
			"bc-cv": [["start:bc-end:cv", {"bc-cv":"#"}]],
			"bc-v": [["b1^c-end:bv", {"bc-v":"#"}]],
		})
	})

	it("should handle `bcv-` positives", function() {
		checkResults(true, {
			"bcv-b": [["start:bcv-end:b", {"bcv-b":"#"}], ["start:bcv-end:bc", {"bcv-b":"#"}], ["start:bcv-end:bcv", {"bcv-b":"#"}]],
			"bcv-bc": [["start:bcv-end:bc", {"bcv-bc":"#"}], ["start:bcv-end:bcv", {"bcv-bc":"#"}]],
			"bcv-bcv": [["start:bcv-end:bcv", {"bcv-bc":"#"}]],
			"bcv-bv": [["start:bcv-end:bv", {"bcv-bv":"#"}]],
			"bcv-c": [["start:bcv-end:c", {"bcv-c":"#"}], ["start:bcv-end:cv", {"bcv-c":"#"}]],
			"bcv-cv": [["start:bcv-end:cv", {"bcv-cv":"#"}]],
			"bcv-v": [["b1^cv-end:bv", {"bcv-v":"#", "singleChapterFormat": "bcv"}]],
		})
	})

	it("should handle `bcv-` negatives", function() {
		checkResults(false, {
			"bcv-v": [["b1^cv-end:bv", {"bcv-v":"#", "singleChapterFormat": "bv"}], ["b1^cv-end:bv", {"bcv-v":"#", "singleChapterFormat": "b"}]],
		})
	})

	it("should handle `bv-` positives", function() {
		checkResults(true, {
			"bv-b": [["start:bv-end:b", {"bv-b":"#"}], ["start:bv-end:bc", {"bv-b":"#"}], ["start:bv-end:bcv", {"bv-b":"#"}]],
			"bv-bc": [["start:bv-end:bc", {"bv-bc":"#"}], ["start:bv-end:bcv", {"bv-bc":"#"}]],
			"bv-bcv": [["start:bv-end:bcv", {"bv-bc":"#"}]],
			"bv-bv": [["start:bv-end:b1v", {"bv-bv":"#"}]],
			"bv-c": [["start:bv-end:c1", {"bv-c":"#"}]],
			"bv-v": [["start:bv-end:bv", {"bv-v":"#", "singleChapterFormat": "bv"}]],
		})
	})

	it("should handle `bv-` negatives", function() {
		checkResults(false, {
			"bv-cv": [["start:bv-Phlm.2.1", {"bv-cv":"#", "singleChapterFormat": "bcv"}]], // itisn't possible to make this range happen.
			"bv-v": [["start:bv-end:bv", {"bv-v":"#", "singleChapterFormat": "bcv"}]],
		})
	})

	it("should handle `c-` positives", function() {
		checkResults(true, {
			"c-b": [["start:c-end:b", {"c-b":"#"}], ["start:c-end:bc", {"c-b":"#"}], ["start:c-end:bcv", {"c-b":"#"}]],
			"c-bc": [["start:c-end:bc", {"c-bc":"#"}], ["start:bc-end:bcv", {"c-bc":"#"}]],
			"c-bcv": [["start:c-end:bcv", {"c-bc":"#"}]],
			"c-bv": [["start:c-end:bv", {"c-bv":"#"}]],
			"c-c": [["start:c-end:c", {"c-c":"#"}], ["start:c-end:cv", {"c-c":"#"}]],
			"c-cv": [["start:c-end:cv", {"c-cv":"#"}]],
			"c-v": [["b1^c-end:bv", {"c-v":"#"}]],
		})
	})

	it("should handle `cv-` positives", function() {
		checkResults(true, {
			"cv-b": [["start:cv-end:b", {"cv-b":"#"}], ["start:cv-end:bc", {"cv-b":"#"}], ["start:cv-end:bcv", {"cv-b":"#"}]],
			"cv-bc": [["start:cv-end:bc", {"cv-bc":"#"}], ["start:cv-end:bcv", {"cv-bc":"#"}]],
			"cv-bcv": [["start:cv-end:bcv", {"cv-bc":"#"}]],
			"cv-bv": [["start:cv-end:bv", {"cv-bv":"#"}]],
			"cv-c": [["start:cv-end:c", {"cv-c":"#"}], ["start:cv-end:cv", {"cv-c":"#"}]],
			"cv-cv": [["start:cv-end:cv", {"cv-cv":"#"}]],
			"cv-v": [["b1^cv-end:bv", {"cv-v":"#", "singleChapterFormat": "bcv"}]],
		})
	})

	it("should handle `cv-` negatives", function() {
		checkResults(false, {
			"cv-v": [["b1^cv-end:bv", {"cv-v":"#", "singleChapterFormat": "bv"}], ["b1^cv-end:bv", {"cv-v":"#", "singleChapterFormat": "b"}]],
		})
	})


	it("should handle `v-` positives", function() {
		checkResults(true, {
			"v-b": [["start:v-end:b", {"v-b":"#"}], ["start:v-end:bc", {"v-b":"#"}], ["start:v-end:bcv", {"v-b":"#"}]],
			"v-bc": [["start:v-end:bc", {"v-bc":"#"}], ["start:v-end:bcv", {"v-bc":"#"}]],
			"v-bcv": [["start:v-end:bcv", {"v-bc":"#"}]],
			"v-bv": [["start:v-end:bv", {"v-bv":"#"}]],
			"v-c": [["start:v-end:c", {"v-c":"#"}], ["start:v-end:cv", {"v-c":"#"}]],
			"v-cv": [["start:v-end:cv", {"v-cv":"#"}]],
			"v-v": [["b1^v-end:bv", {"v-v":"#", "singleChapterFormat": "bcv"}], ["b1^v-end:bv", {"v-v":"#", "singleChapterFormat": "bv"}], ["b1^v-end:bv", {"v-v":"#", "singleChapterFormat": "b"}]],
		})
	})

	// `^` properties never appear for ranges.
	it("should handle `^c-` negatives", function() {
		checkResults(false, {
			"^c-v": [["^c-end:^v", {"^c-v":"#"}, "start:bc"]],
		})
	})

	it("should handle `^cv-` negatives", function() {
		checkResults(false, {
			"^cv-v": [["^cv-end:^v", {"^cv-v":"#"}, "start:bc"]],
		})
	})

	it("should handle `^v-` negatives", function() {
		checkResults(false, {
			"^v-v": [["^cv-end:^v", {"^cv-v":"#"}, "start:bc"]],
		})
	})

	it("should handle `b1^c-` negatives", function() {
		checkResults(false, {
			"b1^c-v": [["b1^c-end:bv", {"b1^c-v":"#", "singleChapterFormat":"bcv"}, "b1^b"]],
		})
	})

	it("should handle `b1^cv-` negatives", function() {
		checkResults(false, {
			"b1^cv-v": [["b1^v-end:bv", {"b1^cv-v":"#", "singleChapterFormat":"bcv"}, "b1^b"]],
		})
	})

	it("should handle `b1^v-` negatives", function() {
		checkResults(false, {
			"b1^v-v": [["b1^v-end:bv", {"b1^v-v":"#", "singleChapterFormat":"bv"}, "b1^b"]],
		})
	})
})

describe("Sequences", function() {
	it("should handle generic positives", function() {
		checkResults(true, {
			",": [["start:b,end:b", {",":"#"}]],
			",b": [["start:b,end:b", {",b":"#"}], ["start:b,end:bc", {",b":"#"}], ["start:b,end:bcv", {",bcv":"#"}]],
			",bc": [["start:b,end:bc", {",b":"#"}], ["start:b,end:bcv", {",bcv":"#"}]],
			",bcv": [["start:b,end:bcv", {",bcv":"#"}]],
			",bv": [["start:b,end:bv", {",bv":"#"}]],
			",c": [["start:b,end:c", {",c":"#"}], ["start:b,end:cv", {",c":"#"}]],
			",v": [["start:bc,end:v", {",v":"#"}]],
		})
	})

	it("should handle generic negatives", function() {
		checkResults(false, {
			",b": [["start:b,end:cv", {",b":"#"}]],
			",bc": [["start:bc,end:c", {",b":"#"}]],
			",bcv": [["start:b,end:c", {",b":"#"}]],
		})
	})

	it("should handle `b,` positives", function() {
		checkResults(true, {
			"b,b": [["start:b,end:b", {"b,b":"#"}], ["start:b,end:bc", {"b,b":"#"}], ["start:b,end:bcv", {"b,b":"#"}]],
			"b,bc": [["start:b,end:bc", {"b,bc":"#"}], ["start:b,end:bcv", {"b,bc":"#"}]],
			"b,bcv": [["start:b,end:bcv", {"b,bc":"#"}]],
			"b,bv": [["start:b,end:bv", {"b,bv":"#"}]],
			"b,c": [["start:b,end:c", {"b,c":"#"}], ["start:b,end:cv", {"b,c":"#"}]],
			"b,cv": [["start:b,end:cv", {"b,cv":"#"}]],
			"b,v": [["b1^b,end:bv", {"b,v":"#"}]],
		})
	})

	it("should handle `b,` negatives", function() {
		checkResults(false, {
			"b,bc": [["start:b,end:b", {"b,bc":"#"}]],
			"b,bcv": [["start:b,end:bc", {"b,bcv":"#"}]],
			"b,bv": [["start:b,end:bv", {"b,bv":"#", "singleChapterFormat":"bcv"}]],
			"b,cv": [["start:b,end:c", {"b,cv":"#"}]],
			"b,v": [["start:b,end:v", {"b,v":"#"}]],
		})
	})

	it("should handle `bc,` positives", function() {
		checkResults(true, {
			"bc,b": [["start:bc,end:b", {"bc,b":"#"}], ["start:bc,end:bc", {"bc,b":"#"}], ["start:bc,end:bcv", {"bc,b":"#"}]],
			"bc,bc": [["start:bc,end:bc", {"bc,bc":"#"}], ["start:bc,end:bcv", {"bc,bc":"#"}]],
			"bc,bcv": [["start:bc,end:bcv", {"bc,bc":"#"}]],
			"bc,bv": [["start:bc,end:bv", {"bc,bv":"#"}]],
			"bc,c": [["start:bc,end:c", {"bc,c":"#"}], ["start:bc,end:cv", {"bc,c":"#"}]],
			"bc,cv": [["start:bc,end:cv", {"bc,cv":"#"}]],
			"bc,v": [["b1^c,end:bv", {"bc,v":"#"}]],
		})
	})

	it("should handle `bcv,` positives", function() {
		checkResults(true, {
			"bcv,b": [["start:bcv,end:b", {"bcv,b":"#"}], ["start:bcv,end:bc", {"bcv,b":"#"}], ["start:bcv,end:bcv", {"bcv,b":"#"}]],
			"bcv,bc": [["start:bcv,end:bc", {"bcv,bc":"#"}], ["start:bcv,end:bcv", {"bcv,bc":"#"}]],
			"bcv,bcv": [["start:bcv,end:bcv", {"bcv,bc":"#"}]],
			"bcv,bv": [["start:bcv,end:bv", {"bcv,bv":"#"}]],
			"bcv,c": [["start:bcv,end:c", {"bcv,c":"#"}], ["start:bcv,end:cv", {"bcv,c":"#"}]],
			"bcv,cv": [["start:bcv,end:cv", {"bcv,cv":"#"}]],
			"bcv,v": [["b1^cv,end:bv", {"bcv,v":"#", "singleChapterFormat": "bcv"}]],
		})
	})

	it("should handle `bcv,` negatives", function() {
		checkResults(false, {
			"bcv,v": [["b1^cv,end:bv", {"bcv,v":"#", "singleChapterFormat": "bv"}], ["b1^cv,end:bv", {"bcv,v":"#", "singleChapterFormat": "b"}]],
		})
	})

	it("should handle `bv,` positives", function() {
		checkResults(true, {
			"bv,b": [["start:bv,end:b", {"bv,b":"#"}], ["start:bv,end:bc", {"bv,b":"#"}], ["start:bv,end:bcv", {"bv,b":"#"}]],
			"bv,bc": [["start:bv,end:bc", {"bv,bc":"#"}], ["start:bv,end:bcv", {"bv,bc":"#"}]],
			"bv,bcv": [["start:bv,end:bcv", {"bv,bc":"#"}]],
			"bv,bv": [["start:bv,end:b1v", {"bv,bv":"#"}]],
			"bv,c": [["start:bv,end:c1", {"bv,c":"#"}]],
			"bv,v": [["start:bv,end:bv", {"bv,v":"#", "singleChapterFormat": "bv"}]],
		})
	})

	it("should handle `bv,` negatives", function() {
		checkResults(false, {
			"bv,cv": [["start:bv,Phlm.2.1", {"bv,cv":"#", "singleChapterFormat": "bcv"}]], // It isn't possible to make this sequence happen.
			"bv,v": [["start:bv,end:bv", {"bv,v":"#", "singleChapterFormat": "bcv"}]],
		})
	})

	it("should handle `c,` positives", function() {
		checkResults(true, {
			"c,b": [["start:c,end:b", {"c,b":"#"}], ["start:c,end:bc", {"c,b":"#"}], ["start:c,end:bcv", {"c,b":"#"}]],
			"c,bc": [["start:c,end:bc", {"c,bc":"#"}], ["start:bc,end:bcv", {"c,bc":"#"}]],
			"c,bcv": [["start:c,end:bcv", {"c,bc":"#"}]],
			"c,bv": [["start:c,end:bv", {"c,bv":"#"}]],
			"c,c": [["start:c,end:c", {"c,c":"#"}], ["start:c,end:cv", {"c,c":"#"}]],
			"c,cv": [["start:c,end:cv", {"c,cv":"#"}]],
			"c,v": [["b1^c,end:bv", {"c,v":"#"}]],
		})
	})

	it("should handle `cv,` positives", function() {
		checkResults(true, {
			"cv,b": [["start:cv,end:b", {"cv,b":"#"}], ["start:cv,end:bc", {"cv,b":"#"}], ["start:cv,end:bcv", {"cv,b":"#"}]],
			"cv,bc": [["start:cv,end:bc", {"cv,bc":"#"}], ["start:cv,end:bcv", {"cv,bc":"#"}]],
			"cv,bcv": [["start:cv,end:bcv", {"cv,bc":"#"}]],
			"cv,bv": [["start:cv,end:bv", {"cv,bv":"#"}]],
			"cv,c": [["start:cv,end:c", {"cv,c":"#"}], ["start:cv,end:cv", {"cv,c":"#"}]],
			"cv,cv": [["start:cv,end:cv", {"cv,cv":"#"}]],
			"cv,v": [["b1^cv,end:bv", {"cv,v":"#", "singleChapterFormat": "bcv"}]],
		})
	})

	it("should handle `cv,` negatives", function() {
		checkResults(false, {
			"cv,v": [["b1^cv,end:bv", {"cv,v":"#", "singleChapterFormat": "bv"}], ["b1^cv,end:bv", {"cv,v":"#", "singleChapterFormat": "b"}]],
		})
	})


	it("should handle `v,` positives", function() {
		checkResults(true, {
			"v,b": [["start:v,end:b", {"v,b":"#"}], ["start:v,end:bc", {"v,b":"#"}], ["start:v,end:bcv", {"v,b":"#"}]],
			"v,bc": [["start:v,end:bc", {"v,bc":"#"}], ["start:v,end:bcv", {"v,bc":"#"}]],
			"v,bcv": [["start:v,end:bcv", {"v,bc":"#"}]],
			"v,bv": [["start:v,end:bv", {"v,bv":"#"}]],
			"v,c": [["start:v,end:c", {"v,c":"#"}], ["start:v,end:cv", {"v,c":"#"}]],
			"v,cv": [["start:v,end:cv", {"v,cv":"#"}]],
			"v,v": [["b1^v,end:bv", {"v,v":"#", "singleChapterFormat": "bcv"}], ["b1^v,end:bv", {"v,v":"#", "singleChapterFormat": "bv"}], ["b1^v,end:bv", {"v,v":"#", "singleChapterFormat": "b"}]],
		})
	})

	// `^` properties never appear for sequences.
	it("should handle `^c,` negatives", function() {
		checkResults(false, {
			"^c,v": [["^c,end:^v", {"^c,v":"#"}, "start:bc"]],
		})
	})

	it("should handle `^cv,` negatives", function() {
		checkResults(false, {
			"^cv,v": [["^cv,end:^v", {"^cv,v":"#"}, "start:bc"]],
		})
	})

	it("should handle `^v,` negatives", function() {
		checkResults(false, {
			"^v,v": [["^cv,end:^v", {"^cv,v":"#"}, "start:bc"]],
		})
	})

	it("should handle `b1^c,` negatives", function() {
		checkResults(false, {
			"b1^c,v": [["b1^c,end:bv", {"b1^c,v":"#", "singleChapterFormat":"bcv"}, "b1^b"]],
		})
	})

	it("should handle `b1^cv,` negatives", function() {
		checkResults(false, {
			"b1^cv,v": [["b1^v,end:bv", {"b1^cv,v":"#", "singleChapterFormat":"bcv"}, "b1^b"]],
		})
	})

	it("should handle `b1^v,` negatives", function() {
		checkResults(false, {
			"b1^v,v": [["b1^v,end:bv", {"b1^v,v":"#", "singleChapterFormat":"bv"}, "b1^b"]],
		})
	})
})

describe("Separators", function() {
	it("should handle generic positives", function() {
		checkResults(true, {
			".": [["start:bc", {".":"#"}]],
			".c": [["start:bc", {".c":"#"}], ["start:b-end:bv", {".c":"#", "singleChapterFormat": "bcv"}]],
			".v": [["start:bv", {".v":"#"}]],
		})
	})

	it("should handle generic negatives", function() {
		checkResults(false, {
			".c": [["start:b-end:cv", {".c":"#"}], ["start:b-end:bv", {".c":"#", "singleChapterFormat": "bv"}], ["start:b-end:bv", {".c":"#", "singleChapterFormat": "b"}]],
			".v": [["start:bcv", {".v":"#"}], ["start:bc-end:v", {".v":"#"}]],
		})
	})

	it("should handle `b.c` positives", function() {
		checkResults(true, {
			"b.c": [["start:bc", {"b.c":"#"}], ["start:bcv", {"b.c":"#"}]],
		})
	})

	it("should handle `b.c` negatives", function() {
		checkResults(false, {
			"b.c": [["start:b-end:cv", {".c":"#"}]],
		})
	})

	it("should handle `b1.c` positives", function() {
		checkResults(true, {
			"b1.c": [["b1^c", {"b1.c":"#"}], ["b1^v", {"b1.c":"#","singleChapterFormat": "bcv"}]],
		})
	})

	it("should handle `b.c` negatives", function() {
		checkResults(false, {
			"b1.c": [["b1^v", {"b1.c":"#","singleChapterFormat": "bv"}], ["b1^v", {"b1.c":"#","singleChapterFormat": "b"}]],
		})
	})

	it("should handle `c.v` positives", function() {
		checkResults(true, {
			"c.v": [["start:bcv", {"c.v":"#"}], ["start:b-end:cv", {"c.v":"#"}]],
		})
	})

	it("should handle `^c.v` negatives", function() {
		checkResults(false, {
			"^c.v": [["start:bcv", {"b1^c.v":"#"}, "^c"], ["b1^v", {"b1^c.v":"#","singleChapterFormat":"bcv"}, "b1^b"]],
		})
	})

	it("should handle `b1^c.v` negatives", function() {
		checkResults(false, {
			"b1^c.v": [["b1^v", {"b1^c.v":"#","singleChapterFormat":"bcv"}, "b1^b"]],
		})
	})

})
