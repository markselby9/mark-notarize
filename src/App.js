import React, { Component } from 'react'

import NewNotarize from './components/NewNotarize';
import NotarizeDetail from './components/NotarizeDetail';
import CheckNotarize from './components/CheckNotarize';
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

          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/create" component={NewNotarize}/>
            <Route exact path="/query" component={CheckNotarize}/>
            <Route path="/query/:address" component={CheckNotarize}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App
