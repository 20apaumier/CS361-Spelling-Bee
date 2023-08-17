import Papa from 'papaparse';
import csvFile from '../words.csv';

let cachedData = null;

// Parses the CSV file using the Papa library.
const parseCSV = () => {
  return new Promise((resolve, reject) => {
    // Return cached data if it exists.
    if (cachedData) {
      resolve(cachedData);
      return;
    }

    Papa.parse(csvFile, {
      download: true,
      header: true,
      complete: ({ data, errors }) => {
        if (errors.length) {
          reject(new Error(errors[0].message));
          return;
        }
        cachedData = data;
        resolve(data);
      }
    });
  });
}

// Fetches a word from the CSV data based on the provided index.
const GetWord = async (index) => {
  try {
    const data = await parseCSV();

    if (index >= 0 && index < data.length) {
      return data[index];
    } else {
      throw new Error(`Index out of bounds: ${index}`);
    }
  } catch (error) {
    throw error;
  }
}

export default GetWord;