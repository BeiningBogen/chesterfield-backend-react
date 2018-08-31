import React, { Component } from 'react';
import Auth from '../Service/Auth.js'

const auth = new Auth();

class Login extends Component {

constructor(){
    super();
    auth.login();
}

render() {
    return (
        <div>Laster......</div>
    );

}
}

export default Login;
