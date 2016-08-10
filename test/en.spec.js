"use strict";
const convert = require("../es6/en")

function loopTest(osises) {
	for (const osisKey of Object.keys(osises)) {
		const [osis, context] = osisKey.split("/")
		for (const style of Object.keys(osises[osisKey])) {
			expect(convert(style, osis, context)).toEqual(osises[osisKey][style])
		}
	}
}

describe("Exceptions", function() {
	it("should throw when given an invalid style", function() {
		expect(() => convert("INVALID STYLE", "Matt.1")).toThrow()
	})
})

describe("Initialization", function() {
	it ("should initialize", function() {
		loopTest({"Matt.1.2":{"niv-long":"Matthew 1:2","niv-short":"Matt 1:2","niv-shortest":"Mt 1:2"}})
	})
})

describe("Readme", function() {
	it ("should match examples", function() {
		loopTest({"Matt.1.2-Matt.1.3,Matt.1.4":{"niv-long":"Matthew 1:2\u20133,4","niv-short":"Matt 1:2\u20133,4","niv-shortest":"Mt 1:2-3, 4"},"Matt.1.2-Matt.1.3,Matt.1.4/Matt.1":{"niv-long":"vv. 2\u20133,4","niv-short":"vv. 2\u20133,4","niv-shortest":"ver 2-3, 4"},"Matt.1.2-Matt.1.3,Matt.1.4/Matt":{"niv-long":"1:2\u20133,4","niv-short":"1:2\u20133,4","niv-shortest":"1:2-3, 4"}})
	})
})

describe("Book names", function() {
	it ("should match unusual book names", function() {
		loopTest({"Song":{"niv-long":"Song of Songs","niv-short":"Song","niv-shortest":"SS"},"Ps":{"niv-long":"Psalms","niv-short":"Pss","niv-shortest":"Ps"}})
	})
})

