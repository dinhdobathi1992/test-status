const fs = require('fs');
const { SSMClient, PutParameterCommand } = require('@aws-sdk/client-ssm');
const { ENV_PARAMS } = require('./constants');
const { waitForEnter, logAwsProfile, delay } = require('./utils');

const filename = process.argv[2];

if (!filename) throw new Error('Please provide an env file name');

console.log('Using env file: ', filename);

const setup_params = JSON.parse(fs.readFileSync(filename, 'utf8'));

// Initialize the SSM (Simple Systems Manager) service
const ssm = new SSMClient({ region: setup_params.aws_region });

// Function to add or update a parameter
async function addOrUpdateParameter(name, value) {
  try {
    await ssm.send(
      new PutParameterCommand({
        Name: name,
        Value: value,
        Type: 'String',
        Overwrite: true,
      })
    );
    console.log(`Parameter updated: ${name}`);
  } catch (error) {
    console.error(`Error updating parameter: ${name}`, error);
  }
}

// Iterate over each key in your file and update the parameter store
async function updateParameters() {
  const values = [];

  for (const { var_name, key, staged, json } of ENV_PARAMS) {
    if (staged) {
      const dev = setup_params[key]['dev'];
      const prod = setup_params[key]['prod'];
      values.push([
        `${var_name}-dev`,
        json ? JSON.stringify(dev) : dev.toString(),
      ]);
      values.push([
        `${var_name}-prod`,
        json ? JSON.stringify(prod) : prod.toString(),
      ]);
    } else {
      const value = setup_params[key];
      values.push([var_name, json ? JSON.stringify(value) : value.toString()]);
    }
  }

  for (const [name, value] of values) {
    if (value) {
      await addOrUpdateParameter(name, value);
      await delay(500);
    }
  }
}

logAwsProfile();
waitForEnter(updateParameters);
