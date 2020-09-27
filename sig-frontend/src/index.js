import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/theme.scss";
import "assets/css/styles.css";

import AdminLayout from "layouts/Dashboard.jsx";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/playas" render={(props) => <AdminLayout {...props} />} />
      <Redirect to="/playas/inicio" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