describe("`b` ranges", function() {
	it ("should handle `b-same b`", function() {
		loopTest({"Gen-Gen":{"niv-long":"Genesis\u2014Genesis","niv-short":"Gen\u2014Gen","niv-shortest":"Ge-Ge"},"Gen-Gen.1":{"niv-long":"Genesis\u2014ch. 1","niv-short":"Gen\u2014ch. 1","niv-shortest":"Ge-Ge 1"},"Gen-Gen.1.2":{"niv-long":"Genesis\u2014ch. 1:2","niv-short":"Gen\u2014ch. 1:2","niv-shortest":"Ge-Ge 1:2"}})
	})
	it ("should handle `b-different b`", function() {
		loopTest({"Gen-Matt":{"niv-long":"Genesis\u2014Matthew","niv-short":"Gen\u2014Matt","niv-shortest":"Ge-Mt"},"Gen-Matt.1":{"niv-long":"Genesis\u2014Matthew 1","niv-short":"Gen\u2014Matt 1","niv-shortest":"Ge-Mt 1"},"Gen-Matt.1.2":{"niv-long":"Genesis\u2014Matthew 1:2","niv-short":"Gen\u2014Matt 1:2","niv-shortest":"Ge-Mt 1:2"}})
	})
	it ("should handle `b-different, single-chapter b`", function() {
		loopTest({"Gen-Phlm":{"niv-long":"Genesis\u2014Philemon","niv-short":"Gen\u2014Phlm","niv-shortest":"Ge-Phm"},"Gen-Phlm.1":{"niv-long":"Genesis\u2014Philemon","niv-short":"Gen\u2014Phlm","niv-shortest":"Ge-Phm"},"Gen-Phlm.1.2":{"niv-long":"Genesis\u2014Philemon 2","niv-short":"Gen\u2014Phlm 2","niv-shortest":"Ge-Phm 2"}})
	})
	it ("should handle `b-Ps151`", function() {
		loopTest({"Gen-Ps151":{"niv-long":"Genesis\u2014Psalm 151","niv-short":"Gen\u2014Ps 151","niv-shortest":"Ge-Ps 151"},"Gen-Ps151.1":{"niv-long":"Genesis\u2014Psalm 151","niv-short":"Gen\u2014Ps 151","niv-shortest":"Ge-Ps 151"},"Gen-Ps151.1.2":{"niv-long":"Genesis\u2014Psalm 151:2","niv-short":"Gen\u2014Ps 151:2","niv-shortest":"Ge-Ps 151:2"}})
	})
	it ("should handle `Ps-Ps151`", function() {
		loopTest({"Ps-Ps151":{"niv-long":"Psalms\u2014Psalm 151","niv-short":"Pss\u2014Ps 151","niv-shortest":"Ps-Ps 151"},"Ps-Ps151.1":{"niv-long":"Psalms\u2014Psalm 151","niv-short":"Pss\u2014Ps 151","niv-shortest":"Ps-Ps 151"},"Ps-Ps151.1.2":{"niv-long":"Psalms\u2014Psalm 151:2","niv-short":"Pss\u2014Ps 151:2","niv-shortest":"Ps-Ps 151:2"}})
	})
	it ("should handle `single-chapter b-same b`", function() {
		loopTest({"Phlm-Phlm":{"niv-long":"Philemon\u2014Philemon","niv-short":"Phlm\u2014Phlm","niv-shortest":"Phm-Phm"},"Phlm-Phlm.1":{"niv-long":"Philemon\u2014Philemon","niv-short":"Phlm\u2014Phlm","niv-shortest":"Phm-Phm"},"Phlm-Phlm.1.2":{"niv-long":"Philemon\u2014Philemon 2","niv-short":"Phlm\u2014Phlm 2","niv-shortest":"Phm-Phm 2"}})
	})
	it ("should handle `single-chapter b-different b`", function() {
		loopTest({"Phlm-Rev":{"niv-long":"Philemon\u2014Revelation","niv-short":"Phlm\u2014Rev","niv-shortest":"Phm-Rev"},"Phlm-Rev.1":{"niv-long":"Philemon\u2014Revelation 1","niv-short":"Phlm\u2014Rev 1","niv-shortest":"Phm-Rev 1"},"Phlm-Rev.1.2":{"niv-long":"Philemon\u2014Revelation 1:2","niv-short":"Phlm\u2014Rev 1:2","niv-shortest":"Phm-Rev 1:2"}})
	})
	it ("should handle `single-chapter b-different single-chapter b`", function() {
		loopTest({"Phlm-Jude":{"niv-long":"Philemon\u2014Jude","niv-short":"Phlm\u2014Jude","niv-shortest":"Phm-Jude"},"Phlm-Jude.1":{"niv-long":"Philemon\u2014Jude","niv-short":"Phlm\u2014Jude","niv-shortest":"Phm-Jude"},"Phlm-Jude.1.2":{"niv-long":"Philemon\u2014Jude 2","niv-short":"Phlm\u2014Jude 2","niv-shortest":"Phm-Jude 2"}})
	})
	it ("should handle special book ranges", function() {
		loopTest({"1Sam-2Sam":{"niv-long":"1\u20142 Samuel","niv-short":"1\u20142 Sam","niv-shortest":"1-2Sa"},"1Kgs-2Kgs":{"niv-long":"1\u20142 Kings","niv-short":"1\u20142 Kgs","niv-shortest":"1-2Ki"},"1Chr-2Chr":{"niv-long":"1\u20142 Chronicles","niv-short":"1\u20142 Chr","niv-shortest":"1-2Ch"},"1Cor-2Cor":{"niv-long":"1\u20142 Corinthians","niv-short":"1\u20142 Cor","niv-shortest":"1-2Co"},"1Thess-2Thess":{"niv-long":"1\u20142 Thessalonians","niv-short":"1\u20142 Thess","niv-shortest":"1-2Th"},"1Tim-2Tim":{"niv-long":"1\u20142 Timothy","niv-short":"1\u20142 Tim","niv-shortest":"1-2Ti"},"1Pet-2Pet":{"niv-long":"1\u20142 Peter","niv-short":"1\u20142 Pet","niv-shortest":"1-2Pe"},"1John-2John":{"niv-long":"1\u20142 John","niv-short":"1\u20142 John","niv-shortest":"1-2Jn"},"1John-3John":{"niv-long":"1\u20143 John","niv-short":"1\u20143 John","niv-shortest":"1-3Jn"},"2John-3John":{"niv-long":"2\u20143 John","niv-short":"2\u20143 John","niv-shortest":"2-3Jn"},"1Macc-2Macc":{"niv-long":"1\u20142 Maccabees","niv-short":"1\u20142 Macc","niv-shortest":"1-2Mac"},"1Macc-3Macc":{"niv-long":"1\u20143 Maccabees","niv-short":"1\u20143 Macc","niv-shortest":"1-3Mac"},"1Macc-4Macc":{"niv-long":"1\u20144 Maccabees","niv-short":"1\u20144 Macc","niv-shortest":"1-4Mac"},"2Macc-3Macc":{"niv-long":"2\u20143 Maccabees","niv-short":"2\u20143 Macc","niv-shortest":"2-3Mac"},"2Macc-4Macc":{"niv-long":"2\u20144 Maccabees","niv-short":"2\u20144 Macc","niv-shortest":"2-4Mac"},"3Macc-4Macc":{"niv-long":"3\u20144 Maccabees","niv-short":"3\u20144 Macc","niv-shortest":"3-4Mac"},"1Esd-2Esd":{"niv-long":"1\u20142 Esdras","niv-short":"1\u20142 Esd","niv-shortest":"1-2Esd"}})
	})
})

