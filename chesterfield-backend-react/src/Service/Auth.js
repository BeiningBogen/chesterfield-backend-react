import auth0 from 'auth0-js';


export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'chesterfield.eu.auth0.com',
    clientID: '8edEJiiW1q9LuTFbJ-ZDmt09hdydUOHu',
    redirectUri: 'chesterfield-form.herokuapp.com/home',
    audience: 'https://chesterfield.eu.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }

  logout() {
    this.auth0.logout()
  }
}