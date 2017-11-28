// Nodejs encryption of buffers
const crypto = require('crypto');
const fs = require('fs');
const zlib = require('zlib');

const secret = process.env.SECRET;
const action = process.env.ACTION;

if (!secret || !action) {
  throw new Error('Secret needed');
}

const algorithm = 'aes-256-ctr';

const input = fs.createReadStream('input.txt');
const output = fs.createWriteStream('output.txt');

if (action === 'encrypt') {
    input
        .pipe(zlib.createGzip())
        .pipe(crypto.createCipher(algorithm, secret))
        .pipe(output);
} else if (action === 'decrypt') {
    input
        .pipe(crypto.createDecipher(algorithm, secret))
        .pipe(zlib.createGunzip())
        .pipe(output);
} else {
    throw new Error('Action encrypt or decrypt needed');
}
