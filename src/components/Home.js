import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Label, PageHeader } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from "react-router-dom";
import Cookies from 'universal-cookie';

class Home extends React.Component {
  constructor( props ) {
    super( props );
    this.state = { email: '', password: '', success: false };
    this.login = this.login.bind( this );
    this.handleEmailChange = this.handleEmailChange.bind( this );
    this.handlePasswordChange = this.handlePasswordChange.bind( this );
  }

  login( user ) {
    const cookies = new Cookies();
    let data = {
      user: {
        email: this.state.email,
        password: this.state.password
      }
    };

    fetch(
      'http://localhost:3000/users/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( data.user )
      }
    )
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

  handleEmailChange( e ) {
    this.setState( { email: e.target.value } );
  }

  handlePasswordChange( e ) {
    this.setState( { password: e.target.value } );
  }

  render() {
    const cookies = new Cookies();
    let token = cookies.get( 'token' );
    let rendered;


    if ( token ) {
      rendered = (
        <div>
          <PageHeader>
            Welcome to the Workit App!
          </PageHeader>
          <Link to="/workouts">See your workouts</Link>
        </div>
      );
    }
    else {
      let submit;

      if ( this.state.success ) {
        submit = <Label bsStyle="success">Success!</Label>
      }
      else {
        submit = <Button onClick={ this.login }>Login</Button>;
      }

      rendered = (
        <div>
          <PageHeader>
            Login
            <Link to="/register">
              <Button bsStyle="primary" className="right-button">
                Register
              </Button>
            </Link>
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
      )
    }

    return rendered;
  }
}

export default Home;