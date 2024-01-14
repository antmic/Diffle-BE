import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';

const dictionaryPath = './src/sorted_dictionary.csv'; // includes 'src' because 'bun dev' runs from the root directory
const winningWordsPath = './src/winning_words.csv'; // includes 'src' because 'bun dev' runs from the root directory

async function parseCsv(path: string): Promise<string[]> {
	const filePath = path;
	const file = Bun.file(filePath);
	const csvText = await file.text();
	const lines = csvText.split('\n').filter(line => line.trim() !== '');
	return lines;
}

//Top-level await
let dictionary = await parseCsv(dictionaryPath);
let winningWords = await parseCsv(winningWordsPath);

console.log('CSV parsing has completed.');

const randomWord = () => {
	const index = Math.floor(Math.random() * winningWords.length);
	const chosenWord = winningWords[index];
	return chosenWord;
};

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

const app = new Elysia()
	.use(cors())
	.get('/getword', () => {
		return { word: randomWord() };
	})
	.post('/checkword', req => {
		return { message: binarySearch(dictionary, req.body as string) };
	})
	.listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
