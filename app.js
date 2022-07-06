const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/testdatabase'


const app = express()

mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection

con.on('open', () => {
    console.log('Database Connected..')
})

app.use(express.json())

//add new user

app.post('/addUser', (req, res) => {
    var userObj = {
        "_id": new mongoose.Types.ObjectId(),
        "name": req.body.name
    }
    var newUser = new User(userObj);
    newUser.save((err, user) => {
        if (err) {
            res.status(400).send("There is error while addding new user");
        } else {
            res.status(200).json(user);
        }
    })
})




//new docs add

app.post('/addDoc', (req, res) => {
    var docObj = {
        "_id": new mongoose.Types.ObjectId(),
        "title": req.body.title,
        "description": req.body.description,
        "user": req.body.user

    }
    var newDoc = new Doc(docObj);
    newDoc.save((err, doc) => {
        if (err) {
            res.status(400).send("There is error while addding new user");
        } else {
            res.status(200).json(doc);
        }
    })
})

//get all documents information
app.get('/docs', (req, res) => {
    Doc.find({}).populate("user").exec((err, docs) => {
        if (err) {
            res.status(400).send("There is error while addding new user");
        } else {
            res.status(200).json(docs);
        }
    })
})

//update a doc record

app.put('/docs/:id', (req, res) => {
    var docObj = {
        "title": req.body.title,
        "description": req.body.description,


    }
    Doc.findByIdAndUpdate(req.params.id, docObj, { new: true }).exec((err, docs) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).json(docs);
        }
    })
})

//delete a record
app.delete('/docs/:id', (req, res) => {
    var docObj = {
        "title": req.body.title,
        "description": req.body.description,


    }
    Doc.findByIdAndDelete(req.params.id).exec((err, doc) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).json(doc);
        }
    })
})




app.listen(3000, () => {
    console.log('Server Connected...')
})



var Doc = require('./models/Docs.models');
var User = require('./models/user.models');

