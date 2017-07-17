import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom'
import * as urls from './constants/urls'
import Show from './components/show'
import Add from './components/add'
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Show} />
      <Route exact path={urls.HOME} component={App} />
      <Route path={urls.SHOW} component={Show} />
      <Route path={urls.ADD} component={Add} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
)
