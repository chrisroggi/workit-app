import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import Home from './Home';
import WorkoutsQuery from './WorkoutsQuery';
import WorkoutCreate from './WorkoutCreate';
import Register from './Register';
import UserUpdate from './UserUpdate';
import '../App.css';

class App extends Component {
  constructor( props ) {
    super( props );
    this.logout = this.logout.bind( this );
  }

  logout() {
    const cookies = new Cookies();
    cookies.remove( 'token' );
  }

  render() {
    return (
      <Router>
        <div className="wrapper">
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Workit App</Link>
              </Navbar.Brand>
            </Navbar.Header>
            <ul className="nav navbar-nav">
              <li>
                <Link to="/workouts">Workouts</Link>
              </li>
            </ul>
            <ul className="nav navbar-nav meta">
            <li>
                <Link to="/user">Update User</Link>
              </li>
              <li>
                <Link onClick={ this.logout } to="/">Log Out</Link>
              </li>
            </ul>
          </Navbar>

          <Route exact path="/" component={ Home } />
          <Route exact path="/user" component={ UserUpdate } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/workouts" component={ WorkoutsQuery } />
          <Route path="/workouts/create" component={ WorkoutCreate } />
        </div>
      </Router>
    );
  }
}

export default App;
