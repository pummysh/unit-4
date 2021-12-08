require("dotenv").config();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const User = require('../model/user')
const newToken =(user)=>{
  return jwt.sign({user: user},process.env.JWT_ACCESS_KEY);
};
const {uuid}=require("uuidv4");
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:2167/auth/google/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
   console.log( accessToken, refreshToken, profile)
   let user=await User.findOne({email:profile?._json?.email})
   
   if(!user){
     user=await User.create({name:profile?._json?.name,email:profile?._json?.email,
    password:uuid()})
   }  
    const token=newToken(user);
    return done(null, {user,token});
  }
));


module.exports = passport;