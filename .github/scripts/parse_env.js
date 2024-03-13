const fs = require("fs");

const { VercelApiClient } = require("./vercel_api_client");

const FILE = process.argv[2];
const VERCEL_TOKEN = process.argv[3];
const VERCEL_ORG_ID = process.argv[4];
const VERCEL_PROJECT_ID = process.argv[5];
const ENV = process.argv[6];

const main = async () => {
  const vercel_api_client = new VercelApiClient(
    VERCEL_TOKEN,
    VERCEL_ORG_ID,
    VERCEL_PROJECT_ID,
    ENV
  );

  // Read the contents of the file
  const file_env_vars = JSON.parse(fs.readFileSync(FILE, "utf8").toString());

  // Get the current env vars for the project
  const vercel_env_vars = await vercel_api_client.getEnvironmentVars();

  // loop through the file env vars and update the vercel env vars
  for (const [key, value] of Object.entries(file_env_vars)) {
    const vercel_var = vercel_env_vars.find(
      (env) => env.key === key && env.target.includes(ENV)
    );

    const parsed_value = ["string", "number"].includes(typeof value)
      ? value
      : JSON.stringify(value);

    if (!vercel_var) {
      // vercel_var is empty
      await vercel_api_client.addEnvironmentVar(key, parsed_value);
      console.log(`Added ${key} with value ${parsed_value}`);
    } else {
      // vercel_var is not empty
      await vercel_api_client.editEnvironmentVar(
        vercel_var.id,
        key,
        parsed_value
      );
      console.log(`Updated ${key} with value ${parsed_value}`);
    }
    console.log("");
  }

  process.exit();
};

main();
