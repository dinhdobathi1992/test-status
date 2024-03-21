const fs = require("fs");
const NodeRSA = require("node-rsa");

// Load public and private keys
const publicKey = fs.readFileSync('public.pem', 'utf8');
const privateKey = fs.readFileSync('private.pem', 'utf8');
const ENV = process.argv[2];
const FILE = process.argv[3];
// Create RSA instances with keys
const publicKeyInstance = new NodeRSA(publicKey);
const privateKeyInstance = new NodeRSA(privateKey);

// // Read JSON data from a file
// //const jsonData = JSON.parse(fs.readFileSync('example-env.json', 'utf8'));

// // Decrypt data from the encrypted file
const encryptedDataFromFile = fs.readFileSync(FILE, 'utf8');
const decryptedData = privateKeyInstance.decrypt(encryptedDataFromFile, 'utf8');
const destination = `aws/${ENV}/decrypted_data.json`;
// // Save decrypted data to another file
fs.writeFileSync(destination, decryptedData, 'utf8');

console.log('Data decrypted and saved to decrypted_data.json');
