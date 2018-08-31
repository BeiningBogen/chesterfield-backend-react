import React, { Component } from 'react';
import '../App.css';
import randomstring from 'randomstring'
import Auth from '../Service/Auth.js'


//const url = 'http://localhost:8063';
const url = 'https://chesterfield-cleanserver.herokuapp.com';
//const url2 = 'https://knowledgeify.appspot.com/api'

const auth = new Auth()

class App extends Component {

  constructor(){

    super();
    this.state = {
      subject: '',
      theme: '',
      question: {},
      currentQuestion: '',
      alternatives: [{alternativeId: 0, name: ''}],
      questions: [],
      uniqueThemes: [],
      uniqueSubjects: [],
      questionAlternatives: [],
      isUpdatable: false,
      migrate: [],
      migratedQuestions: []
    }

    

  }

  componentDidMount(){
    this.getSubjects();
  }

sendQuestion() {

    var id = randomstring.generate({length:24});

    fetch(url + '/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ questionId: id,
      name: this.state.question,
      subject: this.state.subject,
      theme: this.state.theme,
      alternatives: this.state.alternatives})
      }).then((message) => console.log(message.text()))
      .then(() =>{ this.setState({alternatives :[]})})
      .then(() =>{ 
        this.handleAddAlternative();
        this.setState({currentQuestion : ""}); 
        this.refs.question.value = "";
        id = randomstring.generate({length:24});
      })
      .catch(err => 
        console.log(err)
    )
  }

getQuesionsFrom(){

    /*fetch(url2, {
      mode: 'cors',  
    })
    .then((response) => response.json())
    .then((migrateable) => this.setState({migrate: migrateable}))
    .then(() => { this.migrate()})
    .catch((err) => console.log(err))

    

    fetch(url + '/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ questionId: randomstring.generate({length:24}),
      name: "Lol",
      subject: "Jakt",
      theme: "Kake",
      alternatives: this.state.alternatives})
      }).then((message) => console.log(message.text()))
      .then(() =>{ })
      .catch(err => 
        console.log(err)
      )*/

}

