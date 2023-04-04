const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const connectDB = require('./config/db');
const port = process.env.PORT || 8000;
const path = require('path');
const app = express();
const urlModel = require('./models/url');
const staticRouter = require('./routes/staticRouter');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'));

app.use('/',staticRouter);
app.use('/url', require('./routes/url'));

app.get("/test",async(req,res)=>{
    app.use('/url', require('./routes/url'));
    const allUrls = await urlModel.find({});
    return res.send(`
            <html>
                <head>
                </head>
                <body>
                <ol>
                    ${

                                allUrls.map((item)=>{
                                    return `<li>${item.redirectURL}</li>`
                                })

                    }
                </ol>

                </body>

            </html>
    
    
    `)
   
})

app.get('/server/:id', async (req, res) => {
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