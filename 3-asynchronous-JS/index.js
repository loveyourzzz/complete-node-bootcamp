/*
const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  if (err) throw err;
  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) return console.log(err.message);
      console.log(res.body.message);

      fs.writeFile('image.txt', res.body.message, (err) => {
        console.log('Random dog image saved successfuly! 🎉');
      });
    });
});
*/

// Solve Callback Hell by using Promise
const fs = require('fs');
const superagent = require('superagent');

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file, sorry. 🥹');
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('I could not write the file, sorry. 🥹');
      resolve('Done!');
    });
  });
};

const getDogimage = async () => {
  try {
    const breadName = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${breadName}`);

    const result1Promise = await superagent.get(
      `https://dog.ceo/api/breed/${breadName}/images/random`
    );
    const result2Promise = await superagent.get(
      `https://dog.ceo/api/breed/${breadName}/images/random`
    );
    const result3Promise = await superagent.get(
      `https://dog.ceo/api/breed/${breadName}/images/random`
    );

    const allResults = await Promise.all([
      result1Promise,
      result2Promise,
      result3Promise,
    ]);

    const allImages = allResults.map((el) => el.body.message).join('\n');
    console.log(`Images:\n${allImages}`);

    await writeFilePromise('image.txt', allImages);
    console.log('Random dog image saved successfuly! 🎉');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2: Ready. 🐶';
};

/*
(async () => {
  try {
  } catch (err) {}
})();
*/

(async () => {
  try {
    console.log('1: Start. 🏃🏻');
    console.log(await getDogimage());
    console.log('3: Done! 🥳');
  } catch (err) {
    console.log('--------------- ERROR ---------------');
  }
})();

/*
console.log('1: Start. 🏃🏻');

getDogimage()
  .then((msg) => {
    console.log(msg);
    console.log('3: Done! 🥳');
  })
  .catch((err) => {
    console.log('--------------- ERROR ---------------');
  });
  */

/*
readFilePromise(`${__dirname}/dog.txt`)
  .then((breadName) => {
    console.log(`Breed: ${breadName}`);
    return superagent.get(
      `https://dog.ceo/api/breed/${breadName}/images/random`
    );
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePromise('image.txt', res.body.message);
  })
  .then(() => {
    console.log('Random dog image saved successfuly! 🎉');
  })
  .catch((err) => {
    console.log(err);
  });
  */
