const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const app = express()

var port = process.env.port || 8060;

app.use(bodyParser.json());
app.use('/questions', cors());

const mongoUrl = 'mongodb://chesterfield:thebigpassword123@ds121182.mlab.com:21182/chesterfield'

var conn = mongoose.connection;             
 
conn.on('error', console.error.bind(console, 'connection error:'));  

mongoose.connect(mongoUrl, {useNewUrlParser: true});

var questionSchema = mongoose.Schema({questionId: String, name: String, theme: String, alternative1: String, alternative2: String, alternative3: String, alternative4: String});

var Question = mongoose.model('Question', questionSchema);


app.get('/questions', (req, res) => {

    Question.find({}, (err, questions) =>{
            res.json(questions);
        });
});

app.get('/questionstheme', (req, res) => {

    Question.find({theme: '#'}, (err, questions) =>{
            res.json(questions);
        });
});


app.put('/questions', (req, res) => {

    Question.findOne({questionId : '18a6bc81-9bc9-448a-b00d-e3caa2305c80'})
        .then(question => {
            question.name = 'halla'
            question.save((err, updated) => {
                if (err) return handleError(err);
                res.send(updated);
            });
    });
});
app.post('/questions', (req, res) => {

    var newQuestion = new Question({questionId: req.body.questionId, name: req.body.name, theme: req.body.theme, alternative1: req.body.alternative1, alternative2: req.body.alternative2, alternative3: req.body.alternative3, alternative4: req.body.alternative4});

    newQuestion.save(function (err) {
        if (err) return console.log(err);
        res.send("lol")
      });
});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log('Example app listening on port ' + port))