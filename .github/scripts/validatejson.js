
const fs = require("fs");

const FILE = process.argv[2];
const file_data = fs.readFileSync(FILE, "utf8").toString();
const file_env_vars = file_data
.split("\n")
.filter((line) => line.includes("="))
.filter((line) => line.includes("THEME") || line.includes("VESTING_DETAILS"));

for (const variable of file_env_vars) {
    const [key, ...values] = variable.split("=");
    const value = values.join("=");
    const parsed_value = value.slice(1, -1);
    console.log(parsed_value);
    try {
        const themeObject = JSON.parse(parsed_value);
        console.log('JSON format is valid:', themeObject);
    } catch (error) {
        console.error('Invalid JSON format:', error);
        process.exit();
    }
    console.log("");
  }

