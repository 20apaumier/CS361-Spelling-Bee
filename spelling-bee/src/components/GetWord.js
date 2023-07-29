import Papa from 'papaparse';
import csvFile from '../words.csv'; // Assuming the csv file is in the same directory

const GetWord = (index) => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvFile, {
      download: true,
      header: true,
      complete: (results) => {
        if (index >= 0 && index < results.data.length) {
          resolve(results.data[index]);
        } else {
          reject(new Error(`Index out of bounds: ${index}`));
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

export default GetWord;