const db = {
    user: 'ngochuynh',
    pass: 'abcd1234',
    host: 'ds145083.mlab.com',
    port: 45083,
    name: 'crawlers',
};

module.exports = {
    SMS_BUSINESS_DB: `mongodb://${db.user}:${db.pass}@${db.host}:${db.port}/${db.name}`,
};