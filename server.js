const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

const csrfMiddleware = csrf({ cookie: true });

// Start the server
const PORT = process.env.PORT || 3000;

const app = express(); // Declare the app object here

// Cross Origin Resource Sharing
const whitelist=['https://www.savvyo.in','http://127.0.0.1:5500','http://localhost:3000','http://localhost:3002'];
const corsOptions ={
    origin:(origin, callback)=>{
        if (whitelist.indexOf(origin) !==-1 ||!origin){
            callback(null,true)
        }else{
            callback(new Error('NOT ALLOWED BY CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '/public')));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));
// Parse cookies
app.use(cookieParser());

// Use CSRF middleware
app.use(csrfMiddleware);

// Set up the rendering engine
app.engine("html", require("ejs").renderFile);

// Include routes
app.use('/', require('./routes/website'));
app.use('/Admin', require('./routes/admin'));
app.use('/Seller', require('./routes/seller'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
