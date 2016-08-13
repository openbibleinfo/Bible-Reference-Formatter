"use strict"
/* global require, console */
const fs = require("fs")
const dataPath = "."
const outPath = ".."

const template = fs.readFileSync(`${dataPath}/template.js`, "utf8")

let headings = []
const langFiles = getLangFiles()
for (const langFile of langFiles) {
	const [lang] = langFile.split(".")
	const describes = makeDescribes(langFile)
	writeTests(lang, describes)
}

function writeTests(lang, describes) {
	const out = []
	for (const describe of describes) {
		out.push(`describe(${JSON.stringify(describe.describe)}, function() {`)
		for (const it of describe.it) {
			let func = []
			let osises = JSON.stringify(it.osises)
			osises = osises.replace(/\\\\u/g, "\\u")
			func.push(`\tit(${JSON.stringify(it.it)}, function() {`)
			func.push(`\tloopTest(${osises})`)
			func.push("})")
			out.push(func.join("\n\t"))
		}
		out.push("})\n")
	}
	out.push("describe(\"Not switching styles\", function() {")
	out.push("\tit(\"should work when not switching styles\", function() {")
	const heading = headings[headings.length - 1]
	out.push(`\t\texpect(() => convert(${JSON.stringify(heading)}, \"Matt.1\")).not.toThrow()`)
	out.push(`\t\texpect(() => convert(${JSON.stringify(heading)}, \"Matt.2\")).not.toThrow()`)
	out.push("\t})\n})\n")
	let outString = template.replace(/\$LANG/, lang)
	outString += out.join("\n")
	fs.writeFileSync(`${outPath}/${lang}.spec.js`, outString)
}

function makeDescribes(langFile) {
	const lines = fs.readFileSync(`${dataPath}/${langFile}`, "utf8").split(/\n+/)
	headings = lines.shift().split("\t")
	const describes = []
	for (const line of lines) {
		if (!line.match(/\S/)) {
			continue
		}
		const fields = lineToFields(line, headings)
		if (fields.describe.match(/\S/)) {
			describes.push({describe: fields["describe"], it: []})
		}
		const lastDescribe = describes.length - 1
		if (fields.it.match(/\S/)) {
			describes[lastDescribe]["it"].push({it: fields.it, osises: {}})
		}
		const lastIt = describes[lastDescribe]["it"].length - 1
		if (lastIt < 0) {
			continue
		}
		const osis = fields.osis
		if (osis.length === 0) {
			console.log("Warning: osis is empty. Skipping.")
			continue
		}
		describes[lastDescribe]["it"][lastIt]["osises"][osis] = {}

		delete fields.describe
		delete fields.it
		delete fields.osis
		const datas = Object.keys(fields).sort()
		if (datas.length === 0) {
			continue
		}
		for (const field of datas) {
			if (fields[field].length === 0) {
				console.log(`Warning: ${field} is empty. Skipping`)
				continue
			}
			describes[lastDescribe]["it"][lastIt]["osises"][osis][field] = fields[field]
		}
	}
	return describes
}

function lineToFields(line, headings) {
	const fields = line.split("\t")
	const out = {}
	for (let i = 0; i < fields.length; i++) {
		out[headings[i]] = fields[i]
	}
	return out
}

function getLangFiles() {
	return fs.readdirSync(dataPath).filter(function(value) {
		return value.match(/txt$/)
	})
}