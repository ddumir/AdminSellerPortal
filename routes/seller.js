
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const express = require("express");
const admin = require("firebase-admin");
const router = express.Router();

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://otp-eef9a-default-rtdb.firebaseio.com"
});

const csrfMiddleware = csrf({ cookie: true });


// const app = express();


// app.use(express.static("static"));

router.use(bodyParser.json());
router.use(cookieParser());
router.use(csrfMiddleware);

router.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});

router.get("/seller_first_pg", function (req, res) {
  res.render("Seller/seller_first_pg.html");
});

router.get("/s-login", function (req, res) {
  const sessionCookie = req.cookies.session || "";

  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((userData) => {
      console.log("Already logged in:", userData.email, userData.uid);
      // If the seller is already logged in, redirect to the verify_page
      res.redirect("/Seller/verify_page");
    })
    .catch((error) => {
      // If there's no active session, render the seller_first_pg.html page
      res.render("Seller/seller_login.html");
    });
});

function requireAuth(req, res, next) {
  const sessionCookie = req.cookies.session || '';

  admin.auth().verifySessionCookie(sessionCookie, true)
      .then((userData) => {
          // If session is valid, continue to the next middleware or route handler
          req.user = userData;
          console.log("Logged in:", userData.email,userData.uid)
          next();
      })
      .catch((error) => {
          // If session is invalid, redirect to login page or handle unauthorized access
          res.redirect("/Seller/s-login");
      });
}

router.get("/verify_page", requireAuth , function (req, res) {
      res.render("Seller/verify_page.html", { sellerId: req.user.uid });
});

router.get("/product_list", requireAuth , function (req, res) {
  res.render("Seller/product_list.html", { sellerId: req.user.uid });
});





router.post("/sessionLogin", (req, res) => {
  const idToken = req.body.idToken.toString();

  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
});

router.get("/sessionLogout", (req, res) => {
  console.log("Logging out session...");

  try {
    // Clear the session cookie
    console.log("Session Cleared : logged out")
    res.clearCookie("session");

    // Redirect to the login page
    res.redirect("/Seller/s-login");
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).send("Internal Server Error");
  }
});
// router.get("/sessionLogout", (req, res) => {
//   console.log("Session Cleared : logged out")
//   res.clearCookie("session");
//   res.redirect("/Seller/s-login");
// });

module.exports = router;