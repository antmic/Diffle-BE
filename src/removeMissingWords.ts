import fs from 'fs';

const dictionaryPath = './src/dictionary/';
const winningWordsPath = './src/winning_words/';

async function parseCsv(path: string, fileName: string): Promise<string[]> {
	const filePath = path + fileName;
	const file = Bun.file(filePath);
	const csvText = await file.text();
	const lines = csvText.split('\n').filter(line => line.trim() !== '');
	return lines;
}

const filesInDictionary = fs.readdirSync(dictionaryPath);
console.log(filesInDictionary);
const filesInWinningWords = fs.readdirSync(winningWordsPath);
console.log(filesInWinningWords);

const removeMissingWords = async (fileName: string) => {
	let dictionary: string[] = await parseCsv(dictionaryPath, fileName);

	let winningWords: string[] = await parseCsv(winningWordsPath, fileName);

	// compare the two arrays and console.log the words that are in the winningWords but not in the dictionary array
	const missingWords = winningWords.filter(word => !dictionary.includes(word));
	console.log('file: ', fileName, '; missing words: ', missingWords);

	// if missingWords is not empty, remove the missing word from the csv file in the winningWordsPath
	if (missingWords.length) {
		const winningWordsFile = fs.createWriteStream(winningWordsPath + fileName);
		const filteredWords = winningWords.filter(word => !missingWords.includes(word));
		filteredWords.forEach((word, index) => {
			winningWordsFile.write(word + (index < filteredWords.length - 1 ? '\n' : ''));
		});
		winningWordsFile.end();
	}
};

filesInWinningWords.forEach(async file => {
	await removeMissingWords(file);
});
