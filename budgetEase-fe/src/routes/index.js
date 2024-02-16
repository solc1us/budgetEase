import React, { useEffect, useState } from "react";
import {Route, Switch} from "react-router-dom";
import asyncComponent from "util/asyncComponent";

const App = ({  match}) => {
  const [loading, setLoading] = useState(true);
  const storedUserData = JSON.parse(localStorage.getItem("user_credent"));

  // Ambil data pengguna dari localStorage saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchData = () => {
      setLoading(false);
    };

    fetchData();
  }, []); 

  console.log(storedUserData, "ini dari index di route utama storedUserData")

  return (

    <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}create`} component={asyncComponent(() => import('./CreatePage'))}/>
      <Route path={`${match.url}sample`} component={asyncComponent(() => import('./SamplePage'))}/>
      <Route path={`${match.url}test`} component={asyncComponent(() => import('./TestPage'))}/>
    </Switch>
  </div>
  )
};

export default App;
