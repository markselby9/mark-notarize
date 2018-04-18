import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Home from "./components/Home";
import NewNotarize from "./components/NewNotarize";

const routeConfig = [
  {
    path: '/',
    component: App,
    indexRoute: { component: Home },
    childRoutes: [
      { path: 'new', component: NewNotarize },
    ]
  }
]

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
