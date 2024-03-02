import React from "react";
import {Route, Switch} from "react-router-dom";
import asyncComponent from "util/asyncComponent";

const App = ({  match}) => {

  return (
    <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}dashboard`} component={asyncComponent(() => import('./DashboardPage'))}/>
      <Route path={`${match.url}cashflow`} component={asyncComponent(() => import('./CashflowPage'))}/>
      <Route path={`${match.url}cashflow-newcashflow`} component={asyncComponent(() => import('./CashflowPage/FormInputCashflowPage'))}/>
      <Route path={`${match.url}cashflow-newkategori`} component={asyncComponent(() => import('./CashflowPage/NewKategoriPage'))}/>
      <Route path={`${match.url}cashflow-edit/:id`} component={asyncComponent(() => import('./CashflowPage/CashflowEditPage'))}/>
      <Route path={`${match.url}report`} component={asyncComponent(() => import('./ReportPage'))}/>
      <Route path={`${match.url}todolist`} component={asyncComponent(() => import('./ToDoListPage'))}/>
      <Route path={`${match.url}todolist-newtodolist`} component={asyncComponent(() => import('./ToDoListPage/FormInputToDoPage'))}/>
      <Route path={`${match.url}todolist-edit/:id`} component={asyncComponent(() => import('./ToDoListPage/ToDoListEditPage'))}/>
      <Route path={`${match.url}investment`} component={asyncComponent(() => import('./InvestmentPage'))}/>
    </Switch>
  </div>
  )
};

export default App;
