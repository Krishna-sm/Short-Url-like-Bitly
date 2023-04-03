const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const connectDB = require('./config/db');
const port = process.env.PORT || 8000;
const app = express();
const urlModel = require('./models/url');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/url', require('./routes/url'));
app.get('/:id', async (req, res) => {
    const shortId = req.params.id;

    const entry = await urlModel.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: { timestamp: Date.now() }
        }
    })

    console.log(entry.redirectURL);
    res.redirect(entry?.redirectURL)
    // res.send(entry.redirectURL);
})
app.listen(port, () => {
    connectDB();
    console.log(`the app is connected with http://localhost:${port}`)
})