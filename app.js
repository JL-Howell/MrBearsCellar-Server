require('dotenv').config();
const express = require('express');
const db = require('./db');
const app = express();


const controllers = require('./controllers');
app.use(require('./middleware/headers'));


app.use(require('./middleware/headers'));


// let submission = require('./controllers/submissioncontroller');
// let user = require('./controllers/usercontroller');


app.use(express.json());
app.use('/user', controllers.usercontroller);
app.use('/submission', controllers.submissioncontroller);
app.use('/comment', controllers.commentcontroller);


db.authenticate()
        .then(() => db.sync()) // => {force: true}
        .then(() => {
            app.listen(process.env.PORT, () => console.log(`[Server:] App is listening on Port ${process.env.PORT}`));
        })
        .catch((err) => {
            console.log("[Server: ] Server Crashed");
            console.error(err);
        });





