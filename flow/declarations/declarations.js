interface OsisToReadableInterface {
	toReadable(osis: string, context?: string): string;
	setBooks(books: BooksType): void;
	setOptions(options: Object): void;
}
type OptionsType = {
	// Required options.
	b: string;
	c: string;
	v: string;
	"-": string;
	",": string;
	".": string;
	"$chapters": Array<string>;
	"$verses": Array<string>;
	singleChapterFormat: "b" | "bv" | "bcv";
	singleChapterBooks: Array<string>;
	Ps151Format: "b" | "bc";
	maxPs: number;

	/*
	Possible token types.
	*/
	"bc"?: string;
	"bcv"?: string;
	"bv"?: string;
	"cv"?: string;
	"^c"?: string;
	"^cv"?: string;
	"^v"?: string;
	"b1^c"?: string;
	"b1^cv"?: string;
	"b1^v"?: string;

	/*
	Optional range ("-") types.

	The following ^ properties aren't part of ranges; in the range punctuation, the ^ is dropped:
		^c-b ^c-bc ^c-bcv ^c-bv ^c-c ^c-cv ^c-v
		^cv-b ^cv-bc ^cv-bcv ^cv-bv ^cv-c ^cv-cv ^cv-v
		^v-b ^v-bc ^v-bcv ^v-bv ^v-c ^v-cv ^v-v
		b1^c-b b1^c-bc b1^c-bcv b1^c-bv b1^c-c b1^c-cv b1^c-v
		b1^cv-b b1^cv-bc b1^cv-bcv b1^cv-bv b1^cv-c b1^cv-cv b1^cv-v
		b1^v-b b1^v-bc b1^v-bcv b1^v-bv b1^v-c b1^v-cv b1^v-v
	*/
	"-b"?: string;
	"-bc"?: string;
	"-bcv"?: string;
	"-bv"?: string;
	"-c"?: string;
	"-cv"?: string;
	"-v"?: string;
	"b-b"?: string;
	"b-bc"?: string;
	"b-bcv"?: string;
	"b-bv"?: string;
	"b-c"?: string;
	"b-cv"?: string;
	"b-v"?: string;
	"bc-b"?: string;
	"bc-bc"?: string;
	"bc-bcv"?: string;
	"bc-bv"?: string;
	"bc-c"?: string;
	"bc-cv"?: string;
	"bc-v"?: string;
	"bcv-b"?: string;
	"bcv-bc"?: string;
	"bcv-bcv"?: string;
	"bcv-bv"?: string;
	"bcv-c"?: string;
	"bcv-cv"?: string;
	"bcv-v"?: string;
	"bv-b"?: string;
	"bv-bc"?: string;
	"bv-bcv"?: string;
	"bv-bv"?: string;
	"bv-c"?: string;
	// "bv-cv" isn't possible.
	"bv-v"?: string;
	"c-b"?: string;
	"c-bc"?: string;
	"c-bcv"?: string;
	"c-bv"?: string;
	"c-c"?: string;
	"c-cv"?: string;
	"c-v"?: string;
	"cv-b"?: string;
	"cv-bc"?: string;
	"cv-bcv"?: string;
	"cv-bv"?: string;
	"cv-c"?: string;
	"cv-cv"?: string;
	"cv-v"?: string;
	"v-b"?: string;
	"v-bc"?: string;
	"v-bcv"?: string;
	"v-bv"?: string;
	"v-c"?: string;
	"v-cv"?: string;
	"v-v"?: string;

	/*
	Optional sequence (",") types (same as range types).

	The following ^ properties aren't part of sequences; in the sequence punctuation, the ^ is dropped:
		^c,b ^c,bc ^c,bcv ^c,bv ^c,c ^c,cv ^c,v
		^cv,b ^cv,bc ^cv,bcv ^cv,bv ^cv,c ^cv,cv ^cv,v
		^v,b ^v,bc ^v,bcv ^v,bv ^v,c ^v,cv ^v,v
		b1^c,b b1^c,bc b1^c,bcv b1^c,bv b1^c,c b1^c,cv b1^c,v
		b1^cv,b b1^cv,bc b1^cv,bcv b1^cv,bv b1^cv,c b1^cv,cv b1^cv,v
		b1^v,b b1^v,bc b1^v,bcv b1^v,bv b1^v,c b1^v,cv b1^v,v
	*/
	",b"?: string;
	",bc"?: string;
	",bcv"?: string;
	",bv"?: string;
	",c"?: string;
	",cv"?: string;
	",v"?: string;
	"b,b"?: string;
	"b,bc"?: string;
	"b,bcv"?: string;
	"b,bv"?: string;
	"b,c"?: string;
	"b,cv"?: string;
	"b,v"?: string;
	"bc,b"?: string;
	"bc,bc"?: string;
	"bc,bcv"?: string;
	"bc,bv"?: string;
	"bc,c"?: string;
	"bc,cv"?: string;
	"bc,v"?: string;
	"bcv,b"?: string;
	"bcv,bc"?: string;
	"bcv,bcv"?: string;
	"bcv,bv"?: string;
	"bcv,c"?: string;
	"bcv,cv"?: string;
	"bcv,v"?: string;
	"bv,b"?: string;
	"bv,bc"?: string;
	"bv,bcv"?: string;
	"bv,bv"?: string;
	"bv,c"?: string;
	// "bv,cv" isn't possible.
	"bv,v"?: string;
	"c,b"?: string;
	"c,bc"?: string;
	"c,bcv"?: string;
	"c,bv"?: string;
	"c,c"?: string;
	"c,cv"?: string;
	"c,v"?: string;
	"cv,b"?: string;
	"cv,bc"?: string;
	"cv,bcv"?: string;
	"cv,bv"?: string;
	"cv,c"?: string;
	"cv,cv"?: string;
	"cv,v"?: string;
	"v,b"?: string;
	"v,bc"?: string;
	"v,bcv"?: string;
	"v,bv"?: string;
	"v,c"?: string;
	"v,cv"?: string;
	"v,v"?: string;

	/*
	Optional separator types.

	The following ^ properties aren't part of separators; in the separator punctuation, the ^ is dropped:
		^c.v
		b1^c.v // no `b1^v`: no valid separators after `v`
	*/
	".c"?: string;
	".v"?: string;
	"b.c"?: string;
	"b.v"?: string;
	"b1.c"?: string;
	// no `b1.v`: that's `b.v`
	"c.v"?: string;

}

type BooksType = {
	[key: string]: Array<string>
}

type StylesType = {
	[key: string]: {
		options: {
			[key:string ]: string | Array<string>
		};
		books: BooksType;
	}
}
