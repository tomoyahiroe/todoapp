const express = require('express');
const router = express.Router();
const knex = require('../db/knex.js')
const bcrypt = require('bcrypt');

router.get('/', function (req, res, next) {
    const userId = req.session.userid;
    const isAuth = Boolean(userId);

    res.render('signin', {
        title: 'Sign in',
        isAuth: isAuth,
    });
});

router.post('/', function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const userId = req.session.userid;
    const isAuth = Boolean(userId);

    knex('users')
     .where({
         name: username,
     })
     .select('*')
     .then(async function(result) {
         if (result.length === 0) {
             res.render('signin',{
                 title: 'Sign in',
                 isAuth: isAuth,
                 errorMassage:['ユーザが見つかりません'],
             });
         } else if(comparedPassword = bcrypt.compare(password, result[0].password)) {
             req.session.userid = result[0].id;
             res.redirect('/');
         } else {
             res.render('signin', {
                 title: 'Sign in',
                 errorMassage: ['パスワードが一致しません'],
                 isAuth: isAuth,
             })
         }
     })
     .catch(function (err){
         console.log(err);
         res.render('signin',{
             title: 'Sign in',
             errorMassage: [err.sqlMassage],
             isAuth: isAuth,
         });
     });
});

module.exports = router ;