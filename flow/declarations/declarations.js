interface OsisToReadableInterface {
	toReadable(osis: string, context?: string): string;
	setBooks(books: BooksType): void;
	setOptions(options: Object): void;
}
type OptionsType = {
	b: string;
	c: string;
	v: string;
	"-": string;
	",": string;
	".": string;
	"$chapters": Array<string>;
	"$verses": Array<string>;
	singleChapterFormat: "bv" | "bcv";
	singleChapterBooks: Array<string>;
	Ps151Format: "b" | "bc";
	maxPs: number;
}
type BooksType = {
	[key: string]: Array<string>
}
