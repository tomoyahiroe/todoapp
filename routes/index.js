const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const mysql = require('mysql');
const fse = require('fs-extra');

const homedir = require('os').homedir();
const foo = fse.readJsonSync(`${homedir}/access.json`);
const rootPass = foo.mysql;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: rootPass,
  database: 'todo_app'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);

  knex('tasks')
    .select('*')
    .then(function(results) {
      console.log(`results: ${results}`);
      res.render('index', {
        title: 'ToDo App',
        todos: results,
        isAuth: isAuth,
      });
    })
    .catch(function(err) {
      console.log(`error: ${err}`);
      res.render('index', {
        title: 'ToDo App',
        isAuth: isAuth,
      });
    });
});

router.post('/', function(req, res, next) {
  const todo = req.body.add;
  console.log(todo);
  knex('tasks')
    .insert({user_id: 1, content: todo})
    .then(function() {
      res.redirect('/');
      console.log('Success');
    })
    .catch(function(err) {
      console.log(err);
      res.render('index', {
        title: 'ToDo App',
        isAuth: isAuth,
      })

    });
});

router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/logout', require('./logout'));
module.exports = router;


//アプリは施錠に動くが、ejs上でのパスの通し方に疑問が残っている。