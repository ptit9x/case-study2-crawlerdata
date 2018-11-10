/** 
 * Crawler website vnexpress.net 
 **/
const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const { SMS_BUSINESS_DB } = require('../config/db');
const Link = require('../models/link');

mongoose.connect(SMS_BUSINESS_DB).catch((err) => {
  console.log(err, 'error connect to mongoDB');
});

const insertLink = async (obj) => {
    const { url } = obj;
    Link.findOne({ url }, (err, link) => {
        if (err) console.log(err, 'err');
        if (!link) {
            const data = new Link(obj);
            data.save().then((e) => {
                if (e) console.log(e, ' e')
                else console.log('success');
            })
        }
    });
    
}

const getLink = async () => {
    request('https://kenh14s.cnnd.vn/tag-news-per.chn?tag_url=phim-chieu-rap&page=1', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(body);
            const results = [];
            $('li.knswli').each(async function(i, element) {
                const a = $(this).children('.knswli-right').children('.knswli-title').children('a').attr('href');
                const html = $(this).html();
                const image = html.split('&apos;')[1];
                if (a && image) {
                    const metadata = { url: 'http://kenh14.vn' + a, image, domain: 'kenh14' };
                    results.push(metadata);
                    await insertLink(metadata);
                }
            });
            return results;
        }
    });
}

module.exports = getLink;