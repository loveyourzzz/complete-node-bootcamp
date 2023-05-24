const http = require('http');
const url = require('url');
const fs = require('fs');
const slugify = require('slugify');
const replaceTemplate = require(`${__dirname}/modules/replaceTemplate`);

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));

const server = http.createServer((req, res) => {
	const { query, pathname } = url.parse(req.url, true);

	// Overview page
	if (pathname === '/' || pathname === '/overview') {
		res.writeHead(200, {
			'Content-Type': 'text/html',
		});

		const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');

		const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

		res.end(output);

		// Product page
	} else if (pathname === '/product') {
		res.writeHead(200, {
			'Content-Type': 'text/html',
		});

		const product = dataObj[query.id];
		const output = replaceTemplate(tempProduct, product);

		res.end(output);

		// API
	} else if (pathname === '/api') {
		res.writeHead(200, {
			'Content-Type': 'application/json',
		});
		res.end(data);

		// 404
	} else {
		fs.readFile(`${__dirname}/404/404.html`, function (err, data) {
			if (err) throw err;
			res.writeHead(404, { 'Content-Type': 'text/html', 'my-own-header': 'none' });
			res.write(data);
			res.end();
		});
	}

	// res.end('Hello from the server!');
});

server.listen(8000, '127.0.0.1', () => {
	console.log('Listing to requests on port 8000');
});
