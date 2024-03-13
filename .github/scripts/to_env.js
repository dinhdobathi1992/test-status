const fs = require("fs");
const FILE = process.argv[2];
// Read data from .env.preview file
fs.readFile(FILE, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading ${FILE} file:", err);
    return;
  }

  const variables = JSON.parse(data);

  const env_data = Object.entries(variables)
    .map(
      ([key, value]) =>
        `${key}=${
          ["number", "string"].includes(typeof value)
            ? value
            : JSON.stringify(value)
        }`
    )
    .join("\n");

  fs.writeFileSync(`${FILE.replace(".json", "")}`, env_data, "utf8");
});
