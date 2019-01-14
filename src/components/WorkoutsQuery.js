import React from 'react';
import { Button, PageHeader } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from "react-router-dom";
import WorkoutsIndex from './WorkoutsIndex';
import Cookies from 'universal-cookie';

class WorkoutsQuery extends React.Component {
  constructor( props ) {
    super( props );
    this.state = { workouts: null };
  }

  componentDidMount() {
    const cookies = new Cookies();

    fetch(
      'http://localhost:3000/workouts',
      {
        method: 'GET',
        headers: {
          'Authorization': cookies.get( 'token' )
        }
      }
    )
    .then( response => {
      return response.json()
    } )
    .then( json => {
      if ( !json.errors ) {
        this.setState( { workouts: json } );
      }
      else {
        this.setState( { workouts: [] } );
      }
    } );
  }

  render() {
    let rendered = [
      <PageHeader>
        Workouts
        <Link to="/workouts/create">
          <Button bsStyle="primary" className="right-button">
            Create Workout
          </Button>
        </Link>
      </PageHeader>
    ];

    if ( this.state.workouts ) {
      rendered.push( <WorkoutsIndex workouts={ this.state.workouts }></WorkoutsIndex> );
    }
    else {
      rendered.push( <span>Loading workouts...</span> );
    }

    return rendered;
  }
}

export default WorkoutsQuery;