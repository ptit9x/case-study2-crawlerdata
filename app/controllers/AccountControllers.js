'use strict';

const MssqlService = require('../lib/MssqlService');
const { isEmail } = require('../lib/helpers');

const search = async (ctx) => {
  const sql = MssqlService.service;
  const {
    accountId,
    email,
    phone,
    identifyId,
    page,
    pageSize,
    searchBy
  } = ctx.request.query;
  if (accountId && !(+accountId)) {
    return ctx.res.badRequest({ message: 'Mã tài khoản không hợp lệ' });
  }
  if (email && !isEmail(email)) {
    return ctx.res.badRequest({ message: 'Email không hợp lệ' });
  }
  const search = searchBy || 1;
  const accountCashBackId = search === 2 ? accountId : null;
  const accId = search === 1 ? accountId : null;
  const parameters = {
    'AccountID': { 'type': MssqlService.Int, 'value': +accId || null },
    'AccountCashBackID': { 'type': MssqlService.Int, 'value': +accountCashBackId || null },
    'Email': { 'type': MssqlService.VarChar(200), 'value': email || null },
    'Phone': { 'type': MssqlService.VarChar(20), 'value': phone || null },
    'DentityNumber': { 'type': MssqlService.NVarChar(200), 'value': identifyId || null },
    'PageSize': { 'type': MssqlService.Int, 'value': +pageSize || 20 },
    'PageNumber': { 'type': MssqlService.Int, 'value': +page || 1 }
  };
  const results = await sql.findMany('usp_CbInside_SearchAccount', parameters);
  if (results.status) {
    return ctx.res.ok(results);
  }

  return ctx.res.internalServerError(results);
};

module.exports = {
  search,
};