describe("`bc` ranges", function() {
	it ("should handle `bc-same b`", function() {
		loopTest({"Gen.1-Gen":{"niv-long":"Genesis 1\u2014Genesis","niv-short":"Gen 1\u2014Gen","niv-shortest":"Ge 1-Ge"},"Gen.1-Gen.2":{"niv-long":"Genesis 1\u20142","niv-short":"Gen 1\u20142","niv-shortest":"Ge 1-2"},"Gen.1-Gen.2.3":{"niv-long":"Genesis 1\u20142:3","niv-short":"Gen 1\u20142:3","niv-shortest":"Ge 1-2:3"}})
	})
	it ("should handle `bc-same bc`", function() {
		loopTest({"Gen.1-Gen.1":{"niv-long":"Genesis 1\u20141","niv-short":"Gen 1\u20141","niv-shortest":"Ge 1-1"},"Gen.1-Gen.1.2":{"niv-long":"Genesis 1\u20141:2","niv-short":"Gen 1\u20141:2","niv-shortest":"Ge 1-1:2"}})
	})
	it ("should handle `bc-different b`", function() {
		loopTest({"Gen.1-Matt":{"niv-long":"Genesis 1\u2014Matthew","niv-short":"Gen 1\u2014Matt","niv-shortest":"Ge 1-Mt"},"Gen.1-Matt.2":{"niv-long":"Genesis 1\u2014Matthew 2","niv-short":"Gen 1\u2014Matt 2","niv-shortest":"Ge 1-Mt 2"},"Gen.1-Matt.2.3":{"niv-long":"Genesis 1\u2014Matthew 2:3","niv-short":"Gen 1\u2014Matt 2:3","niv-shortest":"Ge 1-Mt 2:3"}})
	})
	it ("should handle `bc-different, single-chapter b`", function() {
		loopTest({"Gen.1-Phlm":{"niv-long":"Genesis 1\u2014Philemon","niv-short":"Gen 1\u2014Phlm","niv-shortest":"Ge 1-Phm"},"Gen.1-Phlm.1":{"niv-long":"Genesis 1\u2014Philemon","niv-short":"Gen 1\u2014Phlm","niv-shortest":"Ge 1-Phm"},"Gen.1-Phlm.1.2":{"niv-long":"Genesis 1\u2014Philemon 2","niv-short":"Gen 1\u2014Phlm 2","niv-shortest":"Ge 1-Phm 2"}})
	})
	it ("should handle `bc-Ps151`", function() {
		loopTest({"Gen.1-Ps151":{"niv-long":"Genesis 1\u2014Psalm 151","niv-short":"Gen 1\u2014Ps 151","niv-shortest":"Ge 1-Ps 151"},"Gen.1-Ps151.1":{"niv-long":"Genesis 1\u2014Psalm 151","niv-short":"Gen 1\u2014Ps 151","niv-shortest":"Ge 1-Ps 151"},"Gen.1-Ps151.1.2":{"niv-long":"Genesis 1\u2014Psalm 151:2","niv-short":"Gen 1\u2014Ps 151:2","niv-shortest":"Ge 1-Ps 151:2"}})
	})
	it ("should handle `Ps.c-Ps151`", function() {
		loopTest({"Ps.1-Ps151":{"niv-long":"Psalms 1\u2014151","niv-short":"Pss 1\u2014151","niv-shortest":"Ps 1-151"},"Ps.1-Ps151.1":{"niv-long":"Psalms 1\u2014151","niv-short":"Pss 1\u2014151","niv-shortest":"Ps 1-151"},"Ps.1-Ps151.1.2":{"niv-long":"Psalms 1\u2014151:2","niv-short":"Pss 1\u2014151:2","niv-shortest":"Ps 1-151:2"}})
	})
	it ("should handle single-chapter bc-same b`", function() {
		loopTest({"Phlm.1-Phlm":{"niv-long":"Philemon\u2014Philemon","niv-short":"Phlm\u2014Phlm","niv-shortest":"Phm-Phm"},"Phlm.1-Phlm.1":{"niv-long":"Philemon\u2014Philemon","niv-short":"Phlm\u2014Phlm","niv-shortest":"Phm-Phm"},"Phlm.1-Phlm.1.2":{"niv-long":"Philemon\u2014Philemon 2","niv-short":"Phlm\u2014Phlm 2","niv-shortest":"Phm-Phm 2"}})
	})
	it ("should handle `single-chapter bc-different b`", function() {
		loopTest({"Phlm.1-Rev":{"niv-long":"Philemon\u2014Revelation","niv-short":"Phlm\u2014Rev","niv-shortest":"Phm-Rev"},"Phlm.1-Rev.1":{"niv-long":"Philemon\u2014Revelation 1","niv-short":"Phlm\u2014Rev 1","niv-shortest":"Phm-Rev 1"},"Phlm.1-Rev.1.2":{"niv-long":"Philemon\u2014Revelation 1:2","niv-short":"Phlm\u2014Rev 1:2","niv-shortest":"Phm-Rev 1:2"}})
	})
	it ("should handle `single-chapter bc-different single-chapter b`", function() {
		loopTest({"Phlm.1-Jude":{"niv-long":"Philemon\u2014Jude","niv-short":"Phlm\u2014Jude","niv-shortest":"Phm-Jude"},"Phlm.1-Jude.1":{"niv-long":"Philemon\u2014Jude","niv-short":"Phlm\u2014Jude","niv-shortest":"Phm-Jude"},"Phlm.1-Jude.1.2":{"niv-long":"Philemon\u2014Jude 2","niv-short":"Phlm\u2014Jude 2","niv-shortest":"Phm-Jude 2"}})
	})
})

