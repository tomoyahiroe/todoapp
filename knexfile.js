// Update with your config settings.
const fs = require('fs-extra');
const homedir = require('os').homedir();
const foo = fs.readJSONSync(`${homedir}/access.json`);
const rootPassword = foo.mysql 
module.exports = {

  development: {
    client: "mysql",
    connection: {
      database: "todo_app",
      user: "root",
      password: rootPassword,
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  staging: {
    client: "mysql",
    connection: {
      database: "todo_app",
      user: "root",
      password: rootPassword,
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  production: {
    client: "mysql",
    connection: {
      database: "todo_app",
      user: "root",
      password: rootPassword,
    },
    pool: {
      min: 2,
      max: 10
    },
  }

};