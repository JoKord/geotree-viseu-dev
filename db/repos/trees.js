'use strict';
var sql = require('../sql').trees;
module.exports = (rep, pgp) => {
  return {
    findOne: values => rep.oneOrNone(sql.findOne, values),
    findAll: values => rep.many(sql.findAll, values),
    insertOne: values => rep.one(sql.insertOne, values, tree => tree),
    archiveOne: values => rep.none(sql.archiveOne, values),
    updateOne: values => rep.one(sql.updateOne, values, tree => tree),
    patchOne: values => rep.one(sql.patchOne(pgp, values), [], tree => tree)
  };
};