describe("`bcv` ranges", function() {
	it ("should handle `bcv-same b`", function() {
		loopTest({"Gen.1.1-Gen":{"niv-long":"Genesis 1:1\u2014Genesis","niv-short":"Gen 1:1\u2014Gen","niv-shortest":"Ge 1:1-Ge"},"Gen.1.1-Gen.2":{"niv-long":"Genesis 1:1\u2014ch. 2","niv-short":"Gen 1:1\u2014ch. 2","niv-shortest":"Ge 1:1-Ge 2"},"Gen.1.1-Gen.2.3":{"niv-long":"Genesis 1:1\u20142:3","niv-short":"Gen 1:1\u20142:3","niv-shortest":"Ge 1:1-2:3"}})
	})
	it ("should handle `bcv-same bc`", function() {
		loopTest({"Gen.1.1-Gen.1":{"niv-long":"Genesis 1:1\u2014ch. 1","niv-short":"Gen 1:1\u2014ch. 1","niv-shortest":"Ge 1:1-Ge 1"},"Gen.1.1-Gen.1.2":{"niv-long":"Genesis 1:1\u20132","niv-short":"Gen 1:1\u20132","niv-shortest":"Ge 1:1-2"}})
	})
	it ("should handle `bcv-same bcv`", function() {
		loopTest({"Gen.1.1-Gen.1.1":{"niv-long":"Genesis 1:1\u20131","niv-short":"Gen 1:1\u20131","niv-shortest":"Ge 1:1-1"}})
	})
	it ("should handle `bcv-different b`", function() {
		loopTest({"Gen.1.1-Matt":{"niv-long":"Genesis 1:1\u2014Matthew","niv-short":"Gen 1:1\u2014Matt","niv-shortest":"Ge 1:1-Mt"},"Gen.1.1-Matt.2":{"niv-long":"Genesis 1:1\u2014Matthew 2","niv-short":"Gen 1:1\u2014Matt 2","niv-shortest":"Ge 1:1-Mt 2"},"Gen.1.1-Matt.2.3":{"niv-long":"Genesis 1:1\u2014Matthew 2:3","niv-short":"Gen 1:1\u2014Matt 2:3","niv-shortest":"Ge 1:1-Mt 2:3"}})
	})
	it ("should handle `bcv-different, single-chapter b`", function() {
		loopTest({"Gen.1.1-Phlm":{"niv-long":"Genesis 1:1\u2014Philemon","niv-short":"Gen 1:1\u2014Phlm","niv-shortest":"Ge 1:1-Phm"},"Gen.1.1-Phlm.1":{"niv-long":"Genesis 1:1\u2014Philemon","niv-short":"Gen 1:1\u2014Phlm","niv-shortest":"Ge 1:1-Phm"},"Gen.1.1-Phlm.1.2":{"niv-long":"Genesis 1:1\u2014Philemon 2","niv-short":"Gen 1:1\u2014Phlm 2","niv-shortest":"Ge 1:1-Phm 2"}})
	})
	it ("should handle `bcv-Ps151`", function() {
		loopTest({"Gen.1.1-Ps151":{"niv-long":"Genesis 1:1\u2014Psalm 151","niv-short":"Gen 1:1\u2014Ps 151","niv-shortest":"Ge 1:1-Ps 151"},"Gen.1.1-Ps151.1":{"niv-long":"Genesis 1:1\u2014Psalm 151","niv-short":"Gen 1:1\u2014Ps 151","niv-shortest":"Ge 1:1-Ps 151"},"Gen.1.1-Ps151.1.2":{"niv-long":"Genesis 1:1\u2014Psalm 151:2","niv-short":"Gen 1:1\u2014Ps 151:2","niv-shortest":"Ge 1:1-Ps 151:2"}})
	})
	it ("should handle `Ps.cv-Ps151`", function() {
		loopTest({"Ps.1.1-Ps151":{"niv-long":"Psalms 1:1\u2014Psalm 151","niv-short":"Pss 1:1\u2014Ps 151","niv-shortest":"Ps 1:1-Ps 151"},"Ps.1.1-Ps151.1":{"niv-long":"Psalms 1:1\u2014Psalm 151","niv-short":"Pss 1:1\u2014Ps 151","niv-shortest":"Ps 1:1-Ps 151"},"Ps.1.1-Ps151.1.2":{"niv-long":"Psalms 1:1\u2014151:2","niv-short":"Pss 1:1\u2014151:2","niv-shortest":"Ps 1:1-151:2"}})
	})
})

describe("`bv` ranges", function() {
	it ("should handle `bv-same b`", function() {
		loopTest({"Phlm.1.1-Phlm":{"niv-long":"Philemon 1\u2014Philemon","niv-short":"Phlm 1\u2014Phlm","niv-shortest":"Phm 1-Phm"},"Phlm.1.1-Phlm.1":{"niv-long":"Philemon 1\u2014Philemon","niv-short":"Phlm 1\u2014Phlm","niv-shortest":"Phm 1-Phm"},"Phlm.1.1-Phlm.1.2":{"niv-long":"Philemon 1\u20132","niv-short":"Phlm 1\u20132","niv-shortest":"Phm 1-2"}})
	})
	it ("should handle `bv-same bv`", function() {
		loopTest({"Phlm.1.1-Phlm.1.1":{"niv-long":"Philemon 1\u20131","niv-short":"Phlm 1\u20131","niv-shortest":"Phm 1-1"}})
	})
	it ("should handle `bv-different b`", function() {
		loopTest({"Phlm.1.1-Rev":{"niv-long":"Philemon 1\u2014Revelation","niv-short":"Phlm 1\u2014Rev","niv-shortest":"Phm 1-Rev"},"Phlm.1.1-Rev.1":{"niv-long":"Philemon 1\u2014Revelation 1","niv-short":"Phlm 1\u2014Rev 1","niv-shortest":"Phm 1-Rev 1"},"Phlm.1.1-Rev.1.2":{"niv-long":"Philemon 1\u2014Revelation 1:2","niv-short":"Phlm 1\u2014Rev 1:2","niv-shortest":"Phm 1-Rev 1:2"}})
	})
	it ("should handle `bv-different single-chapter b`", function() {
		loopTest({"Phlm.1.1-Jude":{"niv-long":"Philemon 1\u2014Jude","niv-short":"Phlm 1\u2014Jude","niv-shortest":"Phm 1-Jude"},"Phlm.1.1-Jude.1":{"niv-long":"Philemon 1\u2014Jude","niv-short":"Phlm 1\u2014Jude","niv-shortest":"Phm 1-Jude"},"Phlm.1.1-Jude.1.2":{"niv-long":"Philemon 1\u2014Jude 2","niv-short":"Phlm 1\u2014Jude 2","niv-shortest":"Phm 1-Jude 2"}})
	})
})

