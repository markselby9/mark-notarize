import React, { Component } from 'react'
import Notarize from '../build/contracts/Notarize.json'
import NotarizeFactory from '../build/contracts/NotarizeFactory.json'
import ListNotarize from './components/NewNotarize';
import { getWeb3Instance } from './api/blockchainService';

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
        <nav className="navbar pure-menu pure-menu-horizontal">
          <a href="#" className="pure-menu-heading pure-menu-link">Notarize app</a>
        </nav>

        <main className="container">
          <ListNotarize notarizeFactoryInstance={this.state.notarizeFactoryInstance}/>
        </main>
      </div>
    );
  }
}

export default App
