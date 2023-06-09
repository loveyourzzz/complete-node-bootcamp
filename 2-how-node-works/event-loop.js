const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 2;

setTimeout(() => console.log('Timer 1 finished.'), 0);

setImmediate(() => console.log('Immediate 1 finished.'));

fs.readFile(`${__dirname}/test.txt`, () => {
	console.log('I/O finished.');

	console.log('-----------------------------');

	setTimeout(() => console.log('Timer 2 finished.'), 0);

	setTimeout(() => console.log('Timer 3 finished.'), 3000);

	setImmediate(() => console.log('Immediate 2 finished.'));

	process.nextTick(() => console.log('Process.nextTick.'));

	crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
		console.log(`Password 1 encrypted, using time ${Date.now() - start}.`);
	});

	crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
		console.log(`Password 2 encrypted, using time ${Date.now() - start}.`);
	});

	crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
		console.log(`Password 3 encrypted, using time ${Date.now() - start}.`);
	});

	crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
		console.log(`Password 4 encrypted, using time ${Date.now() - start}.`);
	});

	crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
		console.log(`Password 5 encrypted, using time ${Date.now() - start}.`);
	});
});

console.log('Hello from the top-level code.');