describe("`b` sequences", function() {
	it ("should handle `b,same b`", function() {
		loopTest({"Gen,Gen":{"niv-long":"Genesis; Genesis","niv-short":"Gen; Gen","niv-shortest":"Ge; Ge"},"Gen,Gen.1":{"niv-long":"Genesis; ch. 1","niv-short":"Gen; ch. 1","niv-shortest":"Ge; Ge 1"},"Gen,Gen.1-Gen.2":{"niv-long":"Genesis; chs. 1\u20142","niv-short":"Gen; chs. 1\u20142","niv-shortest":"Ge; Ge 1-2"},"Gen,Gen.1.2":{"niv-long":"Genesis; ch. 1:2","niv-short":"Gen; ch. 1:2","niv-shortest":"Ge; Ge 1:2"}})
	})
	it ("should handle `b,different b`", function() {
		loopTest({"Gen,Matt":{"niv-long":"Genesis; Matthew","niv-short":"Gen; Matt","niv-shortest":"Ge; Mt"},"Gen,Matt.1":{"niv-long":"Genesis; Matthew 1","niv-short":"Gen; Matt 1","niv-shortest":"Ge; Mt 1"},"Gen,Matt.1.2":{"niv-long":"Genesis; Matthew 1:2","niv-short":"Gen; Matt 1:2","niv-shortest":"Ge; Mt 1:2"}})
	})
	it ("should handle `b,different, single-chapter b`", function() {
		loopTest({"Gen,Phlm":{"niv-long":"Genesis; Philemon","niv-short":"Gen; Phlm","niv-shortest":"Ge; Phm"},"Gen,Phlm.1":{"niv-long":"Genesis; Philemon","niv-short":"Gen; Phlm","niv-shortest":"Ge; Phm"},"Gen,Phlm.1.2":{"niv-long":"Genesis; Philemon 2","niv-short":"Gen; Phlm 2","niv-shortest":"Ge; Phm 2"}})
	})
	it ("should handle `b,Ps151`", function() {
		loopTest({"Gen,Ps151":{"niv-long":"Genesis; Psalm 151","niv-short":"Gen; Ps 151","niv-shortest":"Ge; Ps 151"},"Gen,Ps151.1":{"niv-long":"Genesis; Psalm 151","niv-short":"Gen; Ps 151","niv-shortest":"Ge; Ps 151"},"Gen,Ps151.1.2":{"niv-long":"Genesis; Psalm 151:2","niv-short":"Gen; Ps 151:2","niv-shortest":"Ge; Ps 151:2"}})
	})
	it ("should handle `Ps,Ps151`", function() {
		loopTest({"Ps,Ps151":{"niv-long":"Psalms; Psalm 151","niv-short":"Pss; Ps 151","niv-shortest":"Ps; Ps 151"},"Ps,Ps151.1":{"niv-long":"Psalms; Psalm 151","niv-short":"Pss; Ps 151","niv-shortest":"Ps; Ps 151"},"Ps,Ps151.1.2":{"niv-long":"Psalms; Psalm 151:2","niv-short":"Pss; Ps 151:2","niv-shortest":"Ps; Ps 151:2"}})
	})
	it ("should handle `single-chapter b,same b`", function() {
		loopTest({"Phlm,Phlm":{"niv-long":"Philemon; Philemon","niv-short":"Phlm; Phlm","niv-shortest":"Phm; Phm"},"Phlm,Phlm.1":{"niv-long":"Philemon; Philemon","niv-short":"Phlm; Phlm","niv-shortest":"Phm; Phm"},"Phlm,Phlm.1.2":{"niv-long":"Philemon; Philemon 2","niv-short":"Phlm; Phlm 2","niv-shortest":"Phm; Phm 2"}})
	})
	it ("should handle `single-chapter b,different b`", function() {
		loopTest({"Phlm,Rev":{"niv-long":"Philemon; Revelation","niv-short":"Phlm; Rev","niv-shortest":"Phm; Rev"},"Phlm,Rev.1":{"niv-long":"Philemon; Revelation 1","niv-short":"Phlm; Rev 1","niv-shortest":"Phm; Rev 1"},"Phlm,Rev.1.2":{"niv-long":"Philemon; Revelation 1:2","niv-short":"Phlm; Rev 1:2","niv-shortest":"Phm; Rev 1:2"}})
	})
	it ("should handle `single-chapter b,different single-chapter b`", function() {
		loopTest({"Phlm,Jude":{"niv-long":"Philemon; Jude","niv-short":"Phlm; Jude","niv-shortest":"Phm; Jude"},"Phlm,Jude.1":{"niv-long":"Philemon; Jude","niv-short":"Phlm; Jude","niv-shortest":"Phm; Jude"},"Phlm,Jude.1.2":{"niv-long":"Philemon; Jude 2","niv-short":"Phlm; Jude 2","niv-shortest":"Phm; Jude 2"}})
	})
	it ("should handle special book sequences", function() {
		loopTest({"1Sam,2Sam":{"niv-long":"1 and 2 Samuel","niv-short":"1 and 2 Sam","niv-shortest":"1Sa; 2Sa"},"1Kgs,2Kgs":{"niv-long":"1 and 2 Kings","niv-short":"1 and 2 Kgs","niv-shortest":"1Ki; 2Ki"},"1Chr,2Chr":{"niv-long":"1 and 2 Chronicles","niv-short":"1 and 2 Chr","niv-shortest":"1Ch; 2Ch"},"1Cor,2Cor":{"niv-long":"1 and 2 Corinthians","niv-short":"1 and 2 Cor","niv-shortest":"1Co; 2Co"},"1Thess,2Thess":{"niv-long":"1 and 2 Thessalonians","niv-short":"1 and 2 Thess","niv-shortest":"1Th; 2Th"},"1Tim,2Tim":{"niv-long":"1 and 2 Timothy","niv-short":"1 and 2 Tim","niv-shortest":"1Ti; 2Ti"},"1Pet,2Pet":{"niv-long":"1 and 2 Peter","niv-short":"1 and 2 Pet","niv-shortest":"1Pe; 2Pe"},"1John,2John":{"niv-long":"1 and 2 John","niv-short":"1 and 2 John","niv-shortest":"1Jn; 2Jn"},"1John,3John":{"niv-long":"1 and 3 John","niv-short":"1 and 3 John","niv-shortest":"1Jn; 3Jn"},"2John,3John":{"niv-long":"1 and 2 John","niv-short":"1 and 2 John","niv-shortest":"2Jn; 3Jn"},"1Macc,2Macc":{"niv-long":"1 and 2 Maccabees","niv-short":"1 and 2 Macc","niv-shortest":"1Mac; 2Mac"},"1Macc,2Macc,3Macc":{"niv-long":"1, 2, and 3 Maccabees","niv-short":"1, 2, and 3 Macc","niv-shortest":"1Mac; 2Mac; 3Mac"},"1Macc,2Macc,3Macc,4Macc":{"niv-long":"1, 2, 3, and 4 Maccabees","niv-short":"1, 2, 3, and 4 Macc","niv-shortest":"1Mac; 2Mac; 3Mac; 4Mac"},"1Macc,3Macc":{"niv-long":"1 and 3 Maccabees","niv-short":"1 and 3 Macc","niv-shortest":"1Mac; 3Mac"},"1Macc,3Macc,4Macc":{"niv-long":"1, 3, and 4 Maccabees","niv-short":"1, 3, and 4 Macc","niv-shortest":"1Mac; 3Mac; 4Mac"},"1Macc,4Macc":{"niv-long":"1 and 4 Maccabees","niv-short":"1 and 4 Macc","niv-shortest":"1Mac; 4Mac"},"2Macc,3Macc":{"niv-long":"2 and 3 Maccabees","niv-short":"2 and 3 Macc","niv-shortest":"2Mac; 3Mac"},"2Macc,3Macc,4Macc":{"niv-long":"2, 3, and 4 Maccabees","niv-short":"2, 3, and 4 Macc","niv-shortest":"2Mac; 3Mac; 4Mac"},"2Macc,4Macc":{"niv-long":"2 and 4 Maccabees","niv-short":"2 and 4 Macc","niv-shortest":"2Mac; 4Mac"},"3Macc,4Macc":{"niv-long":"3 and 4 Maccabees","niv-short":"3 and 4 Macc","niv-shortest":"3Mac; 4Mac"},"1Esd,2Esd":{"niv-long":"1 and 2 Esdras","niv-short":"1 and 2 Esd","niv-shortest":"1Esd; 2Esd"}})
	})
})

