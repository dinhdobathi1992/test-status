const readline = require('readline');

// create an interface to read from stdin and write to stdout
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function delay(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms); // (A)
  });
}

const logAwsProfile = () => {
  // output a message
  console.log(
    `Using the following AWS profile for the update: ${
      process.env.AWS_PROFILE || 'default'
    }`
  );
  console.log('Please press enter to continue');
};

// const waitForEnter = (
//   promise // wait for the user to hit Enter
// ) =>
//   rl.question('', async () => {
//     // User has hit Enter
//     await promise();

//     // close the readline interface
//     rl.close();

//     process.exit();
//   });

//new function
const waitForEnter = (promise) => {
  console.log('Automatically proceeding...');
  promise().then(() => {
    rl.close();
    process.exit();
  });
};

//

module.exports = { delay, logAwsProfile, waitForEnter };
