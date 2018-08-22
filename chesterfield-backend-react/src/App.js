import React, { Component } from 'react';
import './App.css';
import uuidv4 from 'uuid/v4';
import randomstring from 'randomstring'
import MovieItem from '../src/movieItem';

const url = 'https://chesterfield-cleanserver.herokuapp.com';

class App extends Component {


  constructor(){

    super();
    this.state = {
      subject: '',
      theme: '',
      question: {questionText: ''},
      alternatives: [{alternativeId: 0, name: ''}],
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
      alternatives: this.state.alternatives})
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

  addAlternative(){
    
  }

  handleAlternativeChange = (id) => (evt) => {
    
    const newAlternative = this.state.alternatives.map((alternative, sid) => {
      if (id !== sid) return alternative;
      const newId = randomstring.generate()
      return { ...alternative, alternativeId: newId, name: evt.target.value};
    });

    this.setState({ alternatives: newAlternative });
  }

  handleAddAlternative(){
    const id = randomstring.generate()
    this.setState({
      alternatives: this.state.alternatives.concat([{ alternativeId: id, name: '' }])
    });
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
              <input placeholder="Spørsmål"className="name-form" type="text" 
              onChange={(event) => {
              const questionText = event.target.value;
                this.setState({ question: { 
                  ...this.state.question,
                  questionText: questionText
                  } 
                })
              }}/>
            </div>

            {this.state.alternatives.map((alternative, id) => 
              <div className="name-form">
                <input className="name-form" type="text" placeholder="Alternativ" value={alternative.name} onChange={this.handleAlternativeChange(id)}/>
              </div>
            )}

             <div className="name-form">
                <button className="add-button" onClick={() => {
                  this.handleAddAlternative()}}>Legg til alternativ</button>
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
