import React from 'react';
import Cookies from 'universal-cookie';
import { FormGroup, ControlLabel, FormControl, Button, Label, PageHeader } from 'react-bootstrap';

class Register extends React.Component {
  constructor( props ) {
    super( props );
    this.state = { email: '', password: '', success: false };
    this.createUser = this.createUser.bind( this );
    this.login = this.login.bind( this );
    this.handleEmailChange = this.handleEmailChange.bind( this );
    this.handlePasswordChange = this.handlePasswordChange.bind( this );
  }

  createUser() {
    const cookies = new Cookies();
    let data = {
      user: {
        email: this.state.email,
        password: this.state.password
      }
    };

    fetch(
      'http://localhost:3000/users',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( data )
      }
    )
    .then( response => {
      return this.login( data.user );
    } )
    .then( response => {
      return response.json()
    } )
    .then( json => {
      if ( json.token ) {
        cookies.set( 'token', json.token, { path: '/' } );
        this.setState( { success: true } );
      }
    } );
  }

  login( user ) {
    return fetch(
      'http://localhost:3000/users/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( user )
      }
    );
  }

  handleEmailChange( e ) {
    this.setState( { email: e.target.value } );
  }

  handlePasswordChange( e ) {
    this.setState( { password: e.target.value } );
  }

  render() {
    let submit;

    if ( this.state.success ) {
      submit = <Label bsStyle="success">Success!</Label>
    }
    else {
      submit = <Button onClick={ this.createUser }>Create</Button>;
    }

    return (
      <div>
        <PageHeader>
          Register
        </PageHeader>
        <form>
          <FormGroup controlId="email">
            <ControlLabel>Name</ControlLabel>
            <FormControl
                type="text"
                value={ this.state.email }
                placeholder="Enter an email"
                onChange={ this.handleEmailChange }
              />
            </FormGroup>
            <FormGroup controlId="password">
            <ControlLabel>Name</ControlLabel>
            <FormControl
                type="password"
                value={ this.state.password }
                placeholder="Enter a password"
                onChange={ this.handlePasswordChange }
              />
            </FormGroup>
          { submit }
        </form>
      </div>
    );
  }
}

export default Register;