const fs = require('fs');
const process = require('process');

/** Read file at a given path and print its contents */
function readFileAndPrint(path) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`Error: Unable to read file at "${path}". Details: ${err.message}`);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

// Command-line argument for the file path
readFileAndPrint(process.argv[2]);
