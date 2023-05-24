const EventEmitter = require('events');

class Sales extends EventEmitter {
	constructor() {
		super();
	}
}

const myEmitter = new Sales();

myEmitter.on('newSale', () => {
	console.log('There was a new sale!');
});

myEmitter.on('newSale', () => {
	console.log('Customer: Ryan.');
});

myEmitter.on('newSale', money => {
	console.log(`He paid ${money}$ for the Knife 🔪.`);
});

myEmitter.emit('newSale', 1024);

//////////////////////////////////////////

const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
	console.log('Request received!');
	console.log(req.url);
	res.end('Request received!');
});

server.on('request', (req, res) => {
	console.log('Another request.');
});

server.on('close', () => {
	console.log('Server closed.');
});

server.listen(8000, '127.0.0.1', () => {
	console.log('Waiting for request...');
});
