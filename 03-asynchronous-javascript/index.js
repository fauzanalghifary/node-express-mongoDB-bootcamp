const fs = require('fs');
const superagent = require('superagent');

// CALLBACK HELL

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//     console.log(`Breed: ${data}`);
//     superagent
//         .get(`https://dog.ceo/api/breed/${data}/images/random`)
//         .end((err, res) => {
//             if (err) return console.log(err.message);
//             console.log(res.body);
//             fs.writeFile('dog-img.txt', res.body.message, err => {
//                 console.log('Random dog iamge saved to file');
//             });
//         });
// });

// PROMISE

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) reject('Could not write file');
            resolve(data);
        });
    });
};

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('I could not find that file');
            resolve(data);
        });
    });
};

// readFilePro(`${__dirname}/dog.txt`)
//     .then(data => {
//         console.log(`Breed: ${data}`);
//         return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//     })
//     .then(res => {
//         console.log(res.body.message);
//         return writeFilePro('dog-img.txt', res.body.message);
//     })
//     .then(() => {
//         console.log('Random dog iamge saved to file');
//     })
//     .catch(err => {
//         console.log(err);
//     });

// ASYNC AWAIT

const getDogPic = async () => {
    try {

        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

        const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
        const imgs = all.map(el => el.body.message);
        console.log(imgs);

        await writeFilePro('dog-img.txt', imgs.join('\n'));
        console.log('Random dog iamge saved to file');

    } catch (err) {
        console.log(err);
        throw (err);
    }
    return '2. READY';
};

// console.log('1. Will get dog pics!');
// getDogPic()
//     .then(x => {
//         console.log(x);
//         console.log('3. DONE get dog pics!');
//     })
//     .catch(err => {
//         console.log('ERROR DONG!!!');
//     });

(async () => {
    try {
        console.log('1. Will get dog pics!');
        const x = await getDogPic();
        console.log(x);
        console.log('3. DONE get dog pics!');
    } catch (err) {
        console.log('ERROR DONG!!!');
    }
})();