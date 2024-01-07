const fs = require('fs');
const csv = require('csv-parser');

// Read the CSV file and parse it into an array of strings
const data: string[] = [];
fs.createReadStream('./dictionary.csv')
	.pipe(csv())
	.on('data', (row: string) => {
		// Explicitly type 'row' as string
		// Get the value of the first (and only) property of the row object
		let value = String(Object.values(row)[0]); // Cast 'value' to string

		// Remove invisible characters
		value = value.replace(/\r?\n|\r/g, '');

		data.push(value);
	})
	.on('end', () => {
		console.log('CSV file successfully processed');

		// Sort the array in Unicode alphabetical order
		data.sort((a, b) => a.localeCompare(b));

		// Write the sorted array back to a new CSV file
		const output = data.join('\n');
		fs.writeFileSync('sorted_dictionary.csv', output);
	});
