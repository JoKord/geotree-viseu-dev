'use strict';
var sql = require('../sql').permissions;
module.exports = (rep, pgp) => {
  return {
    hasPermission: (userRole, PERMISSION_ID) => 
      rep.one(sql.hasPermission, {role:userRole, perm:PERMISSION_ID}) 
  };
};