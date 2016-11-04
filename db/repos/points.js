'use strict';
var sql = require('../sql').points;
module.exports = (rep, pgp) => {
  return {
    findOne: values => rep.oneOrNone(sql.findOne, values),
    findAll: values => rep.many(sql.findAll),
    insertOne: values => rep.one(sql.insertOne, values, point => point.id),
    deleteOne: values => rep.none(sql.deleteOne, values),
    updateOne: values => rep.one(sql.updateOne, values, point => point),
    patchOne: values => rep.one(sql.patchOne(pgp, values), [], point => point)
  };
};