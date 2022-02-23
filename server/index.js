const express = require('express');
const cors = require('cors');
const session = require('express-session');
const accountRouter = require('./routes/account');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

//server 설정
app.use(
    session({
        secret: '@hotpot',
        resave: false,
        saveUninitialized: true,
        cookie: {
            domain: 'localhost',
            path: '/',
            maxAge: 24 * 6 * 60 * 10000,
            sameSite: 'None',
            httpOnly: true,
            secure: true,
        },
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const corsOption = {
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS']
}
app.use(cors(corsOption));

app.get('/', (req, res) => {
    res.send('Welcome to our server!');
});

//router
//app.use('/account', accountRouter);


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

module.exports = app;