const fs = require("fs");
require("dotenv").config(); // Load .env file
const FILE = process.argv[2];
// Read data from .env.preview file
fs.readFile(FILE, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading ${FILE} file:", err);
    return;
  }

  // Split the data into lines and process each line
  const lines = data.split("\n");
  const parsedData = {};

  lines.forEach((line) => {
    // Extract key-value pairs
    const matches = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (matches && matches.length === 3) {
      const key = matches[1];
      let value = matches[2] || "";

      // Remove quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }

      // Parse arrays or objects if necessary
      if (value.startsWith("[") || value.startsWith("{")) {
        try {
          value = JSON.parse(value);
        } catch (error) {
          console.error("Error parsing JSON value:", error);
        }
      }

      parsedData[key] = value;
    }
  });

  // Convert JavaScript object to JSON string
  const jsonData = JSON.stringify(parsedData, null, 2);

  console.log("Converted JSON data:", jsonData);

  // Optionally, write JSON data to a new file
  fs.writeFileSync(`${FILE}.json`, jsonData, "utf8");
  fs.unlinkSync(FILE);
});
