'use strict';
var path = require('path');
// Bluebird is the best promise library available today,
// and is the one recommended here:
var promise = require('bluebird');
// Loading all the database repositories separately,
// because event 'extend' is called multiple times:
var repos = {
    trees: require('./repos/trees'),
    users: require('./repos/users'),
    permissions: require('./repos/permissions')
};
// pg-promise initialization options:
var options = {
    // Use a custom promise library, instead of the default ES6 Promise:
    promiseLib: promise,
    // Extending the database protocol with our custom repositories:
    extend: obj => {
        // 1. Do not use 'require()' here, because this event occurs for every task
        //    and transaction being executed, which should be as fast as possible.
        // 2. We pass in `pgp` in case it is needed when implementing the repository;
        //    for example, to access namespaces `.as` or `.helpers`
        obj.trees = repos.trees(obj, pgp);
        obj.users = repos.users(obj, pgp);
        obj.permissions = repos.permissions(obj, pgp);
    }
};
// Database connection parameters:
var conObj = require(path.join(__dirname, '../config', 'database'));
// Load and initialize pg-promise:
var pgp = require('pg-promise')(options);
// Create the database instance:
var db = pgp(conObj);
// If you ever need to change the default pool size, here's an example:
// pgp.pg.defaults.poolSize = 20;
module.exports = {
    // Library instance is often necessary to access all the useful
    // types and namespaces available within the library's root:
    pgp,
    // Database instance. Only one instance per database is needed
    // within any application.
    db
};