import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// local imports
import Home from './components/general/Home';
import RegisterClient from './components/client/RegisterClient';
import Login from './components/general/Login';

import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';


function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />

      <UnPrivateRoute path="/client/register" component={RegisterClient} />
      <UnPrivateRoute path="/user/login" component={Login} />

    </Router>
  );
}

export default App;


{/* <Router>
      <Navbar />
      <Route exact path="/" component={Home} />

      <UnPrivateRoute path="/login" component={Login} />
      <UnPrivateRoute path="/register" component={Register} />
      
      <PrivateRoute path="/todos" roles={["user", "admin"]} component={Todos} />
      <PrivateRoute path="/admin" roles={["admin"]} component={Admin} />
</Router> */}