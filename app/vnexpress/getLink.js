/** 
 * Crawler website vnexpress.net 
 **/
const request = require('request');
const cheerio = require('cheerio');
const fs = require("fs");

const getLink = async () => {
    const domain = 'https://vnexpress.net';
    request(domain, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(body);
            const results = [];
            $('.container a').each(async function(i, element) {
                const a = $(this).attr('href');
                if (a && a.includes(domain)) {
                    results.push(a);
                }
            });

            fs.writeFile(__dirname + "/input.json", JSON.stringify(results, null, 4), (err) => {
                if (err) console.log(err);
                console.log("Successfully Written to File.");
            });
            return results;
        }
    });
}
getLink();