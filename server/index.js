const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;
const investmentRoutes = require('./routes/investment');

const MONGO_URI =
    'mongodb+srv://naor:naormor315@cluster0.epcno.mongodb.net/GIC_DB?retryWrites=true&w=majority';

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    req.userId = '5fca183bd3a1a513a813f2ea';
    next();
})

app.use('/investment', investmentRoutes);

app.use((err, req, res, next) => {
    console.log("🚀 ~ app.use ~ err", err)
    const status = err.statusCode || 500;
    const message = err.message;
    res.status(status).json({ message });
})

mongoose
    .connect(MONGO_URI)
    .then(_ => {
        app.listen(8080, () => {
            console.log(`App listing to port ${port}`);
        });
    })
    .catch(err => {
        console.log('err', err)
    })
