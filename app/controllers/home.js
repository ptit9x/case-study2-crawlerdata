'use strict';

const pkginfo = require('../../package.json');

exports.getApiInfo = ctx => {
  // BUSINESS LOGIC
  const data = {
    name: pkginfo.name,
    version: pkginfo.version,
    description: pkginfo.description,
    author: pkginfo.author
  };

  return ctx.res.ok({
    data,
    message: 'Hello, API!'
  });
};
