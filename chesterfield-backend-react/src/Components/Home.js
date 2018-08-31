import React, { Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './Login'
import App from './App';

class Home extends Component {
  
  render() {
    return (
        <Router>
          <div>
            <Route exact path="/" component={Login}/>
            <Route path="/Home" component={App}/>
          </div>
        </Router>
      
    );
  }
}

export default Home;
