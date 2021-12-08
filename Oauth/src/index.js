const express = require('express');
const app = express();
app.use(express.json());
const passport = require("./configs/passport");
app.use(passport.initialize());

const productController = require("./controllers/product-controller");
const userController = require("./controllers/user-controller");

app.use("/user",userController);
app.use("/product",productController);

app.get('/auth/google',
passport.authenticate('google', { scope:
    [ 'email', 'profile' ] }
    ));

app.get( '/auth/google/callback',
passport.authenticate( 'google', {
        // successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure',
        session: false
    }),
    function(req, res) {
        return res.send({user: req.user})
    }
    );
    
    module.exports =app;