migrate(){

  this.state.migrate.map((question) => {
    
    var questionId = randomstring.generate({length:24});
    var questionText = question.questionText
    var alternatives = [{alternativeId: randomstring.generate({length:24}), name: question.correctAnswer},{alternativeId: randomstring.generate({length:24}), name: question.choiceOne},{alternativeId: randomstring.generate({length:24}), name: question.choiceTwo}]
    var theme = question.subTheme
    var subject = question.theme


    fetch(url + '/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ questionId: questionId,
      name: questionText,
      subject: subject,
      theme: theme,
      alternatives: alternatives})
      }).then((message) => console.log(message.text()))
      .catch(err => 
        console.log(err)
    ) 
  })


}


  getQuestions(theme){
    var thesubject = this.state.uniqueSubjects.find((subject) => {
      return subject.name === this.state.subject
    })

    var theTheme = this.state.uniqueThemes.find((theme) => {
      return theme.name === this.state.theme
    })

    fetch(url + '/questions/' + this.state.subject + '&' + theme)
    .then((response) => response.json())
    .then((questions) =>{ this.setState({ questions: questions.questions})})
    .catch((err) => console.log(err))
  }

  getThemes(thesubject){
    
    fetch(url + '/themes/' + thesubject)
    .then((response) => response.json())
    .then((theme) =>{ this.setState({ uniqueThemes: theme})})
    .catch((err) => console.log(err))
  }


  getSubjects(){

    fetch(url + '/subjects')
    .then((response) => response.json())
    .then((subjects) =>{ this.setState({ uniqueSubjects: subjects})})
    .catch((err) => console.log(err))

  }


  updateQuestion(question) {

    fetch(url + '/updateQuestion', {
      method: 'put',
      body: JSON.stringify({
        newQuestion: this.state.question,
        question: question,
        alternatives: this.state.alternatives 
      }),
      headers: {'Content-Type': 'application/json'}
    }).then((response) => response.text())
      .then((message) =>{ console.log(message)})
      .catch((err) => console.log(err))
  }

  handleAlternativeChange = (id) => (evt) => {
    
    const newAlternative = this.state.alternatives.map((alternative, sid) => {
      if (id !== sid) return alternative;
      const newId = randomstring.generate({length:24});
      return { ...alternative, alternativeId: newId, name: evt.target.value};
    });

    this.setState({ alternatives: newAlternative });
  }

  handleAddAlternative(){
    const id = randomstring.generate({length:24});
    this.setState({
      alternatives: this.state.alternatives.concat([{ alternativeId: id, name: '' }])
    });
  }


  handleSubject(){
   
      this.refs.subject.value = "";
      this.refs.theme.value = "";
    
  }

  handleTheme(currentSubject){

      this.getThemes(currentSubject)
      this.refs.theme.value = "";
  
  }

  handleQuestion(theme){

      this.getQuestions(theme)
      this.refs.question.value = "";
    
  }

  getAlternatives(currentq){

    if(currentq.length !== 0){
      
      var theQuestion = this.state.questions.find(question => question.name === currentq)
    
      if(theQuestion){
        this.setState({alternatives: theQuestion.alternatives});
        this.setState({currentQuestion: theQuestion});
        this.setState({isUpdatable: true})
      }

    }


  }

  logOut(){
    auth.logout();
  }

  deleteQuestion(question){

    fetch(url + '/delete', {
      method: 'delete',
      body: JSON.stringify({question: question}),
      headers: {'Content-Type': 'application/json'}
    }).then((response) => response.text())
      .then((message) =>{ console.log(message)})
      .then(() =>{ this.setState({alternatives :[]}) })
      .then(() =>{ 
        this.setState({currentQuestion : ""}); 
        this.refs.question.value = ""; 
        this.setState({isUpdatable: false});
        this.handleAddAlternative();
      })
      .catch((err) => console.log(err))
  }

  render() {
    const isUpdatable = this.state.isUpdatable;
    return (
      <div className="App">
        <div className="full-page">
            <h1 className="page-title">Chesterfield Admin</h1>

            <div className="name-form">
              <input autoComplete="off" ref="subject" className="name-form" list="subjects" id="subject-choice" name="subject" placeholder="Emne"
              onClick={() => {
      
              }}
              onChange={(event) => {

              const subject = event.target.value;
              this.setState({ subject: 
                  subject
                });
                
                if(subject.length === 0){
                  this.handleTheme(subject);

                }

              }}/>
              <datalist id="subjects">
                {this.state.uniqueSubjects.map((subject) =>(
                      <option key={subject._id}value={subject.name}></option>
                ))}
              </datalist>
            </div>

            <div className="name-form">
              <input autoComplete="off" ref="theme" className="name-form" list="themes" id="theme-choice" name="theme" placeholder="Tema" 
              onClick={() => {

                if(this.state.subject.length !== 0){
                  this.handleTheme(this.state.subject);
                }
              }} 
              onChange={(event) => {
              const theme = event.target.value;

              this.setState({ theme: 
                  theme
                });

                if(theme.length === 0){

                  this.handleQuestion(theme);

                };

            
               }}/>
              <datalist id="themes">
                {this.state.uniqueThemes.map((theme) =>(
                      <option  key={theme._id} value={theme.name}></option>
                ))}
              </datalist>
            </div>

            <div className="name-form">
              <input autoComplete="off" ref="question" className="name-form" list="questions" id="question-choice" name="question" placeholder="Spørsmål" 
              onClick={() => {

                if(this.state.theme.length !== 0){
                  this.handleQuestion(this.state.theme);
                }
      
              }} 
              onChange={(event) => {
              const question = event.target.value;

              if(question.length === 0){
                this.getAlternatives(question);
              }
              
              this.setState({ question: 
                question
              });
              
              }
                }/>
              <datalist id="questions">
              {this.state.questions.map((question) =>(
                      <option value={question.name}></option>
                ))}
              </datalist>
            </div>

            {this.state.alternatives.map((alternative, id) => 
              <div className="name-form" >
                <input onClick={() => {
                  if(this.state.question.length !== 0){
                     this.getAlternatives(this.state.question);
                  }}} 
                  className="name-form" type="text" placeholder="Alternativ" value={alternative.name} onChange={this.handleAlternativeChange(id)}/>
              </div>
            )}

             <div className="name-form">
                <button className="add-button" onClick={() => {
                  this.handleAddAlternative();
                  }}>Legg til alternativ</button>
              </div>

              {!isUpdatable ? (
                  <div className="name-form">
                    <button className="upload-button" onClick={() => {
                      this.sendQuestion()}}>Last opp
                    </button>
                </div>
              ) : (
                <div className="name-form">
                  <button className="upload-button" onClick={() => {
                    this.updateQuestion(this.state.currentQuestion)}}>Endre
                  </button>
                </div>
              )}
          

              <div className="name-form">
                <button className="delete-button" onClick={() => {
                  this.deleteQuestion(this.state.currentQuestion)}}>Slett</button>
              </div>

                <div className="name-form">
                <button className="delete-button" onClick={() => {
                  this.logOut()}}>Logg ut</button>
              </div>


            

             
          </div>
      </div>
    );
  }
}

export default App;