describe("`bc` sequences", function() {
	it ("should handle `bc, same b`", function() {
		loopTest({"Gen.1,Gen":{"niv-long":"Genesis 1; Genesis","niv-short":"Gen 1; Gen","niv-shortest":"Ge 1; Ge"},"Gen.1,Gen.2":{"niv-long":"Genesis 1; 2","niv-short":"Gen 1; 2","niv-shortest":"Ge 1; 2"},"Gen.1,Gen.2.3":{"niv-long":"Genesis 1; 2:3","niv-short":"Gen 1; 2:3","niv-shortest":"Ge 1; 2:3"}})
	})
	it ("should handle `bc, same bc`", function() {
		loopTest({"Gen.1,Gen.1":{"niv-long":"Genesis 1; 1","niv-short":"Gen 1; 1","niv-shortest":"Ge 1; 1"},"Gen.1,Gen.1.2":{"niv-long":"Genesis 1; v. 2","niv-short":"Gen 1; v. 2","niv-shortest":"Ge 1; 1:2"}})
	})
	it ("should handle `bc, different b`", function() {
		loopTest({"Gen.1,Matt":{"niv-long":"Genesis 1; Matthew","niv-short":"Gen 1; Matt","niv-shortest":"Ge 1; Mt"},"Gen.1,Matt.2":{"niv-long":"Genesis 1; Matthew 2","niv-short":"Gen 1; Matt 2","niv-shortest":"Ge 1; Mt 2"},"Gen.1,Matt.2.3":{"niv-long":"Genesis 1; Matthew 2:3","niv-short":"Gen 1; Matt 2:3","niv-shortest":"Ge 1; Mt 2:3"}})
	})
	it ("should handle `bc, different, single-chapter b`", function() {
		loopTest({"Gen.1,Phlm":{"niv-long":"Genesis 1; Philemon","niv-short":"Gen 1; Phlm","niv-shortest":"Ge 1; Phm"},"Gen.1,Phlm.1":{"niv-long":"Genesis 1; Philemon","niv-short":"Gen 1; Phlm","niv-shortest":"Ge 1; Phm"},"Gen.1,Phlm.1.2":{"niv-long":"Genesis 1; Philemon 2","niv-short":"Gen 1; Phlm 2","niv-shortest":"Ge 1; Phm 2"}})
	})
	it ("should handle `bc, Ps151`", function() {
		loopTest({"Gen.1,Ps151":{"niv-long":"Genesis 1; Psalm 151","niv-short":"Gen 1; Ps 151","niv-shortest":"Ge 1; Ps 151"},"Gen.1,Ps151.1":{"niv-long":"Genesis 1; Psalm 151","niv-short":"Gen 1; Ps 151","niv-shortest":"Ge 1; Ps 151"},"Gen.1,Ps151.1.2":{"niv-long":"Genesis 1; Psalm 151:2","niv-short":"Gen 1; Ps 151:2","niv-shortest":"Ge 1; Ps 151:2"}})
	})
	it ("should handle `Ps.c, Ps151`", function() {
		loopTest({"Ps.1,Ps151":{"niv-long":"Psalms 1; 151","niv-short":"Pss 1; 151","niv-shortest":"Ps 1; 151"},"Ps.1,Ps151.1":{"niv-long":"Psalms 1; 151","niv-short":"Pss 1; 151","niv-shortest":"Ps 1; 151"},"Ps.1,Ps151.1.2":{"niv-long":"Psalms 1; 151:2","niv-short":"Pss 1; 151:2","niv-shortest":"Ps 1; 151:2"}})
	})
	it ("should handle single-chapter bc, same b`", function() {
		loopTest({"Phlm.1,Phlm":{"niv-long":"Philemon; Philemon","niv-short":"Phlm; Phlm","niv-shortest":"Phm; Phm"},"Phlm.1,Phlm.1":{"niv-long":"Philemon; Philemon","niv-short":"Phlm; Phlm","niv-shortest":"Phm; Phm"},"Phlm.1,Phlm.1.2":{"niv-long":"Philemon; Philemon 2","niv-short":"Phlm; Phlm 2","niv-shortest":"Phm; Phm 2"}})
	})
	it ("should handle `single-chapter bc, different b`", function() {
		loopTest({"Phlm.1,Rev":{"niv-long":"Philemon; Revelation","niv-short":"Phlm; Rev","niv-shortest":"Phm; Rev"},"Phlm.1,Rev.1":{"niv-long":"Philemon; Revelation 1","niv-short":"Phlm; Rev 1","niv-shortest":"Phm; Rev 1"},"Phlm.1,Rev.1.2":{"niv-long":"Philemon; Revelation 1:2","niv-short":"Phlm; Rev 1:2","niv-shortest":"Phm; Rev 1:2"}})
	})
	it ("should handle `single-chapter bc, different single-chapter b`", function() {
		loopTest({"Phlm.1,Jude":{"niv-long":"Philemon; Jude","niv-short":"Phlm; Jude","niv-shortest":"Phm; Jude"},"Phlm.1,Jude.1":{"niv-long":"Philemon; Jude","niv-short":"Phlm; Jude","niv-shortest":"Phm; Jude"},"Phlm.1,Jude.1.2":{"niv-long":"Philemon; Jude 2","niv-short":"Phlm; Jude 2","niv-shortest":"Phm; Jude 2"}})
	})
})

