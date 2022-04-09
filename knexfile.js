// Update with your config settings.
const fse = require('fs-extra');
const homedir = require('os').homedir();
const foo = fse.readJsonSync(`${homedir}/access.json`);
const rootPass = foo.mysql;

module.exports = {

  development: {
    client: "mysql",
    connection: {
      database: "todo_app",
      user: "root",
      password: rootPass,
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
      password: rootPass,
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
      password: rootPass,
    },
    pool: {
      min: 2,
      max: 10
    },
  }

};