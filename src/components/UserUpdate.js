import React from 'react';
import { FormGroup, ControlLabel, FormControl, PageHeader, Button, Label } from 'react-bootstrap';
import Cookies from 'universal-cookie';

class UserUpdate extends React.Component {
  constructor( props ) {
    super( props );
    this.state = { email: '', success: false };
    this.updateUser = this.updateUser.bind( this );
    this.handleEmailChange = this.handleEmailChange.bind( this );
  }

  updateUser() {
    const cookies = new Cookies();
    let data = {
      user: {
        email: this.state.email
      }
    };

    fetch(
      'http://localhost:3000/users/update',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookies.get( 'token' )
        },
        body: JSON.stringify( data )
      }
    )
    .then( response => {
      return response.json()
    } )
    .then( json => {
      if ( json.user && json.user.id ) {
        this.setState( { success: true } );
      }
    } );
  }

  handleEmailChange( e ) {
    this.setState( { email: e.target.value } );
  }

  render() {
    let submit;

    if ( this.state.success ) {
      submit = <Label bsStyle="success">Success!</Label>
    }
    else {
      submit = <Button onClick={ this.updateUser }>Update</Button>;
    }

    return (
      <div>
        <PageHeader>
          Update User
        </PageHeader>
        <form>
          <FormGroup controlId="email">
            <ControlLabel>Email</ControlLabel>
            <FormControl
                type="text"
                value={ this.state.email }
                placeholder="Enter an email"
                onChange={ this.handleEmailChange }
              />
            </FormGroup>

          { submit }
        </form>
      </div>
    );
  }
}

export default UserUpdate;