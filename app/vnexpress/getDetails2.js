/** 
 * Crawler website vnexpress.net 
 **/
const request = require('request');
const cheerio = require('cheerio');
const fs = require("fs");

const writeLineFromArray = (line) => {
    fs.open(__dirname + "/output.txt", 'a', 0666, function(err, fd) {
        fs.writeSync(fd, line + '\n');
    }); 
}

const getLink = async (domain = 'https://vnexpress.net') => {
    return new Promise((resolve, reject) => {
        request(domain, (error, response, body) => {
            if (error) {
                reject(error);
            }
            const results = [];
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(body);
                $('.container a').each(async function(i, element) {
                    const a = $(this).attr('href');
                    if (a && a.includes(domain)) {
                        results.push(a);
                    }
                });
            }
            resolve(results);
        });
    });
}

const getContent = async (url) => {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (error) {
                reject(error);
            }
            let content = '';
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(body);
                content = $('.sidebar_1 .content_detail').text();
            }
            resolve(content);
        });
    });
}

const crawlerVnexpress = async () => {
    const urls = await getLink();
    // console.log(urls, 'urlsurlsurls');
    const countUrls = urls.length;
    if(countUrls > 0) {
        let myMap = new Map();
        for(let i = 0; i < countUrls; i++) {
            const content = await getContent(urls[i]);

            const contentArr = content.split(" ");
            const count = contentArr.length;
            if (count > 0) {
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
            }
        }

        // write file result
        for (let [key, value] of myMap) {
            writeLineFromArray(key + ' ' + value)
        }
    }
}

crawlerVnexpress();