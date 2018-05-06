import React, { Component } from 'react'

import NewNotarize from './components/NewDocument';
import CheckNotarize from './components/CheckDocument';
import Navigation from './components/Navigation';
import Home from './components/Home';
import { getWeb3Instance } from './api/blockchainService';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.scss'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: 0,
      web3: null,
      notarizeFactoryInstance: null,
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    getWeb3Instance(results => {
      this.setState({
        web3: results.web3
      });
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">

          <Navigation/>
          <hr/>

          <div className="app-body">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/create" component={NewNotarize}/>
              <Route exact path="/query" component={CheckNotarize}/>
              <Route path="/query/:address" component={CheckNotarize}/>
            </Switch>
          </div>

          <footer className="footer app-footer">
            <div className="container">
              <div className="content has-text-centered">
                <p>
                  Version: v0.1.1-alpha<br/>
                  Please use this app with <a href="https://metamask.io/">metamask</a>, under rinkeby test network.<br/>
                  Github: https://github.com/markselby9/mark-notarize
                </p>
              </div>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App
