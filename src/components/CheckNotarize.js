import React, { Component } from 'react'
import {
  addNotarizeInFactoryInstance, getDeployedNotarizesInFactoryInstance,
  getNotarizeByAddress, getPropertiesOfNotarizeInstance, isFinishedInNotarizeInstance
} from '../api/blockchainService';

class CheckNotarize extends Component {
  state = {
    address: '',
    result: null,
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
      });
    }, error => {
      this.setState({
        result: error.toString(),
      })
    });
  }

  handleChangeAddress(event) {
    this.setState({address: event.target.value});
  }

  render() {
    const { result } = this.state;
    return (
      <div>
        <section className="section">
          <div className="field">
            <label className="label">Item address</label>
            <div className="control">
              <input className="input"
                     type="text"
                     value={this.state.address}
                     onChange={this.handleChangeAddress} />
            </div>
            <p className="help">The address of deployed notarize item</p>
          </div>
          <a className="button" onClick={this.fetchInstanceOnAddress}>
            Get instance!
          </a>
        </section>
        <section className="section">
          result: {JSON.stringify(result)}
        </section>
      </div>
    )
  }
}

export default CheckNotarize;