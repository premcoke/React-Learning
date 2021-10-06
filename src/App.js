import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import SignInPage from './components/SignInPage';
import './App.css';

const LaunchPage = () => {
  return (
    <>
      <div className="login-route background">
        <Link to="/login" className="btn rounded btn-primary">Login/SignUp</Link>
      </div>
    </>
  )
};

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={LaunchPage} exact></Route>
      <Route path="/login" component={SignInPage}></Route>
    </BrowserRouter>
  )
};

export default App;