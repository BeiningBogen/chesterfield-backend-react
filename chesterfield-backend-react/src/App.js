import React, { Component } from 'react';
import './App.css';
import uuidv4 from 'uuid/v4';
import MovieItem from '../src/movieItem';

const url = 'http://localhost:8060';

class App extends Component {


  constructor(){

    super();
    this.state = {
      subject: '',
      theme: '',
      question: {questionText: ''},
      alternative1: [{alternativeText: '', isCorrect: ''}],
      alternative2: [{alternativeText: '', isCorrect: ''}],
      alternative3: [{alternativeText: '', isCorrect: ''}],
      alternative4: [{alternativeText: '', isCorrect: ''}],
      questions: [],
      uniqueThemes: [],
      uniqueSubjects: [],
    }

  
  }

  componentDidMount(){
    this.getQuestions();
    this.getSubjects();
  }

  sendQuestion() {

    var id = uuidv4();
    var tid = uuidv4();
    var sid = uuidv4();

    fetch(url + '/questionsMany', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ questionId: id,
      name: this.state.question.questionText,
      subject: this.state.subject,
      theme: this.state.theme,
      alternative1: this.state.alternative1.alternativeText,
      alternative2: this.state.alternative2.alternativeText,
      alternative3: this.state.alternative3.alternativeText,
      alternative4: this.state.alternative4.alternativeText})
      }).then((message) => console.log(message.text()))
      .catch(err => 
        console.log(err)
    )
  }

  getQuestions(){

    fetch(url + '/questions')
    .then((response) => response.json())
    .then((questions) => 
    this.setState({questions: questions.themes.questions}))
    .catch((err) => console.log(err))
  }

  getThemes(){

    var thesubject = this.state.uniqueSubjects.find((subject) => {
      return subject.name === this.state.subject
    })

    fetch(url + '/questionstheme/' + thesubject)
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

  updateQuestion() {
    
  }

  handleSubject(){
    this.getThemes();
    this.refs.subject.value = "";
    this.refs.theme.value = "";
  }

  handleTheme(){
    this.getThemes();
    this.refs.theme.value = "";
  }

  render() {
    return (
      <div className="App">
        <div className="full-page">
            <h1 className="page-title">Chesterfield Admin</h1>

            <div className="name-form">
              <input ref="subject" className="name-form" list="subjects" id="subject-choice" name="subject" placeholder="Emne"
              onClick={() => {
                
                //this.handleSubject();
              }}
              onChange={(event) => {
              const subject = event.target.value;
                this.setState({ subject: 
                  subject
                });
              }}/>
              <datalist id="subjects">
                {this.state.uniqueSubjects.map((subject) =>(
                      <option value={subject.name}></option>
                ))}
              </datalist>
            </div>

            <div className="name-form">
              <input ref="theme" className="name-form" list="themes" id="theme-choice" name="theme" placeholder="Tema" 
              onClick={() => {
                this.setState({theme: ""});
                this.handleTheme();
              }} 
              onChange={(event) => {
              const theme = event.target.value;
                this.setState({ theme: 
                  theme
                })}}/>
              <datalist id="themes">
                {this.state.uniqueThemes.map((theme) =>(
                      <option value={theme.name}></option>
                ))}
              </datalist>
            </div>

            <div className="name-form">
              <input className="name-form" type="text" 
              onChange={(event) => {
              const questionText = event.target.value;
                this.setState({ question: { 
                  ...this.state.question,
                  questionText: questionText
                  } 
                })
              }}/>
            </div>

            <div className="name-form">
              <input className="name-form" type="text"
              onChange={(event) => {
              const alt1 = event.target.value;
              this.setState({ alternative1:{ 
                ...this.state.question,
                alternativeText: alt1,
                isCorrect: true
                } 
              }) 
              }}/>
            </div>

            <div className="name-form">
              <input className="name-form" type="text"
              onChange={(event) => {
              const alt2 = event.target.value;
              this.setState({ alternative2:{ 
                ...this.state.question,
                alternativeText: alt2,
                isCorrect: false
                } 
              }) 
              }}/>
            </div>

            <div className="name-form">
              <input className="name-form" type="text"
              onChange={(event) => {
              const alt3 = event.target.value;
              this.setState({ alternative3:{ 
                ...this.state.question,
                alternativeText: alt3,
                isCorrect: false
                } 
              }) 
              }}/>
            </div>

            <div className="name-form">
              <input className="name-form" type="text"
              onChange={(event) => {
              const alt4 = event.target.value;
              this.setState({ alternative4:{ 
                ...this.state.question,
                alternativeText: alt4,
                isCorrect: false
                } 
              }) 
              }}/>
            </div>

            <div className="name-form">
              <button className="upload-button" onClick={() => {
                this.sendQuestion()}}>Last opp</button>
            </div>

            <ul className="name-form">
                {this.
                state.
                questions.
                map((question) => 
                    <li className="name-form" key={question.questionId}>
                    <div className="name-form">
                    <div className="name-form">
                      <input className="name-form" type="text" 
                      value={question.name}
                      onChange={this.updateQuestion}
                      />
                  </div>
                  <div className="name-form">
                      <input className="name-form" type="text" value={question.alternative1}/>
                  </div>
                  <div className="name-form">
                      <input className="name-form"  type="text" value={question.alternative2}/>
                  </div>
                  <div className="name-form">
                      <input className="name-form" type="text" value={question.alternative3}/>
                  </div>
                  <div className="name-form">
                      <input className="name-form" type="text" value={question.alternative4}/>
                  </div>
              </div>
                    </li>)}
            </ul>

             
          </div>
      </div>
    );
  }
}

export default App;
