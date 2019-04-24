import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Parcel from './pages/Parcel';
import Manifest from './pages/Manifest';
import Receive from './pages/Receive';
import Claim from './pages/Claim';
import History from './pages/History';
import Login from './pages/Login';
import NotFound from './pages/404';

import PrivateRoute from './components/hoc/PrivateRoute';
import User from './services/User';

import './App.css';


class App extends Component {
  _isMounted = false;

  constructor(props){
    super(props);
    this.state = {
      error: ''
    }
  }

  componentDidMount = () => {
    this._isMounted = true;

    const token = localStorage.getItem('token');
    User.validateToken(token)
      .then(res => {
        if(this._isMounted){
          const auth = res.data.success;
          
          if(!auth){
            localStorage.clear();
          }
        }
      })
  }


  componentWillMount = () => {
    this._isMounted = false;
  }
  

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/login' component={() => <Login/>}/>
          <PrivateRoute exact path='/' component={Dashboard}/>
          <PrivateRoute path='/parcel' component={Parcel}/>
          <PrivateRoute path='/manifest' component={Manifest}/>
          <PrivateRoute path='/receive' component={Receive}/>
          <PrivateRoute path='/claim' component={Claim}/>
          <PrivateRoute path='/history' component={History}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default App;
