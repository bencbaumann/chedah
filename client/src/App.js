import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AccountDetail from "./pages/AccountDetail";
import Landing from "./pages/Landing";
import Testing from "./pages/Testing";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import Callback from './components/Callback';
import { requireAuth } from './utils/AuthService';
import history from './utils/history';
import GigDetail from "./pages/GigDetail";
import SignUp from "./pages/SignUp";



const App = () =>
  <Router history={history}>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/gig" component={GigDetail} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/testing" component={Testing} onEnter={requireAuth} />
        <Route exact path="/accounts/:id" component={AccountDetail} />
        <Route path="/callback" component={Callback} />
        {/* <Route component={NoMatch} /> */}
      </Switch>
    </div>
  </Router>;

export default App;
