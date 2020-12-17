require('dotenv').config();
const express = require('express');
const app = express();
const db = require("./db");

const user = require('./controllers/usercontroller');
app.use(require('./middleware/headers'));

app.use(express.json());

app.use('/user', user);

db.authenticate()
.then(() => db.sync()) // => {force: true}
.then(() => {
    app.listen(process.env.PORT, () => console.log(`[Server: ] App is listening on Port ${process.env.PORT}`));
})
.catch((err) => {
    console.log("[Sever: ] Server Crashed");
    console.error(err);
})
