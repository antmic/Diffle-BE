import { XMLParser } from 'fast-xml-parser';
import fs from 'fs';

let fileList: string[] = [];

async function getFileNames(directory: string) {
	try {
		const files = await fs.promises.readdir(directory);
		fileList = files;
	} catch (err) {
		console.error(err);
	}
}

await getFileNames('./xmls');

console.log('fileList: ', fileList);

let entryList: string[] = [];
let senseList: string[] = [];
let transList: string[] = [];
let wordList: string[] = [];
let errorList: string[][] = [];

async function processFile(file: string) {
	console.log(`Processing ${file}`);
	try {
		const data = await fs.promises.readFile(`./xmls/${file}`, 'utf8');
		const parser = new XMLParser({ alwaysCreateTextNode: false });
		const jsonObj = parser.parse(data);
		const body = jsonObj.TEI.text.body.entry;

		body.forEach((element: any) => {
			if (element.sense && element.sense.length) {
				element.sense.forEach((sense: any) => {
					entryList.push(sense);
				});
			} else if (element.sense) {
				entryList.push(element.sense);
			} else {
				errorList.push([element, 'no entry']);
			}
		});

		entryList.forEach((element: any) => {
			if (element.sense && element.sense.length) {
				element.sense.forEach((sense: any) => {
					senseList.push(sense);
				});
			} else if (element.sense) {
				senseList.push(element.sense);
			} else {
				errorList.push([element, 'no sense']);
			}
		});

		senseList.forEach((element: any) => {
			if (element.trans && element.trans.length) {
				element.trans.forEach((trans: any) => {
					transList.push(trans);
				});
			} else if (element.trans) {
				transList.push(element.trans);
			} else {
				errorList.push([element, 'no trans']);
			}
		});

		transList.forEach((element: any) => {
			if (typeof element.tr === 'string') {
				wordList.push(element.tr);
			} else if (typeof element.tr === 'object') {
				element.tr.forEach((tr: any) => {
					wordList.push(tr);
				});
			} else {
				errorList.push([element, 'no tr']);
			}
		});

		entryList = [];
		senseList = [];
		transList = [];
	} catch (err) {
		console.error(err);
	}
}

async function loadFiles(list: string[]) {
	for (const file of list) {
		await processFile(file);
	}
}

await loadFiles(fileList);

// console.log('wordList: ', wordList);
// console.log('errorList: ', errorList);
console.log('wordList length: ', wordList.length);
console.log('errorList length: ', errorList.length);

async function parseCsv(): Promise<string[]> {
	const filePath = './sorted_dictionary.csv'; // includes 'src' because 'bun dev' runs from the root directory
	const file = Bun.file(filePath);
	const csvText = await file.text();
	const lines = csvText.split('\n').filter(line => line.trim() !== '');
	return lines;
}

let dictionary = await parseCsv();

console.log('CSV parsing has completed.');
console.log('dictionary length: ', dictionary.length);

function filterWords(arr: string[]) {
	let result: string[] = [];

	arr.forEach((element: any) => {
		if (!element.includes(' ') && element.length > 4) {
			//console.log(element);
			result.push(element);
		}
	});

	return result;
}

console.log('wordList before filterWords length: ', wordList.length);
wordList = filterWords(wordList);
console.log('wordList after filterWords length: ', wordList.length);

function removeDuplicates(arr: string[]) {
	return [...new Set(arr)];
}
console.log('wordList before removeDuplicates length: ', wordList.length);
wordList = removeDuplicates(wordList);
console.log('wordList after removeDuplicates length: ', wordList.length);

function compareLists(comparedList: string[], originalList: string[]) {
	let resultList: string[] = [];

	function binarySearch(arr: string[], target: string): boolean {
		let left = 0;
		let right = arr.length - 1;

		while (left <= right) {
			const mid = Math.floor((left + right) / 2);
			const guess = arr[mid];

			const comparison = guess.localeCompare(target);

			if (comparison === 0) {
				return true;
			}

			if (comparison < 0) {
				left = mid + 1;
			} else {
				right = mid - 1;
			}
		}

		return false;
	}

	comparedList.forEach((element: any) => {
		if (binarySearch(originalList, element)) {
			//console.log(element);
			resultList.push(element);
		}
	});
}

compareLists(wordList, dictionary);

fs.writeFile('winning_words.csv', wordList.join('\n'), err => {
	if (err) {
		console.error(err);
		return;
	}
	console.log('...Done');
});
