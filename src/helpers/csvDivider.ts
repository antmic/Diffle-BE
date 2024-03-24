// let csv = require('csv-parser');
// import * as fs from 'fs';

// const path = './src/sorted_dictionary.csv';

// // Read the CSV file and parse it into an array of strings
// let data: Map<string, Map<string, string[]>> = new Map();
// fs.createReadStream(path)
// 	.pipe(csv())
// 	.on('data', (row: string) => {
// 		// Explicitly type 'row' as string
// 		// Get the value of the first (and only) property of the row object
// 		let value: string = String(Object.values(row)[0]); // Cast 'value' to string

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

// 		if (data.has(value[0])) {
// 			if (data.get(value[0])?.has(value[1])) {
// 				data.get(value[0])?.get(value[1])?.push(value);
// 			} else {
// 				data.get(value[0])?.set(value[1], [value]);
// 			}
// 		} else {
// 			data.set(value[0], new Map([[value[1], [value]]]));
// 		}
// 	})
// 	.on('end', () => {
// 		const dir = './src/dictionary';
// 		if (!fs.existsSync(dir)) {
// 			fs.mkdirSync(dir);
// 		}
// 		data.forEach((value, key0) => {
// 			console.log(`Processing ${key0}`);
// 			value.forEach((value, key1) => {
// 				console.log(`Processing ${key0}:${key1}`);
// 				const output: string = value.join('\n');
// 				fs.writeFileSync(`${dir}/${key0}${key1}.csv`, output);
// 			});
// 		});
// 		console.log('CSV file successfully processed');
// 	});
