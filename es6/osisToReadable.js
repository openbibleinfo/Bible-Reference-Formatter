"use strict";

function getDefaults() {
	return {
		"b": "$b",
		"c": "$c",
		"v": "$v",
		"-": "-",
		",": ", ",
		".": " ",
		"$chapters": Object.freeze(["ch", "chs"]),
		"$verses": Object.freeze(["v", "vv"]),

		"singleChapterFormat": "bv", // or `b` or `bcv`
		"singleChapterBooks": Object.freeze(["Obad", "Phlm", "2John", "3John", "Jude", "PrAzar", "SgThree", "Sus", "Bel", "EpJer", "PrMan", "Ps151", "AddPs"]),

		"Ps151Format": "bc", // or `b`
		"maxPs": 150
	};
}

function OsisToReadable() {
	// Some subset of "Matt.1.2-Mark.3.4"
	const osisFormat = /^[1-5A-Za-z]{2,}(?:\.\d{1,3}(?:\.\d{1,3})?)?(?:-[1-5A-Za-z]{2,}(?:\.\d{1,3}(?:\.\d{1,3})?)?)?$/;

	let books = {};
	let options = getDefaults();

	// Convert an OSIS string, and an optional OSIS context, to human-readable form. Aim for the shortest understandable string: `Matt.1-Matt.2` might become `Matthew 1-2`.
	function toReadable(osisString, osisContext) {
		if (typeof osisString !== "string") {
			throw "osisToReadable: first argument must be a string.";
		}
		// Create a context object, using the supplied context (if available).
		const context = setContext(osisContext);
		// Separate the supplied OSISes into individual OSIS references.
		const osises = osisString.split(",");
		const tokens = [];
		while (true) {
			// Make sure we're dealing with a valid OSIS string. It throws an exception if there's a problem.
			const osis = normalizeOsis(osises.shift());
			// Tokenize the OSIS string.
			tokens.push(osisToToken(osis, context));
			// Add a separator token if there are more OSIS strings to tokenize. We don't want to add it at the end of the loop, which is why we use `while (true)` at the top.
			if (osises.length > 0) {
				tokens.push({
					type: ",",
					parts: [],
					laters: []
				});
			} else {
				break;
			}
		}
		return tokensToReadable(tokens);
	}

	// Format an array of tokens in a sequence.
	function tokensToReadable(tokens) {
		// Calculate data that we may need about future tokens in the sequence.
		tokens = annotateTokens(tokens);
		const out = [];
		// First iterate over each token.
		while (tokens.length > 0) {
			const token = tokens.shift();
			if (typeof token.bookSequence !== "undefined") {
				out.push(formatBookSequence(token, tokens));
			} else {
				out.push(tokenToReadable(token));
			}
		}
		return out.join("");
	}

	// If given a sequence like `1John,2John`, we may want to turn that into `1 and 2 John`.
	function formatBookSequence(token, tokens) {
		// Really, we've already checked this, but we'll make Flow happy at the cost of losing 100% code coverage because the following `if` statement is never false. Most of the time the `while` loop won't return, so we still drop down to `tokenToReadable()`.
		const sequenceArray = token.bookSequence;
		if (typeof sequenceArray !== "undefined") {
			// The `sequenceArray` includes the current token. If `length === 1`, then the only item left in the array is the current token, which we pass to `tokenToReadable()`.
			while (sequenceArray.length > 1) {
				// Look for a comma-joined sequence in `books`.
				const bookSequence = sequenceArray.join(",");
				if (typeof books[bookSequence] !== "undefined" && typeof books[bookSequence][0] === "string") {
					// First remove future tokens that we've already taken care of in this sequence.
					removeBookSequenceTokens(sequenceArray.length, tokens);
					// And then return the desired book string.
					return books[bookSequence][0];
				}
				sequenceArray.pop();
			}
		}
		// Otherwise, there was no match, so handle the token as usual.
		return tokenToReadable(token);
	}

	// Remove the number of items in the sequence. Let's say there are three items: `["1John", "2John", "3John"]`. `1John` is the current token, which is already gone from the array. That means we need to hop ahead two books, or `3 - 1`, to prevent us from stringifying the token again.
	function removeBookSequenceTokens(numberToRemove, tokens) {
		while (numberToRemove > 1) {
			// Just remove sequence tokens (`type: ","`); we don't need them.
			tokens.shift();
			// Next is the `b` token we want to remove.
			tokens.shift();
			numberToRemove--;
		}
	}

	// Format a single token.
	function tokenToReadable(token) {
		// First check to see if we have a book range to handle specially (`1John-2John` might become `1-2 John`).
		if (typeof token.bookRange === "string" && typeof books[token.bookRange] !== "undefined" && typeof books[token.bookRange][0] === "string") {
			return books[token.bookRange][0];
		}

		// Most of the time, iterate over its `parts` to build the output string.
		const out = [];
		for (const part of token.parts) {
			out.push(formatPart(token, part));
		}
		return out.join("");
	}

	// Format a `part` in a `token.parts`.
	function formatPart(token, part) {
		let prefix = "";
		switch (part.type) {
			case "c":
			case "v":
				// If we specify a specific format for this `subType`, then calculate the value to prepend to the final output. For example, `^v` when a verse appears first in a string (when `osisToReadable()` has a `context`) might want a `vv. ` prefix.
				if (part.subType !== "" && typeof options[part.subType] !== "undefined") {
					prefix = formatVariable(part.subType, part, token);
				}
			// Fall through to `b`, which uses the same logic.
			case "b":
				return prefix + formatVariable(part.type, part, token);
			// Punctuation tokens all use the same logic. They never have prefixes because they can never appear first in a string.
			case ".":
			case "-":
			case ",":
			// `default` is only here to satisfy code coverage. There are no other cases.
			default:
				return formatVariable(getBestOption(part.type, part.subType), part, token);
		}
	}

	// `options` can contain partial matches: `bc-bc`, `bc-b`, `c-bc`, `c-b`, `-bc`, `-b`, and `-` all match a `bc-bc` string. Take the best match that exists in options.
	function getBestOption(splitChar, option) {
		let [pre, postChars] = option.split(splitChar);
		// Start by matching the full string. Progressively remove ending possibilities and then beginning possibilities. For `bc-bc`, it tries to find options in the following order, knowing that the last one, the `splitChar` on its own, will always match: `bc-bc`, `bc-b`, `c-bc`, `c-b`, `-bc`, `-` 
		for (let i = 0, length = pre.length; i <= length; i++) {
			let post = postChars;
			while (post.length > 0) {
				if (typeof options[`${ pre }${ splitChar }${ post }`] === "string") {
					return `${ pre }${ splitChar }${ post }`;
				}
				// Remove the last character so that we match characters closer to `splitChar` (in `-bcv`, the `v` is the least-important part).
				post = post.substr(0, post.length - 1);
			}
			pre = pre.substr(1);
		}
		return splitChar;
	}

	// Some values can have variables indicated by a `$`. Replace them if we can.
	function formatVariable(optionsKey, part, token) {
		let pattern = options[optionsKey];
		// We can short-circuit all this logic if there are no `$`.
		if (pattern.indexOf("$") === -1) {
			return pattern;
		}
		// Replace `$chapters` with a literal value like `ch.` or `chs.` It's a RegExp rather than a string to allow the `/g` flag.
		pattern = pattern.replace(/\$chapters/g, function () {
			// If `books` defines a string to use (e.g., with `Ps.$chapters`, maybe you want "Ps. 3" rather than "ch. 3"), use that instead.
			const arrayToUse = typeof books[`${ part.b }.$chapters`] === "undefined" ? options["$chapters"] : books[`${ part.b }.$chapters`];
			// Only retun the plural if there's a plural variant to use and there are later chapters.
			if (arrayToUse.length > 1 && hasMultipleChapters(part, token) === true) {
				return arrayToUse[1];
			}
			return arrayToUse[0];
		});
		// It's a RegExp rather than a string to allow the `/g` flag.
		pattern = pattern.replace(/\$verses/g, function () {
			// Unlike `$chapters`, `$verses` doesn't require a check inside `books` since `Ps.1.2-Ps.1.3` is going to be `vv. 2-3`.
			if (options["$verses"].length > 1 && hasMultipleVerses(part, token) === true) {
				return options["$verses"][1];
			}
			return options["$verses"][0];
		});
		pattern = pattern.replace(/\$b/g, function () {
			// We know that `part.b` exists in `books` because it would have already thrown an exception in `osisWithContext` or `setContext`.
			if (books[part.b].length > 1 && hasMultipleChapters(part, token) === true) {
				return books[part.b][1];
			}
			return books[part.b][0];
		});
		// Don't accidentally insert `undefined` into a string.
		pattern = pattern.replace(/\$c/g, typeof part.c === "string" ? part.c : "");
		pattern = pattern.replace(/\$v/g, typeof part.v === "string" ? part.v : "");
		return pattern;
	}

	// If a range or sequence has multiple chapters, we may want to change the output: `chapters 1-2` rather than `chapter 1-2`, for example.
	function hasMultipleChapters(part, token) {
		// If we're currently looking at a chapter, include it in our calculations.
		let later = part.type === "c" ? "c" : "";
		// All the part types until the next book.
		later += part.laters.join("") + "," + token.laters.join(",");
		// A chapter range always has multiple chapters.
		if (later.indexOf("-c") >= 0) {
			return true;
		}
		// An unusual situation, like `Ps.149-Prov.1` or `Ps.150-Prov.1`. In the first case, we want to use the plural; in the second, we want to use the singular. `later` only has a `-b` if it's in the current `part`--`token.laters` ends before it reaches the next book in a sequence.
		if (part.b === "Ps" && later.indexOf("-b") >= 0) {
			// Find the chapter number.
			for (const otherPart of token.parts) {
				if (otherPart.type === "c") {
					// If it's less than the number of Psalms, we know that more than one chapter is involved.
					if (parseInt(otherPart.c, 10) < options.maxPs) {
						return true;
					}
					// Once we've looked at the chapter, we don't need to look any further. We know this situation doesn't apply.
					break;
				}
			}
			return false;
		}
		// If there are two or more chapter instances in a sequence, we know there are multiple chapters. "cc" = "", "", ""
		if (later.split("c").length > 2) {
			return true;
		}
		return false;
	}

	// Possibly handle `verse 1` and `verses 1-2` differently.
	function hasMultipleVerses(part, token) {
		// All the part types until the next book.
		const later = part.laters.join("") + "," + token.laters.join(",");
		// We only care about the current chapter.
		let [thisChapter] = later.split("c");
		// If there's a range, we know there are multiple verses.
		if (thisChapter.indexOf("-") >= 0) {
			return true;
		}
		// "vv" = "", "", ""
		if (thisChapter.split("v").length > 2) {
			return true;
		}
		return false;
	}

	// Add data we'll use later to construct the final output.
	function annotateTokens(tokens) {
		const out = [];
		// We only need `prevToken` in a sequence, which is never first, so it's OK that this value is wrong on the first loop run.
		let prevToken = tokens[0];
		let i = 0;
		while (tokens.length > 0) {
			const token = tokens.shift();
			// Never first.
			if (token.type === ",") {
				annotateSequenceToken(token, prevToken, tokens);
			} else {
				annotateToken(token, tokens, i);
			}
			// Add future context.
			annotateTokenLaters(token, tokens);
			annotateTokenParts(token.parts);
			out.push(token);
			prevToken = token;
			i++;
		}
		return out;
	}

	// Add data to a single token that we can't derive elsewehre.
	function annotateToken(token, tokens, i) {
		token.isFirst = false;
		if (i === 0) {
			token.isFirst = true;
			// The first `part.type` could be `c` or `v` if `osisToReadable()` is provided a start context.
			if (token.parts[0].type !== "b") {
				// `c` or `v` or `cv`
				const [pre] = token.type.split("-");
				let prefix = "";
				// Note that we're dealing with a single-chapter book in case we want to handle it differently.
				if (isSingleChapterBook(token.parts[0].b)) {
					prefix = "b1";
				}
				// Set the `subType` (`c` and `v` don't normally have a `subType`) for later use.
				token.parts[0].subType = `${ prefix }^${ pre }`;
			}
		}
	}

	// Create a sequence `token.parts` with the keys we'll need later.
	function annotateSequenceToken(token, prevToken, tokens) {
		const prevPart = prevToken.parts[prevToken.parts.length - 1];
		token.parts = [{
			type: ",",
			// Indicates the preceding and following token types so that we can join different types differently if we want.
			subType: `${ prevToken.type },${ tokens[0].type }`,
			b: prevPart.b,
			c: prevPart.c,
			v: prevPart.v,
			laters: []
		}];
	}

	// Fill in the `laters` array for each token.
	function annotateTokenLaters(token, tokens) {
		const currentType = token.type;
		const bookSequence = [];
		// If we have a `b` sequence, we want to continue past when we would normally stop.
		let keepCheckingBooks = false;
		// But we still want to stop adding `token.laters`.
		let latersDone = false;
		if (currentType === "b") {
			bookSequence.push(token.parts[0].b);
			keepCheckingBooks = true;
		}

		for (const laterToken of tokens) {
			let laterType = laterToken.type;
			// Doing it this way avoids possible leading and trailing `,`.
			if (laterType === ",") {
				continue;
			}
			// If we're still in a `b` sequence, keep going.
			if (keepCheckingBooks === true) {
				if (laterType === "b") {
					bookSequence.push(laterToken.parts[0].b);
				} else {
					keepCheckingBooks = false;
				}
			}
			// Stop here if we've already encountered a book and don't need to go further.
			if (latersDone === true) {
				continue;
			}
			// Only go as far as the next book.
			if (laterType.indexOf("b") >= 0) {
				const [pre] = laterType.split("b");
				// Only add it to the array if there's something to add. We don't care about empty strings.
				if (pre.length > 0) {
					token.laters.push(pre);
				}
				if (keepCheckingBooks === false) {
					break;
				}
				latersDone = true;
				// If there's not a book in `laterType`, then we know we need to keep looking until we find one or reach the end of the array.
			} else {
				token.laters.push(laterType);
			}
		}
		if (bookSequence.length > 1) {
			token.bookSequence = bookSequence;
		}
	}

	// Add `laters` to each `token.parts`.
	function annotateTokenParts(parts) {
		let laters = [];
		// First we need to know what all the `laters` are.
		for (const part of parts) {
			laters.push(part.type);
		}
		// Then we can add them to each `part`.
		for (const part of parts) {
			// The first element is the current type.
			laters.shift();
			// Create a copy rather than a reference and remove spacing parts (`.`).
			part.laters = laters.filter(function (value) {
				return value !== ".";
			});
		}
	}

	// Convert an OSIS string to a single token.
	function osisToToken(osis, context) {
		// `end` may be undefined.
		const [start, end] = osis.split("-");
		const startToken = osisWithContext(start, context);
		// If there's  no `end`, we don't need to do any further processing. `startToken` is itself a complete token.
		if (end === undefined) {
			return startToken;
		}
		const endToken = osisWithContext(end, context);
		// Construct a unified set of `parts`, including the range.
		const parts = startToken.parts;
		parts.push(makeRangePart(startToken, endToken));

		const token = {
			type: `${ startToken.type }-${ endToken.type }`,
			// Add the end `parts` to the array.
			parts: parts.concat(endToken.parts),
			laters: []
		};
		// We may want to handle certain book-only ranges differently (`1John-2John` might be `1-2 John`).
		if (token.type === "b-b") {
			token.bookRange = startToken.parts[0].b + "-" + endToken.parts[0].b;
		}
		return token;
	}

	// Construct a range token with data from one preceding and following token.
	function makeRangePart(startToken, endToken) {
		const prevPart = startToken.parts[startToken.parts.length - 1];
		const range = {
			type: "-",
			// We may need to know what kind of objects it's joining.
			subType: `${ startToken.type }-${ endToken.type }`,
			b: prevPart.b,
			laters: []
		};
		// Only add these if they exist in the previous part. These values reflect the current context, not the future context.
		if (typeof prevPart.c !== "undefined") {
			range.c = prevPart.c;
		}
		if (typeof prevPart.v !== "undefined") {
			range.v = prevPart.v;
		}
		return range;
	}

	// Tokenize a non-range OSIS string, taking context into account. The goal is to omit needless parts: if your context is `Matt.1` and the current OSIS is `Matt.2`, we can omit the book from the return token.
	function osisWithContext(osis, context) {
		// `c` and `v` may be undefined. `c` always exists if `v` does.
		const [b, c, v] = osis.split(".");
		// Don't try to guess if we encounter an unexpected book.
		if (typeof books[b] === "undefined") {
			throw `Unknown OSIS book: "${ b }" (${ osis })"`;
		}
		const out = {
			type: "",
			parts: [],
			laters: []
		};
		const isSingleChapter = isSingleChapterBook(b);
		// If there's an end verse, if we've set the relevant option to `bv` rather than `bcv`, and if the book only has one chapter, then we want to omit the chapter: `Phlm.1.1` = `Philemon 1`.
		const omitChapter = isSingleChapter && typeof v === "string" && (options.singleChapterFormat === "bv" || options.singleChapterFormat === "b");
		// Returns true if there's a chapter. It modifies `out` in-place.
		if (osisBookWithContext(b, c, v, isSingleChapter, omitChapter, context, out) === false) {
			return out;
		}
		// Returns true if there's a verse. It modifies `out` in-place.
		if (osisChapterWithContext(b, c, v, omitChapter, context, out) === false) {
			return out;
		}
		// We know there's a verse.
		out.type += "v";
		out.parts.push({
			type: "v",
			subType: "",
			b: b,
			c: c,
			v: v,
			laters: []
		});
		context.v = parseInt(v, 10);
		return out;
	}

	// Handle a "book" part.
	function osisBookWithContext(b, c, v, isSingleChapter, omitChapter, context, out) {
		// If we're looking at something like `Phlm-Phlm.1` or `Matt-Phlm.1`, we may want to treat `Phlm.1` as a book rather than include a chapter. This is unusual.
		if (v === undefined && isSingleChapter === true && options.singleChapterFormat === "b") {
			context.b = b, context.c = 0, context.v = 0;
			out.type = "b";
			out.parts.push({
				type: "b",
				subType: "",
				b: b,
				laters: []
			});
			return false;
		}

		// Gen.1,Exod = "Exod" || Gen.1,Gen = "Gen"
		if (b !== context.b || c === undefined) {
			// Do it this way to keep the reference to the original object.
			context.b = b, context.c = 0, context.v = 0;
			out.parts.push({
				type: "b",
				subType: "",
				b: b,
				laters: []
			});
			out.type = "b";
			// There's no chapter, so we don't need to continue.
			if (c === undefined) {
				return false;
			}
			// In general, the `subType` will be `b.c`.
			let subType = "b.c";
			// If we want to omit the chapter reference in a single-chapter book.
			if (omitChapter === true) {
				subType = "b.v";
				// `b1` means a single-chapter book.
				out.type = "b1";
				// It's a single-chapter book, but there's no end verse.
			} else if (isSingleChapter === true) {
				// `b1` means a single-chapter book.
				subType = "b1.c";
			}
			// We know there's a chapter, so insert the joiner.
			out.parts.push({
				type: ".",
				subType: subType,
				b: b,
				laters: []
			});
		}
		// Otherwise, we know that it's the same book as in `context` and there's a chapter.
		return true;
	}

	// Handle a "chapter" part.
	function osisChapterWithContext(b, c, v, omitChapter, context, out) {
		// We already know that the context book and current book are the same.
		if (parseInt(c, 10) !== context.c || v === undefined) {
			// We need to set `context.v` because we don't know that `osisBookWithContext()` reset it.
			context.c = parseInt(c, 10), context.v = 0;
			// If only `Phlm.1`, we want to include the chapter if `options.singleChapterFormat === "bv"`, but omit the chapter if it's `=== "b"`. `omitChapter` is always `false` when `v === undefined`.
			if (omitChapter === false) {
				out.parts.push({
					type: "c",
					subType: "",
					b: b,
					c: c,
					laters: []
				});
				out.type += "c";
				// There's no verse, so we don't need any further processing.
				if (v === undefined) {
					return false;
				}
				// We know there's a verse, so insert the joiner.
				out.parts.push({
					type: ".",
					subType: "c.v",
					b: b,
					laters: []
				});
			}
		}
		// Otherwise, we know that it's the same book and chapter as in `context` and that there's a verse.
		return true;
	}

	// Only checks if the book is in an array in `options`.
	function isSingleChapterBook(b) {
		return options.singleChapterBooks.indexOf(b) >= 0;
	}

	// Confirm that the string matches the expected format of an OSIS string. Throw an exception if not. Also handle Ps151 quirks.
	function normalizeOsis(osis) {
		if (osisFormat.test(osis) === false) {
			throw `Invalid osis format: '${ osis }'`;
		}
		// If we want to treat Ps151 as just another Psalm (so `Ps151.1.2` might output `Psalm 151:2`).
		if (options["Ps151Format"] === "bc") {
			// Remove the chapter and treat it as `Ps.151`.
			osis = osis.replace(/(?:Ps151|AddPs)(?:\.\d+\b)?/g, "Ps.151");
		}
		return osis;
	}

	// Given an optional string context, create a `context` obect.
	function setContext(osis) {
		// We always only want these three keys. Flow doesn't like calling `Object.seal`, however.
		const out = { b: "", c: 0, v: 0 };
		// There's no provided context.
		if (osis == null) {
			return out;
		}
		// Don't allow sequences.
		osis = normalizeOsis(osis);
		// Use the end value of the range if there is one.
		if (osis.indexOf("-") >= 0) {
			const [start, end] = osis.split("-");
			return setContext(end);
		}
		const [b, c, v] = osis.split(".");
		if (typeof books[b] === "undefined") {
			throw `Unknown OSIS book provided for "context": "${ b }" (${ osis })"`;
		}
		// `b` always exists.
		out.b = b;
		// `c` and `v` don't necessarily exist. `v` only exists if `c` does.
		if (typeof c === "string") {
			out.c = parseInt(c, 10);
			if (typeof v === "string") {
				out.v = parseInt(v, 10);
			}
		}
		return out;
	}

	// Override any default parameters with user-supplied parameters. Also make sure `userOptions` has all the keys we need. Each call is independent, which means that `userOptions` should contain all the keys to override defaults.
	function setOptions(userOptions) {
		// Reset them to the default.
		options = getDefaults();
		// No need to match properties if there's no argument.
		if (userOptions == null) {
			return;
		}
		// We want to ensure type consistency, so we don't just use `Object.assign`.
		for (const key of Object.keys(userOptions)) {
			const defaultType = typeof options[key];
			// If it's not in `defaults`, or if its type matches, set it.
			if (defaultType === "undefined" || typeof userOptions[key] === defaultType) {
				options[key] = userOptions[key];
				// Otherwise, the types don't match.
			} else {
				throw `Invalid type for options["${ key }"]. It should be "${ defaultType }".`;
			}
		}
	}

	// Set valid books and abbreviations. It takes an object where each key is the OSIS book (e.g., `Matt`), and each value is a one- or two-item array. The first item is the book name to use, and the second item is the book name to use for plural cases. For example: `{"Ps": ["Psalm", "Psalms"]`. You can also use a special key of the type `OSIS.$chapters` (e.g., `Ps.$chapters`), which overrides any chapter abbreviations. For example, `{"Ps": ["Ps.", "Pss."]` could result in `Psalms 1:2, Pss. 3, 4` if given the OSIS `Ps.1.2,Ps.3,Ps.4`.
	function setBooks(userBooks) {
		books = {};
		for (const key of Object.keys(userBooks)) {
			const value = userBooks[key];
			if (Array.isArray(value) === false) {
				throw `books["${ key }"] should be an array: ${ Object.prototype.toString.call(value) }.`;
			}
			if (value.length < 1 || value.length > 2) {
				throw `books["${ key }"] should have exactly one or two items. `;
			}
			books[key] = value;
		}
	}

	return {
		toReadable: toReadable,
		setOptions: setOptions,
		setBooks: setBooks
	};
}

module.exports = OsisToReadable;
