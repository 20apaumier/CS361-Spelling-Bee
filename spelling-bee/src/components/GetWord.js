import Papa from 'papaparse';
import easyWords from '../easy_words.csv';
import mediumWords from '../medium_words.csv';
import hardWords from '../hard_words.csv';

// Parse a CSV file of words based on the given difficulty using the PapaParse library.
const parseCSV = (difficulty) => {
  let file;
  
  // Determine which CSV file to parse based on the provided difficulty
  switch(difficulty) {
      case 'easy': file = easyWords; break;
      case 'medium': file = mediumWords; break;
      case 'hard': file = hardWords; break;
      default: file = easyWords;  // Default to easy words if difficulty is not recognized
  }

  // promise to obtain the data from the specified csv file
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      download: true,
      header: true,
      skipEmptyLines: true,
      quoteChar: '"',
      complete: ({ data, errors }) => {
        // Handle parsing errors
        if (errors.length) {
          console.error('Parsing error on row:', errors[0].row);
          reject(new Error(`Error in ${file}: ${errors[0].message}`));
          return;
        }
        // Resolve the parsed data if no errors
        resolve(data);
      }
    });
  });
}

// Fetch a word from the CSV data based on the provided index and difficulty.
// this will return the index,word,definition,sentence,part_of_speech, and language_of_origin
const GetWord = async (index, difficulty) => {
  try {
    const data = await parseCSV(difficulty);
    if (index >= 0 && index < data.length) {
      return data[index];
    } else {
      throw new Error(`Index out of bounds: ${index}`);
    }
  } catch (error) {
    throw error;
  }
}

export { GetWord, parseCSV };