import Papa from 'papaparse';
import csvFile from '../words.csv';

let cachedData = null;

const parseCSV = () => {
  return new Promise((resolve, reject) => {
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