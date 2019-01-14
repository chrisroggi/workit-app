import React from 'react';
import { FormGroup, ControlLabel, FormControl, PageHeader, Button, Label } from 'react-bootstrap';
import Cookies from 'universal-cookie';

class WorkoutCreate extends React.Component {
  constructor( props ) {
    super( props );
    this.state = { name: '', exercises: [], exerciseIds: [], success: false };
    this.createWorkout = this.createWorkout.bind( this );
    this.handleNameChange = this.handleNameChange.bind( this );
    this.handleExerciseChange = this.handleExerciseChange.bind( this );
  }

  componentDidMount() {
    const cookies = new Cookies();

    fetch(
      'http://localhost:3000/exercises',
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
        this.setState( { exercises: json } );
      }
      else {
        this.setState( { exercises: [] } );
      }
    } );
  }

  createWorkout() {
    const cookies = new Cookies();
    let data = {
      workout: {
        name: this.state.name,
        exercise_ids: this.state.exerciseIds
      }
    };

    fetch(
      'http://localhost:3000/workouts',
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
      if ( json.workout && json.workout.id ) {
        this.setState( { success: true } );
      }
    } );
  }

  handleNameChange( e ) {
    this.setState( { name: e.target.value } );
  }

  handleExerciseChange( e ) {
    var options = e.target.options;
    var values = [];

    for ( let i = 0; i < options.length; i++ ) {
      if ( options[ i ].selected ) {
        values.push( parseInt( options[ i ].value ) );
      }
    }

    this.state.exerciseIds = values;
  }

  render() {
    let self = this;
    let submit;

    let exercises = this.state.exercises.map(
      exercise => {
        return (
          <option key={ exercise.id } value={ exercise.id }>
            { exercise.name }
          </option>
        );
      }
    );

    if ( this.state.success ) {
      submit = <Label bsStyle="success">Success!</Label>
    }
    else {
      submit = <Button onClick={ this.createWorkout }>Create</Button>;
    }

    let rendered = [
      <PageHeader>
        Create Workout
      </PageHeader>
    ];

    if ( this.state.exercises ) {
      rendered.push(
        <form>
          <FormGroup controlId="name">
            <ControlLabel>Name</ControlLabel>
            <FormControl
                type="text"
                value={ this.state.name }
                placeholder="Enter a name"
                onChange={ this.handleNameChange }
              />
            </FormGroup>
            <FormGroup controlId="exercises">
              <ControlLabel>Exercises</ControlLabel>
              <FormControl
                componentClass="select"
                multiple
                onChange={ self.handleExerciseChange }
              >
                { exercises }
              </FormControl>
            </FormGroup>

          { submit }
        </form>
      );
    }

    return rendered;
  }
}

export default WorkoutCreate;