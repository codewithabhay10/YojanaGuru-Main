const fs = require('fs');
const path = require('path');

const fetchSchemes = async () => {
  try {
    const filePath = path.join(__dirname, '../data/schemes.json');
    const data = fs.readFileSync(filePath, 'utf8');
    console.log("Fetched Schemes Data:", data); // Debugging
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading schemes from JSON:', error);
    throw error;
  }
};

module.exports = fetchSchemes;
