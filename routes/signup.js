const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function(req, res, next) {
    const userId = req.session.userid;
    const isAuth = Boolean(userId);
    res.render('signup', {
        title: 'Sign up',
        isAuth: isAuth,
    });
});

router.post('/', function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const repassword = req.body.repassword;
    const userId = req.session.userid;
    const isAuth = Boolean(userId);

    knex('users')
     .where({name: username})
     .select('*')
     .then(function(result) {
         if (result.length !== 0) { //入力されたusernameがnameカラムに既存するとき
            res.render('signup', {
                title: 'Sign up',
                isAuth: isAuth,
                errorMassage: ['このユーザ名は既に使われています'],
            })
         } else if (password === repassword) { //all clearの時
             knex('users')
              .insert({name: username,password: password})
              .then(function() {
                  res.redirect('/');
              })
              .catch(function(err) {
                console.log(err);
                res.render('signup', {
                    title: 'Sign up',
                    isAuth: isAuth,
                    errorMassage: [err.sqlMassage],
                });
              });
         } else { // usernameが既存ではないが、passとrepassが一致しない時
             res.render('signup', {
                 title: 'Sign up',
                 isAuth: isAuth,
                 errorMassage: ['パスワードが一致しません'],
             });
         }
     })
     .catch(function(err) {
         console.log(err);
         res.render('signup', {
             title: 'Sign up',
             isAuth: isAuth,
             errorMassage: [err.sqlMassage],
         });
     });
});

module.exports = router;