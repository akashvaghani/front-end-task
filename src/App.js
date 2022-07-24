import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Login from './pages/auth/Login'
import Home from './pages/Home'
import About from './pages/About'
import HeadAndTail from './pages/HeadAndTail'
import Signup from './pages/auth/Signup'

function PrivateRoute({ component: Component, ...rest }) {
  const isLoggedIn = localStorage.getItem("auth_token")
  return (
    <Route {...rest} render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
}

function App(props) {
  return (
     <Router>
      <div>
        <Switch>
          <Route exact path="/"><Redirect to="/login" /></Route>
          <Route path="/login" render={props => (<Login {...props} />)} />
          <Route path="/sign-up" render={props => (<Signup {...props} />)} />
          {/*<Route path="/" render={props => (<Products {...props} />)} />*/}
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/about" component={About} />
          <PrivateRoute exact path="/head-tail" component={HeadAndTail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
