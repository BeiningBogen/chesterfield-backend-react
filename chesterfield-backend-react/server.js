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
app.use('/questionstheme', cors());
app.use('/subjects', cors());
app.use('/questionsMany', cors());



const mongoUrl = 'mongodb://chesterfield:thebigpassword123@ds121182.mlab.com:21182/chesterfield'

var conn = mongoose.connection;             
 
conn.on('error', console.error.bind(console, 'connection error:'));  

mongoose.connect(mongoUrl, {useNewUrlParser: true});

var subjectSchema = mongoose.Schema({_id: mongoose.Schema.Types.ObjectId , name: String, themes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Theme'}]});

var Subject = mongoose.model('Subject', subjectSchema); 

var themeSchema = mongoose.Schema({_id: mongoose.Schema.Types.ObjectId, name: String, subject: {type: mongoose.Schema.Types.ObjectId, ref: 'Subject'}, questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}]});

var Theme = mongoose.model('Theme', themeSchema);

var questionSchema = mongoose.Schema({questionId: String, name: String, alternative1: String, alternative2: String, alternative3: String, alternative4: String, theme: {type: mongoose.Schema.Types.ObjectId, ref: 'Theme'}, subject: {type: mongoose.Schema.Types.ObjectId, ref: 'Subject'}});

var Question = mongoose.model('Question', questionSchema);

app.post('/questionsMany', (req, res) => {

    var newSubject = new Subject({_id: new mongoose.Types.ObjectId(), name: req.body.subject});

    var newTheme = new Theme({_id: new mongoose.Types.ObjectId(), name: req.body.theme, subject: newSubject._id})

    var newQuestion = new Question({questionId: req.body.questionId, name: req.body.name, theme: newTheme._id, alternative1: req.body.alternative1, alternative2: req.body.alternative2, alternative3: req.body.alternative3, alternative4: req.body.alternative4, subject: newSubject._id});

    Subject.countDocuments({name: newSubject.name}, function (err, count){ 

        if(count === 0){

            console.log("Emne Finnes ikke")
            
            newSubject.themes.push(newTheme);

            newSubject.save(function (err) {

                if (err) return console.log(err);
                newTheme.questions.push(newQuestion);
                newTheme.save(function (err) {
                    if (err) return console.log(err);
                        newQuestion.save(function (err) {
                            if (err) return console.log(err); 
            
                        });
                });
                
            });
            
          

        }else{
            Theme.countDocuments({name: newTheme.name}, function (err, count){
                 
                if(count === 0){

                    Subject.findOne({name: newSubject.name}, (err, subject) => {
                        console.log("Emne finnes - ikke tema")

                        subject.themes.push(newTheme)
                        subject.save(function (err) {

                            if (err) return console.log(err);

                            newQuestion.subject = subject._id
                            newTheme.subject = subject._id

                            newTheme.questions.push(newQuestion);
                            newTheme.save(function (err) {
                                if (err) return console.log(err);
                                    newQuestion.save(function (err) {
                                        if (err) return console.log(err); 
                        
                                    });
                            });
                        });
    
                    });

                }else{
                    Theme.findOne({name: newTheme.name}, (err, theme) => {

                        Question.countDocuments({name: newQuestion.name}, function (err, questionCount){
                                    
                            if(questionCount === 0){

                                console.log("Spørsmål finnes ikke")

                                newQuestion.subject = theme.subject
                                newQuestion.theme = theme._id

                                theme.questions.push(newQuestion)
                                
                                theme.save(function (err) {
                                    if (err) return console.log(err);

                                    newQuestion.save(function (err) {
                                        if (err) return console.log(err);
                                    });
                                });

                            }else{
                                console.log("Spørsmål finnes")
                            }
                        });
                        
                    });
                }
            });
        }
    });
   
});

app.get('/questions', (req, res) => {

    Theme.find({name: newTheme.name})
        .populate({
            path: 'subject',
            match: {name: {$gte: newSubject.name}},
            select: 'name -_id'
        }).exec(function (err, json) {
            if (err) console.log(err);
            console.log(json);
        }); 
});



app.get('/subjects', (req, res) => {

    Subject.find({}, (err, subjects) => {
        res.json(subjects);
    });
});

app.get('/questions/:subject&:theme', (req, res) => {

    const subject = req.params.subject
    const theme = req.params.theme

    var json = {
        name: "",
        id: 0,
        themes: {
            name: "",
            id: 321,
            questions: []
        }
    }

    Subject.find({name: subject}, (err, subjectIn) => {

        json.name = subjectIn.name

        Theme.find({subjectId: subjectIn.subjectId}, (err, theme) => {
            console.log(theme)
            Question.find({themeId : theme.themeId}, (err, questions) =>{

                console.log(theme)
                var thing = {
                    name: subjectIn.name,
                    id: subjectIn.subjectId,
                    themes: {
                        name: theme.name,
                        id: 321,
                        questions: questions
                    }
                }
                    res.json(json);
                });
        });

    });
});

app.get('/questionstheme/:subject', (req, res) => {
    const subject = req.params.subject
    console.log(subject)
    if(subject.length == 0){
        Theme.find({}, (err, theme) => {
            res.json(theme);
        });
    }else{
        Theme.find({subjectId : subject.subjectId}, (err, theme) =>{
            res.json(theme);
        });
    }
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

    var newQuestion = new Question({questionId: req.body.questionId, name: req.body.name, themeId: req.body.themeId, alternative1: req.body.alternative1, alternative2: req.body.alternative2, alternative3: req.body.alternative3, alternative4: req.body.alternative4});

    var newTheme = new Theme({name: req.body.theme, themeId: req.body.themeId, subjectId: req.body.subjectId})

    var newSubject = new Subject({name: req.body.subject, subjectId: req.body.subjectId});

    Subject.find({name : newSubject.name}, (err, subject) =>{
        if(subject.length == 0){

            newSubject.save(function (err) {
                if (err) return console.log(err);
            }); 
        }
    });

    Question.find({name : newQuestion.name}, (err, question) =>{
        if(question.length == 0){

            newQuestion.save(function (err) {
                if (err) return console.log(err);
            }); 
        }
    });

    Theme.find({name : newTheme.name}, (err, theme) =>{
        if(theme.length == 0){

            newTheme.save(function (err) {
                if (err) return console.log(err);
            }); 
        }
    });

    
});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log('Example app listening on port ' + port))