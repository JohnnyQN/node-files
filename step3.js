const fs = require('fs');
const process = require('process');
const axios = require('axios');

/** Utility to determine if a path is a URL */
function isUrl(path) {
  return path.startsWith('http');
}

/** Handle output: write to a file if "out" is provided, else print to console */
function handleOutput(content, outFile) {
  if (outFile) {
    fs.writeFile(outFile, content, 'utf8', function(err) {
      if (err) {
        console.error(`Error: Unable to write to file "${outFile}". Details: ${err.message}`);
        process.exit(1);
      }
    });
  } else {
    console.log(content);
  }
}

/** Read file at a given path and handle its contents */
function readFileAndHandle(path, outFile) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`Error: Unable to read file at "${path}". Details: ${err.message}`);
      process.exit(1);
    } else {
      handleOutput(data, outFile);
    }
  });
}

/** Fetch content from a URL and handle its contents */
async function fetchAndHandle(url, outFile) {
  try {
    let response = await axios.get(url);
    handleOutput(response.data, outFile);
  } catch (err) {
    console.error(`Error: Unable to fetch URL "${url}". Details: ${err.message}`);
    process.exit(1);
  }
}

// Parse command-line arguments
let outFile = null;
let path = null;

if (process.argv[2] === '--out') {
  outFile = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

// Validate arguments
if (!path) {
  console.error('Error: Missing path or URL argument.');
  process.exit(1);
}

// Handle based on argument type
if (isUrl(path)) {
  fetchAndHandle(path, outFile);
} else {
  readFileAndHandle(path, outFile);
}
