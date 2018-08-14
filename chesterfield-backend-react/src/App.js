import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {


  constructor(){

  super();
  this.state = {
    theme: '',
    question: {questionText: ''},
    alternatives1: [{alternativeText: '', isCorrect: ''}],
    alternatives2: [{alternativeText: '', isCorrect: ''}],
    alternatives3: [{alternativeText: '', isCorrect: ''}],
    alternatives4: [{alternativeText: '', isCorrect: ''}],
    theme: ''

  }

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
                  <option value="#"></option>
              </datalist>
            </div>

            <div class="name-form">
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

            <div class="name-form">
              <input className="name-form" type="text"
              onChange={(event) => {
              const alt1 = event.target.value;
              this.setState({ alternatives1:{ 
                ...this.state.question,
                alternativeText: alt1,
                isCorrect: true
                } 
              }) 
              }}/>
            </div>

            <div class="name-form">
              <input className="name-form" type="text"
              onChange={(event) => {
              const alt2 = event.target.value;
              this.setState({ alternatives2:{ 
                ...this.state.question,
                alternativeText: alt2,
                isCorrect: false
                } 
              }) 
              }}/>
            </div>

            <div class="name-form">
              <input className="name-form" type="text"
              onChange={(event) => {
              const alt3 = event.target.value;
              this.setState({ alternatives3:{ 
                ...this.state.question,
                alternativeText: alt3,
                isCorrect: false
                } 
              }) 
              }}/>
            </div>

            <div class="name-form">
              <input className="name-form" type="text"
              onChange={(event) => {
              const alt4 = event.target.value;
              this.setState({ alternatives4:{ 
                ...this.state.question,
                alternativeText: alt4,
                isCorrect: false
                } 
              }) 
              }}/>
            </div>



            <div class="name-form">
              <button className="upload-button">Last opp</button>
            </div>

          </div>
      </div>
    );
  }
}

export default App;
