const fs = require("fs");

const FILE = process.argv[2];
const file_data = fs.readFileSync(FILE, "utf8").toString();

const main = async () => {
    try {
      const themeObject = JSON.parse(file_data);
      console.log("JSON format is valid:", themeObject);
    } catch (error) {
      console.error("Invalid JSON format:", error);
      process.exit(1);
    }
};

main();
