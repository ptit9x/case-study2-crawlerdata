/** 
 * Crawler website vnexpress.net 
 **/
const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const { SMS_BUSINESS_DB } = require('../config/db');
const Link = require('../models/link');

mongoose.connect(SMS_BUSINESS_DB).catch((err) => {
  console.log(err, 11111111111111);
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

const getDetailUrl = async () => {
    return Link.findOne({ status: false, domain: 'kenh14' }, (err, link) => {
        if (err) return '';
        if (link) {
            return link.url;
        }
    });
}

const getDetail = async () => {
    const url = await getDetailUrl();
    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(body);
            const title = $('.klw-body-top .kbwc-header h1.kbwc-title').text();
            const desc = $('.klw-body-top .klw-new-content h2.knc-sapo').text();
            const content = $('.klw-body-top .klw-new-content .knc-content').html();
            const metadata = {
                title, desc, content
            }
            console.log(metadata, 'aaaaa')
        }
        
    });
}
getDetail();