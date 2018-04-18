import React, { Component } from 'react'

import Notarize from '../build/contracts/Notarize.json'
import NotarizeFactory from '../build/contracts/NotarizeFactory.json'
import NotarizeItem from './components/NotarizeItem';
import Home from './components/Home';
import { getWeb3Instance } from './api/blockchainService';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

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
      <div className="App">
        <div>
          Navigation
        </div>
        <hr/>

        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/:id" component={NotarizeItem}/>
          </Switch>
        </BrowserRouter>,
      </div>
    );
  }
}

export default App
