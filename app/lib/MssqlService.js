'use strict';

const dotenv = require('dotenv');
const sql = require('mssql');

// Load environment variables from .env file
dotenv.config();

class MssqlService {
  constructor() {
    this.config = {
      user: process.env.MSSQL_USERNAME,
      password: process.env.MSSQL_PASSWORD,
      server: process.env.MSSQL_HOST,
      database: process.env.MSSQL_NAME,
      connectionTimeout: 10000,
      requestTimeout: 15000,
      pool: {
        max: 1,
        min: 0,
        idleTimeoutMillis: 300
      }
    };
  }

  async execute(name, inputData, outputData) {
    const result = { 'status': true, 'message': 'Successful' };
    const con = new sql.ConnectionPool(this.config);
    try {
      await con.connect();
      const request = con.request();
      for (let field in inputData) {
        request.input(field, inputData[field].type, inputData[field].value);
      }
      if (typeof outputData !== 'undefined') {
        for (let field in outputData) {
          request.output(field, outputData[field]);
        }
      }

      const data = await request.execute(name);
      result.data = data.recordset;
      if (typeof outputData !== 'undefined') {
        result.output = data.output;
      }
      con.close();
    } catch (err) {
      if (con !== null) {
        con.close();
      }
      sql.close();
      result.status = false;
      result.message = err.message;
    }
    return result;
  }

  async insert(name, inputData) {
    let result_execute = await this.execute(name, inputData);
    let result = {
      'status': result_execute.status,
      'message': result_execute.message
    };
    if (result_execute.status === 1) {
      let data = result_execute.data[0];
      if (data.hasOwnProperty('Flag')) {
        if (data.Flag > 0) {
          result.status = 0;
          result.message = data.Description;
        } else {
          result.status = 1;
          result.message = data.Description;
        }
      } else {
        result.content = data;
      }
    }
    return result;
  }
  async findOne(name, inputData) {
    const result_execute = await this.execute(name, inputData);
    const { data, status, message } = result_execute;
    const results = { status, message };
    if (data && status) {
      results.data = data[0] || null;
    }

    return results;
  }

  async getList(name, inputData) {
    const response = await this.execute(name, inputData);
    const { status, message, data } = response;
    const results = { status, message };
    if (data && status) {
      results.data = data;
    }

    return results;
  }

  /* search */
  async findMany(name, inputData) {
    const outputData = { 'Total': sql.Int };
    const limit = inputData.PageSize.value;
    const page = inputData.PageNumber.value;
    const response = await this.execute(name, inputData, outputData);
    const { status, message, data, output } = response;
    if (data && status) {
      const results = {
        status,
        message,
        data: {
          content: data,
          totalElements: 0,
          totalPages: 1,
          page
        },
      };
      if (output && output.Total) {
        const totalElements = output.Total;
        results.data.totalElements = totalElements;
        results.data.totalPages = Math.ceil(totalElements / limit);
      }
      return results;
    } else {
      return { status, message: message || 'Không tìm thấy kết quả' };
    }
  }
}

module.exports = {
  service: new MssqlService(),
  String: sql.NVarChar,
  NVarChar: sql.NVarChar,
  NChar: sql.NChar,
  VarChar: sql.VarChar,
  Number: sql.Int,
  Int: sql.Int,
  Money: sql.Money,
  Boolean: sql.Bit,
  Date: sql.Date,
  DateTime: sql.DateTime,
  Buffer: sql.VarBinary,
  Table: sql.TVP
};
