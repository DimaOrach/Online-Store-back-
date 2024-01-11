require('dotenv').config();
const express = require('express');
const sequelize = require('./database');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload')
const router = require('./routes/index');
const ErrorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);
//обробка помилок, останній мідлвейр
app.use(ErrorHandler);




async function start() {
    await sequelize.authenticate();
    await sequelize.sync();
    try {
        app.listen(PORT, () => console.log(`SERVER IS WORKING ON PORT ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();
