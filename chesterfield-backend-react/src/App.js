import React, { Component } from 'react';
import './App.css';
import uuidv4 from 'uuid/v4';

const url = 'http://localhost:8060';

class App extends Component {


  constructor(){

    super();
    this.state = {
      theme: '',
      question: {questionText: ''},
      alternative1: [{alternativeText: '', isCorrect: ''}],
      alternative2: [{alternativeText: '', isCorrect: ''}],
      alternative3: [{alternativeText: '', isCorrect: ''}],
      alternative4: [{alternativeText: '', isCorrect: ''}],
      questions: [],
      uniqueThemes: [],
    }

  
  }

  componentDidMount(){
    this.getQuestions()
  }

  sendQuestion() {

    var id = uuidv4();

    fetch(url + '/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ questionId: id,
      name: this.state.question.questionText,
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
    this.setState({questions: questions}))
    .then(() =>{ this.setState({ uniqueThemes: [...(new Set(this.state.questions.map(({theme}) => theme)))] })})
    .catch((err) => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <div className="full-page">
            <h1 className="page-title">Chesterfield Admin</h1>
            <div className="name-form">
              <input className="name-form" list="themes" id="theme-choice" name="theme" placeholder="Emne" 
              onChange={(event) => {
              const theme = event.target.value;
                this.setState({ theme: 
                  theme
                })}}/>
              <datalist id="themes">
                {this.state.uniqueThemes.map((theme) =>(
                      <option value={theme}></option>
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

          </div>
      </div>
    );
  }
}

export default App;
