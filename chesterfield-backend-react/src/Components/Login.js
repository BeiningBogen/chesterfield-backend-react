import React, { Component } from 'react';
import Auth from '../Service/Auth.js'


class Login extends Component {

constructor(){
    super();
    const auth = new Auth();
    auth.login();
}


}

export default Login;
