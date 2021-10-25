const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
var url = "mongodb+srv://CHUDY:123@cluster0.sc9s3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const app = express()
let db;
let quotesCollection;

MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        db = client.db('Cluster0')
        quotesCollection = db.collection('ZADANIE')
    })
    .catch(console.error)

app.set('view engine' , 'ejs')

app.get('/', (req, res) => {
    db.collection('ZADANIE').find().toArray()
        .then(results => {
            res.render('index.ejs', { ZADANIE: results})
        })
        .catch(error => console.error(error))
});

app.use(bodyParser.urlencoded({extended: true}))

    app.post('/ZADANIE', (req, res) => {
        quotesCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/')
                console.log(result)
            })
            .catch(error => console.error(error))

});
app.listen(3000, function () {
                console.log('listening on 3000')
            });
