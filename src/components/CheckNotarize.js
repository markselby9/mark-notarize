import React, { Component } from 'react'
import {
  addNotarizeInFactoryInstance, getDeployedNotarizesInFactoryInstance,
  getNotarizeByAddress, getPropertiesOfNotarizeInstance, isFinishedInNotarizeInstance
} from '../api/blockchainService';
import { Route } from "react-router-dom";
import NotarizeDetail from "./NotarizeDetail";

class CheckNotarize extends Component {
  state = {
    address: '',
    result: null,
    error: null,
  };

  constructor(props) {
    super(props);
    this.fetchInstanceOnAddress = this.fetchInstanceOnAddress.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
  }

  componentDidMount() {
    const address = this.props.match.params.address;
    if (address) {
      this.setState({
        address,
      });
    }
  }

  fetchInstanceOnAddress() {
    getPropertiesOfNotarizeInstance(this.state.address, properties => {
      console.log(properties);
      this.setState({
        result: properties,
        error: null,
      });
    }, error => {
      this.setState({
        error: error.toString(),
        result: null,
      })
    });
  }

  handleChangeAddress(event) {
    this.setState({ address: event.target.value });
  }

  render() {
    const { error, result, address } = this.state;
    return (
      <div>
        <section className="section">
          <div className="field">
            <label className="label">Item address</label>
            <div className="control">
              <input className="input"
                     type="text"
                     value={this.state.address}
                     onChange={this.handleChangeAddress}/>
            </div>
            <p className="help">The address of deployed notarize item</p>
          </div>
          {/*<a className="button" onClick={() => this.props.history.push(`/query/${this.state.address}`)}>*/}
          <a className="button" onClick={this.fetchInstanceOnAddress}>
            Get instance!
          </a>
        </section>
        {
          error ? (
            <section className="section">
              error: {JSON.stringify(error)}
            </section>
          ) : (<div/>)
        }
        {
          result ? (
            <NotarizeDetail detail={result} address={address}/>
          ) : (<div/>)
        }
      </div>
    )
  }
}

export default CheckNotarize;