const fs = require('fs');
const NodeRSA = require('node-rsa');

// Load public and private keys
const publicKey = fs.readFileSync('public.pem', 'utf8');
const privateKey = fs.readFileSync('private.pem', 'utf8');

// Create RSA instances with keys
const publicKeyInstance = new NodeRSA(publicKey);
const privateKeyInstance = new NodeRSA(privateKey);

// Read JSON data from a file
const jsonData = JSON.parse(fs.readFileSync('example-env.json', 'utf8'));

// Encrypt JSON data
const encryptedData = publicKeyInstance.encrypt(
  JSON.stringify(jsonData),
  'base64'
);

// Save encrypted data to a file
fs.writeFileSync('encrypted_data.txt', encryptedData, 'utf8');

console.log('Data encrypted and saved to encrypted_data.txt');

// // Decrypt data from the encrypted file
// const encryptedDataFromFile = fs.readFileSync('encrypted_data.txt', 'utf8');
// const decryptedData = privateKeyInstance.decrypt(encryptedDataFromFile, 'utf8');

// // Save decrypted data to another file
// fs.writeFileSync('decrypted_data.json', decryptedData, 'utf8');

// console.log('Data decrypted and saved to decrypted_data.json');
