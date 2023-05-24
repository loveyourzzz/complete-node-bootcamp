const fs = require('fs');

// Synchronous -> Blocking 👎🏻
const textIn = fs.readFileSync(`${__dirname}/txt/input.txt`, 'utf-8');
console.log(textIn);

// Asynchronous -> Non-Blocking 👍🏻
// But Multi-layer Callback Function -> Callback Hell 🤯
fs.readFile(`${__dirname}/txt/start.txt`, 'utf-8', (err, data1) => {
  if (err) throw err;
  fs.readFile(`${__dirname}/txt/${data1}.txt`, 'utf-8', (err, data2) => {
    if (err) throw err;
    fs.readFile(`${__dirname}/txt/append.txt`, 'utf-8', (err, data3) => {
      if (err) throw err;
      fs.writeFile(
        `${__dirname}/txt/final.txt`,
        `${data2}\n${data3}`,
        'utf-8',
        (err) => {
          if (err) throw err;
          console.log('Done! 👌🏻');
        }
      );
    });
  });
});
console.log('Reading and writing file...');

// Wringting text to a file
const textOut = `This is what we know about avocado: ${textIn}.\n\nCreated on ${Date.now()}.`;

fs.writeFileSync(`${__dirname}/txt/output.txt`, textOut, 'utf-8');
console.log('File written!');
