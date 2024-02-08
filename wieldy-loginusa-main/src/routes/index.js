import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({  match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}create`} component={asyncComponent(() => import('./CreatePage'))}/>
      <Route path={`${match.url}sample`} component={asyncComponent(() => import('./SamplePage'))}/>
      <Route path={`${match.url}test`} component={asyncComponent(() => import('./TestPage'))}/>
    </Switch>
  </div>
);

export default App;
