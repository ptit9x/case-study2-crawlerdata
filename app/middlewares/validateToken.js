'use strict';

/**
 * Return middleware that validate token from a header
 *
 * @param {string} [options.header=Authorization] - Request and response header authorization.
 * @return {function} Koa middleware.
 */
function validateToken() {
  return (ctx, next) => {
    const APP_KEY = process.env.APP_KEY;
    const token = ctx.request.get('Authorization');
    if (!token) {
      return ctx.res.fail({ statusCode: 401, message: 'Không tồn tại Token' });
    }
    if (token !== APP_KEY) {
      return ctx.res.fail({ statusCode: 401, message: 'Token không thỏa mãn' });
    }
    return next();
  };
}

module.exports = validateToken;
