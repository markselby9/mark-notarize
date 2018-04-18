import React, { Component } from 'react'
import {
  addNotarizeInFactoryInstance, getDeployedNotarizesInFactoryInstance,
  getNotarizeByAddress, isFinishedInNotarizeInstance
} from '../api/blockchainService';

class ListNotarize extends Component {
  state = {
    result: null,
  };

  constructor(props) {
    super(props);
    this.handleClickGet = this.handleClickGet.bind(this);
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.fetchInstanceOnAddress = this.fetchInstanceOnAddress.bind(this);
  }

  componentWillMount() {

  }

  handleClickGet() {
    console.log('handleClickGet');
    getDeployedNotarizesInFactoryInstance(response => {
      console.log(response);
      this.setState({
        result: JSON.stringify(response),
      })
    });
  }

  handleClickAdd() {
    console.log('handleClickAdd');
    addNotarizeInFactoryInstance({
      givenUserA: this.usera.value || 0,
      givenUserB: this.userb.value || 0,
      givenContent: this.content.value || 0,
      givenValidDays: 30
    }, (response) => {
      this.setState({
        result: 'added',
      });
    })
  }

  fetchInstanceOnAddress() {
    isFinishedInNotarizeInstance(this.itemAddress.value, response => {
      console.log(response);
      alert(response);
    });
  }

  render() {
    const { result } = this.state;
    return (
      <div>
        <section>
          <label>
            usera address: <input type="text" ref={(usera) => this.usera = usera}/>
          </label><br/>
          <label>
            userb address: <input type="text" ref={(userb) => this.userb = userb}/>
          </label><br/>
          <label>
            content: <input type="text" ref={(content) => this.content = content}/>
          </label><br/>
          <button onClick={this.handleClickAdd}>add an item</button>
          <button onClick={this.handleClickGet}>get deployed notarize list</button>
        </section>
        <section>
          result: {result}
        </section>
        <section>
          <label>
            Item address: <input type="text" ref={(itemAddress) => this.itemAddress = itemAddress}/>
          </label><br/>
          <button onClick={this.fetchInstanceOnAddress}>is instance finished?</button>
        </section>
      </div>
    )
  }
}

export default ListNotarize;