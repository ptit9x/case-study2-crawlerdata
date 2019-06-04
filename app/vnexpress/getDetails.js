/** 
 * Crawler website vnexpress.net 
 **/
const request = require('request');
const cheerio = require('cheerio');
const fs = require("fs");

function writeLineFromArray(line) {
    fs.open(__dirname + "/output.txt", 'a', 0666, function(err, fd) {
        fs.writeSync(fd, line + '\n');
    }); 
}

const getDetail = async () => {
    const url = 'https://vnexpress.net/thoi-su/chu-tich-tp-hcm-chuc-moi-cua-ong-doan-ngoc-hai-luong-ngang-pho-giam-doc-so-3933752.html';
    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(body);
            const content = $('.sidebar_1 .content_detail').text();

            const contentArr = content.split(" ");
            const count = contentArr.length;
            let myMap = new Map();
            for(let i = 0; i < count; i++) {
                let word = contentArr[i];
                if (word) {
                    let value = myMap.get(word);
                    if (value) {
                        let newCount = value + 1;
                        myMap.set(word, newCount);
                    } else {
                        myMap.set(word, 1);
                    }
                }
            }

            // write file result
            for (let [key, value] of myMap) {
                writeLineFromArray(key + ' ' + value)
            }
        }
        console.log("Successfully Written to File.");
    });
}
getDetail();