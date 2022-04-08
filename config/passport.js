const passport = require('passport');
const LocalStrategy = require('passport-local');
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const user = require('../models/user');
const cookieSession = require('cookie-session');
const secret = 'secretCuisine123';

module.exports = function(app) {
    passport.serializeUser(function(user, done){
        console.log('serializeUser');
        done(null, user.id);
        console.log(user.id);
    });
    passport.deserializeUser(async function(id, done){
        console.log('deserializeUser');
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
        })
    }));

    app.use(
        cookieSession({
          name:'session',
          keys: [secret],
      
          //Cookie Options
          maxAge: 24*60*60*1000, //24hour
        })
    );
    
    app.use(passport.initialize());
    app.use(passport.session());
    }