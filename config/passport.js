const passport = require('passport');
const LocalStrategy = require('passport-local');
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const res = require('express/lib/response');
const user = require('../models/user');

module.exports = function(app) {
    passport.serializeUser(function(user, done){
        done(null, user.id);
        console.log(user.id);
    });
    passport.deserializeUser(async function(id, done){
        try {
            const user = await user.findById(id);
            done(null, user);
        } catch(error) {
            done(error, null);
        }
    });
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'passowrd',
    }, 
    function(username, password, done){
        knex('users')
        .where({
            name: 'username',
        })
        .select('*')
        .then(async function(results){
            if(results.length === 0){
                return done(null, false, {message: 'ユーザ名が正しくありません'});
            }else if(await bcrypt.compare(password, results[0].password)) {
                return done(null, results[0]);
            }else{
                return done(null, false, {message: 'パスワードが一致しません'});
            }

        })
        .catch(function(err){
            console.log(err);
            return done(null, false, {message: err.toString()})
        });
    })
)}