// const fs = require('fs');
// const csv = require('csv-parser');

// const path = './winning_words.csv';
// const outputName = 'sorted_winning_words.csv';

// // Read the CSV file and parse it into an array of strings
// const data: string[] = [];
// fs.createReadStream(path)
// 	.pipe(csv())
// 	.on('data', (row: string) => {
// 		// Explicitly type 'row' as string
// 		// Get the value of the first (and only) property of the row object
// 		let value = String(Object.values(row)[0]); // Cast 'value' to string

// 		// Remove invisible characters
// 		value = value.replace(/\r?\n|\r/g, '');

// 		// Remove leading and trailing whitespace
// 		value = value.trim();

// 		// Remove empty strings
// 		if (value === '') {
// 			return;
// 		}

// 		// Remove values that contain '-'
// 		if (value.includes('-')) {
// 			return;
// 		}

// 		// Change all values to lowercase
// 		value = value.toLowerCase();

// 		data.push(value);
// 	})
// 	.on('end', () => {
// 		console.log('CSV file successfully processed');

// 		// Sort the array in Unicode alphabetical order
// 		data.sort((a, b) => a.localeCompare(b));

// 		// Write the sorted array back to a new CSV file
// 		const output = data.join('\n');
// 		fs.writeFileSync(outputName, output);
// 	});
