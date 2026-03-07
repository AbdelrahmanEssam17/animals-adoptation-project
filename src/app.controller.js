import dbconeection from "./DB/db.connection.js"
import authroutes from '../src/moduels/auth/auth.routes.js'
import {globalErrorhandling} from '../src/utils/response/error.response.js'
import upload from '../src/middleware/multer.uploads.js'
import petRouter from '../src/moduels/pet/pet.route.js'

import shopRouter from '../src/moduels/shop/shop.route.js'
import orderRouter from '../src/moduels/order/order.route.js'
import reportRouter from '../src/moduels/report/report.route.js'
import reviewRouter from '../src/moduels/review/review.router.js'
import doctorsRouter from '../src/moduels/doctor/doctor.routes.js'
import appointmentRouter from '../src/moduels/appointment/appointment.routes.js'
import postRouter from '../src/moduels/post/post.routes.js'
import wishlistRouter from '../src/moduels/wishlist/wishlist.routes.js'

import cors from 'cors'
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import adminRouter from "./moduels/admin/admin.routes.js"

const bootstrap =(app,express)=>{
    app.use(express.json())
    app.use(cors())
 app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  app.get("/", (req, res) => {
    res.send("<a href='/auth/google'>Login with Google</a>");
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/profile");
    }
  );

  app.get("/profile", (req, res) => {
    res.send(`Welcome ${req.user.displayName}`);
  });

  app.get("/logout", (req, res, next) => {
    req.logout(err => {
      if (err) return next(err);
      res.redirect("/");
    });
  });

    app.use('/auth',authroutes)
    app.use('/pets', petRouter);
    app.use('/product', shopRouter);
    app.use('/orders', orderRouter);
    app.use('/reports', reportRouter);
    app.use('/reviews', reviewRouter)
    app.use('/doctors', doctorsRouter)
    app.use('/appointment', appointmentRouter)
    app.use('/post', postRouter)
    app.use('/admin', adminRouter)
    app.use('/wishlist', wishlistRouter)






app.post('/profile', upload.single('photo'), (req, res, next) => {
  res.json({ message: "success" });
});







 app.use("*",(req,res,next)=>{
    return res.status(404).json({message:"invalid routing"})


 })
 app.use(globalErrorhandling)
 dbconeection()

}


export default bootstrap