describe("`bcv` sequences", function() {
	it ("should handle `bcv, same b`", function() {
		loopTest({"Gen.1.1,Gen":{"niv-long":"Genesis 1:1; Genesis","niv-short":"Gen 1:1; Gen","niv-shortest":"Ge 1:1; Ge"},"Gen.1.1,Gen.2":{"niv-long":"Genesis 1:1; ch. 2","niv-short":"Gen 1:1; ch. 2","niv-shortest":"Ge 1:1; Ge 2"},"Gen.1.1,Gen.2-Gen.3":{"niv-long":"Genesis 1:1; chs. 2\u20143","niv-short":"Gen 1:1; chs. 2\u20143","niv-shortest":"Ge 1:1; Ge 2-3"},"Gen.1.1,Gen.2.3":{"niv-long":"Genesis 1:1; 2:3","niv-short":"Gen 1:1; 2:3","niv-shortest":"Ge 1:1; 2:3"},"Gen.1.1,Gen.1.2-Gen.1.3":{"niv-long":"Genesis 1:1,2\u20133","niv-short":"Gen 1:1,2\u20133","niv-shortest":"Ge 1:1, 2-3"}})
	})
	it ("should handle `bcv, same bc`", function() {
		loopTest({"Gen.1.1,Gen.1":{"niv-long":"Genesis 1:1; ch. 1","niv-short":"Gen 1:1; ch. 1","niv-shortest":"Ge 1:1; Ge 1"},"Gen.1.1,Gen.1.2":{"niv-long":"Genesis 1:1,2","niv-short":"Gen 1:1,2","niv-shortest":"Ge 1:1, 2"}})
	})
	it ("should handle `bcv, same bcv`", function() {
		loopTest({"Gen.1.1,Gen.1.1":{"niv-long":"Genesis 1:1,1","niv-short":"Gen 1:1,1","niv-shortest":"Ge 1:1, 1"}})
	})
	it ("should handle `bcv, different b`", function() {
		loopTest({"Gen.1.1,Matt":{"niv-long":"Genesis 1:1; Matthew","niv-short":"Gen 1:1; Matt","niv-shortest":"Ge 1:1; Mt"},"Gen.1.1,Matt.2":{"niv-long":"Genesis 1:1; Matthew 2","niv-short":"Gen 1:1; Matt 2","niv-shortest":"Ge 1:1; Mt 2"},"Gen.1.1,Matt.2.3":{"niv-long":"Genesis 1:1; Matthew 2:3","niv-short":"Gen 1:1; Matt 2:3","niv-shortest":"Ge 1:1; Mt 2:3"}})
	})
	it ("should handle `bcv, different, single-chapter b`", function() {
		loopTest({"Gen.1.1,Phlm":{"niv-long":"Genesis 1:1; Philemon","niv-short":"Gen 1:1; Phlm","niv-shortest":"Ge 1:1; Phm"},"Gen.1.1,Phlm.1":{"niv-long":"Genesis 1:1; Philemon","niv-short":"Gen 1:1; Phlm","niv-shortest":"Ge 1:1; Phm"},"Gen.1.1,Phlm.1.2":{"niv-long":"Genesis 1:1; Philemon 2","niv-short":"Gen 1:1; Phlm 2","niv-shortest":"Ge 1:1; Phm 2"}})
	})
	it ("should handle `bcv, Ps151`", function() {
		loopTest({"Gen.1.1,Ps151":{"niv-long":"Genesis 1:1; Psalm 151","niv-short":"Gen 1:1; Ps 151","niv-shortest":"Ge 1:1; Ps 151"},"Gen.1.1,Ps151.1":{"niv-long":"Genesis 1:1; Psalm 151","niv-short":"Gen 1:1; Ps 151","niv-shortest":"Ge 1:1; Ps 151"},"Gen.1.1,Ps151.1.2":{"niv-long":"Genesis 1:1; Psalm 151:2","niv-short":"Gen 1:1; Ps 151:2","niv-shortest":"Ge 1:1; Ps 151:2"}})
	})
	it ("should handle `Ps.cv, Ps151`", function() {
		loopTest({"Ps.1.1,Ps151":{"niv-long":"Psalms 1:1; Psalm 151","niv-short":"Pss 1:1; Ps 151","niv-shortest":"Ps 1:1; Ps 151"},"Ps.1.1,Ps151.1":{"niv-long":"Psalms 1:1; Psalm 151","niv-short":"Pss 1:1; Ps 151","niv-shortest":"Ps 1:1; Ps 151"},"Ps.1.1,Ps151.1.2":{"niv-long":"Psalms 1:1; 151:2","niv-short":"Pss 1:1; 151:2","niv-shortest":"Ps 1:1; 151:2"}})
	})
})

