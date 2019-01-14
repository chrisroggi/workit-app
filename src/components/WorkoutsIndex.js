import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

function WorkoutsIndex( props ) {
  let workouts = props.workouts.map(
    workout => {
      let exercises = workout.exercises.map(
        exercise => {
          return (
            <ListGroupItem key={ exercise.id }>
              { exercise.name }
            </ListGroupItem>
          )
        }
      );

      return (
        <ListGroupItem key={ workout.workout.id }>
          <h4>{ workout.workout.name }</h4>
          <ListGroup>
            { exercises }
          </ListGroup>
        </ListGroupItem>
      );
    }
  );

  return (
    <ListGroup>
      { workouts }
    </ListGroup>
  );
}

export default WorkoutsIndex;