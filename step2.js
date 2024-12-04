const fs = require('fs');
const process = require('process');
const axios = require('axios');

/** Utility to determine if a path is a URL */
function isUrl(path) {
  return path.startsWith('http');
}

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

/** Fetch content from a URL and print its contents */
async function fetchAndPrint(url) {
  try {
    let response = await axios.get(url);
    console.log(response.data);
  } catch (err) {
    console.error(`Error: Unable to fetch URL "${url}". Details: ${err.message}`);
    process.exit(1);
  }
}

// Determine the argument type and handle accordingly
const path = process.argv[2];
if (isUrl(path)) {
  fetchAndPrint(path);
} else {
  readFileAndPrint(path);
}
