import React from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import MainLayout from './components/layout/layout'
import auth from './services/auth';
import LoginLanding from './components/user/login/login-landing';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={LoginLanding}></Route>
      <Route path="/app"
        render={props => {
          if (auth.isAutenticated()) {
            return <MainLayout {...props} />
          } else {
            return (
              <Redirect to={{
                pathname: "/"
              }} />
            )
          }
        }
        }
      ></Route>
    </BrowserRouter>
  );
}

export default App;
