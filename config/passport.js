//we import passport packages required for authentication
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
//
//We will need the models folder to check passport against
var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    // usernameField: "email"
    usernameField: "username"
  },
  // function(email, password, done) {
  function(username, password, done) {
    // When a user tries to sign in this code runs
    db.User.findOne({
      where: {
        // email: email
        username: username
      }
    }).then(function(dbUser) {
      // If there's no user with the given email
      if (!dbUser) {
        return done(null, false, {
          // message: "Incorrect email."
          message: "Incorrect username."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;






















// //we import passport packages required for authentication
// var passport = require("passport");
// var LocalStrategy = require("passport-local").Strategy;
// //
// //We will need the models folder to check passport against
// var db = require("../models");

// // Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
// passport.use(new LocalStrategy(
//   // Our user will sign in using an email, rather than a "username"
//   {
//     // usernameField: "email"
//     usernameField: "username"
//   },
//   // function(email, password, done) {
//   function(username, password, done) {
//     // When a user tries to sign in this code runs
//     db.User.findOne({
//       where: {
//         // email: email
//         username: username
//       }
//     }).then(function(dbUser) {
//       // If there's no user with the given email
//       if (!dbUser) {
//         return done(null, false, {
//           // message: "Incorrect email."
//           message: "Incorrect username."
//         });
//       }
//       // If there is a user with the given email, but the password the user gives us is incorrect
//       else if (!dbUser.validPassword(password)) {
//         return done(null, false, {
//           message: "Incorrect password."
//         });
//       }
//       // If none of the above, return the user
//       return done(null, dbUser);
//     });
//   }
// ));

// // In order to help keep authentication state across HTTP requests,
// // Sequelize needs to serialize and deserialize the user
// // Just consider this part boilerplate needed to make it all work
// passport.serializeUser(function(user, cb) {
//   cb(null, user);
// });

// passport.deserializeUser(function(obj, cb) {
//   cb(null, obj);
// });

// // Exporting our configured passport
// module.exports = passport;






// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy
// var bcrypt = require('bcrypt-nodejs');
// var db = require('../models');
// // var logic = require("./serverSideLogic");
// var saveUser = {
// }

// module.exports = function(passport) {

// const authenticate = (username, password, done) => {
//   db.User.findOne({
//     where: {
//       username: username
//     }
//   }).then(function(user) {
//     if (!user || !bcrypt.compareSync(password, user.password)) { 
//       return done(null, false, {message: 'invalid user and password combination'});
//     }
//     updateLogin(username);
//     done(null, user);
//   }).catch(done) 
// }
// function updateLogin(username){
//   db.User.update({
//     lastLogin: logic.getCurrentDate()
//   },{
//     where: {
//       username: username
//     }
//   }).then(function(user) {
//     console.log("Last Login date has been updated");

//   });
// }


// const register = (req, username, password, done) => {
//   // Check whether there is a user with the signup
//   db.User.findOne({
//     where: {
//       username: username
//     }
//   }).then(function(user) {
//     saveUser = {
//       username: req.body.username,
//       password: req.body.password,
//     }
//     if (user) {
//       return done(null, false, { message: 'an account with that username has already been created' });
//     }
//     if (password !== req.body.password) {
//       return done(null, false, { message: `passwords don't match` });
//     }
//     const newUser = {
//       username,
//       password: bcrypt.hashSync(password)
//     }
//     db.User.create(newUser).then(function(ids) {
//       newUser.id = ids.dataValues.id;
//       done(null, newUser)
      
//     })

//   }).catch(done)

// }

// passport.use(new LocalStrategy(authenticate));
// passport.use('local-register', new LocalStrategy({passReqToCallback: true}, register));


// // function updateStocks(saveUser) {
// //   var currentDate = logic.getCurrentDate();
// //   db.User.update({
// //             stock1: saveUser.stock1,
// //             lastLogin: currentDate
// //           }, {
// //             where: {
// //               username: saveUser.username
// //             }
// //           }).done()

// // }

// // Choose what to send as a cookie to the client side
// passport.serializeUser((user, done) => {
//   done(null, user.id);
  
// });

// // Get the entire user information from the database based on the user id
// passport.deserializeUser((id, done) => {
//   db.User.findAll({}).then(function(user) {
//     done(null, user)
//   }).catch(done);
// });

// }

