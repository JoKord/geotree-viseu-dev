'use strict';
var sql = require('../sql').trees;
module.exports = (rep, pgp) => {
  return {
    findOne: values =>
      rep.oneOrNone(sql.findOne, values),
    findAll: values =>
      rep.many(sql.findAll, values),
    insertOne: values =>
      rep.one(sql.insertOne, values, tree => tree.id),
    deleteOne: values => 
      rep.one(sql.deleteOne, values, tree => tree.id),
    updateOne: values => 
      rep.one(sql.updateOne, values, tree => tree.id),
  };
};