describe("`bv` sequences", function() {
	it ("should handle `bv, same b`", function() {
		loopTest({"Phlm.1.1,Phlm":{"niv-long":"Philemon 1; Philemon","niv-short":"Phlm 1; Phlm","niv-shortest":"Phm 1; Phm"},"Phlm.1.1,Phlm.1":{"niv-long":"Philemon 1; Philemon","niv-short":"Phlm 1; Phlm","niv-shortest":"Phm 1; Phm"},"Phlm.1.1,Phlm.1.2":{"niv-long":"Philemon 1,2","niv-short":"Phlm 1,2","niv-shortest":"Phm 1, 2"}})
	})
	it ("should handle `bv, same bcv`", function() {
		loopTest({"Phlm.1.1,Phlm.1.1":{"niv-long":"Philemon 1,1","niv-short":"Phlm 1,1","niv-shortest":"Phm 1, 1"}})
	})
	it ("should handle `bv, different b`", function() {
		loopTest({"Phlm.1.1,Rev":{"niv-long":"Philemon 1; Revelation","niv-short":"Phlm 1; Rev","niv-shortest":"Phm 1; Rev"},"Phlm.1.1,Rev.1":{"niv-long":"Philemon 1; Revelation 1","niv-short":"Phlm 1; Rev 1","niv-shortest":"Phm 1; Rev 1"},"Phlm.1.1,Rev.1.2":{"niv-long":"Philemon 1; Revelation 1:2","niv-short":"Phlm 1; Rev 1:2","niv-shortest":"Phm 1; Rev 1:2"}})
	})
	it ("should handle `bv, different single-chapter b`", function() {
		loopTest({"Phlm.1.1,Jude":{"niv-long":"Philemon 1; Jude","niv-short":"Phlm 1; Jude","niv-shortest":"Phm 1; Jude"},"Phlm.1.1,Jude.1":{"niv-long":"Philemon 1; Jude","niv-short":"Phlm 1; Jude","niv-shortest":"Phm 1; Jude"},"Phlm.1.1,Jude.1.2":{"niv-long":"Philemon 1; Jude 2","niv-short":"Phlm 1; Jude 2","niv-shortest":"Phm 1; Jude 2"}})
	})
})

describe("Context", function() {
	it ("should handle `b^c`", function() {
		loopTest({"Gen.1/Gen":{"niv-long":"ch. 1","niv-short":"ch. 1","niv-shortest":"Ge 1"},"Gen.1-Gen.2/Gen":{"niv-long":"chs. 1\u20142","niv-short":"chs. 1\u20142","niv-shortest":"Ge 1-2"},"Gen.1-Matt.1/Gen":{"niv-long":"chs. 1\u2014Matthew 1","niv-short":"chs. 1\u2014Matt 1","niv-shortest":"Ge 1-Mt 1"}})
	})
	it ("should handle `b^cv`", function() {
		loopTest({"Gen.1.1/Gen":{"niv-long":"1:1","niv-short":"1:1","niv-shortest":"1:1"},"Gen.1.1-Gen.2/Gen":{"niv-long":"1:1\u2014ch. 2","niv-short":"1:1\u2014ch. 2","niv-shortest":"1:1-Ge 2"},"Gen.1.1-Matt.1/Gen":{"niv-long":"1:1\u2014Matthew 1","niv-short":"1:1\u2014Matt 1","niv-shortest":"1:1-Mt 1"}})
	})
	it ("should handle `b1^c`", function() {
		loopTest({"Phlm.1/Phlm":{"niv-long":"Philemon","niv-short":"Phlm","niv-shortest":"Phm"}})
	})
	it ("should handle `b1^cv`", function() {
		loopTest({"Phlm.1.1-Phlm.1.2/Phlm":{"niv-long":"vv. 1\u20132","niv-short":"vv. 1\u20132","niv-shortest":"ver 1-2"},"Phlm.1.1-Jude.1.2/Phlm":{"niv-long":"vv. 1\u2014Jude 2","niv-short":"vv. 1\u2014Jude 2","niv-shortest":"ver 1-Jude 2"}})
	})
})

describe("Not switching styles", function() {
	it ("should work when not switching styles", function() {
		expect(() => convert("niv-long", "Matt.1")).not.toThrow()
		expect(() => convert("niv-long", "Matt.2")).not.toThrow()
	})
})
