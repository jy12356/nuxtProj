const db = require('../db.js');


exports.limitedList = async(req, res, next) => {
    const conn = db.create_con();
    var result = {};
    result.data = await conn.promise().query(`
    select * from user
  `);

    result.data = result.data[0];

    conn.end();
    res.send(result);
}