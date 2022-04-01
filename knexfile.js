// Update with your config settings.
const rootPassword = 'hidden' //これでしっかり動作するか確認必須。
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