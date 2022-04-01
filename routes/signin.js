const express = require('express');
const router = express.Router();
const knex = require('../db/knex.js')

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
         password: password,
     })
     .select('*')
     .then(function(result) {
         if (result.length === 0) {
             res.render('signin',{
                 title: 'Sign in',
                 isAuth: isAuth,
                 errorMassage:['ユーザが見つかりません'],
             });
         } else {
             req.session.userid = result[0].id;
             res.redirect('/');
             
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