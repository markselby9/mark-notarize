import React, { Component } from 'react'
import {
  addNotarizeInFactoryInstance, getDeployedNotarizesInFactoryInstance,
  getNotarizeByAddress, isFinishedInNotarizeInstance
} from '../api/blockchainService';

class NewNotarize extends Component {
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
      alert('Add new document successfully!');
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
        <section className="section">
          <h5 className="title is-5">Create a new document by entering both address and the document content.</h5>
          <div className="field">
            <label className="label">Address of user one</label>
            <div className="control">
              <input className="input" type="text" placeholder="Blockchain account address"
                     ref={(usera) => this.usera = usera} />
            </div>
            <p className="help">Blockchain account address of user one</p>
          </div>

          <div className="field">
            <label className="label">Address of user two</label>
            <div className="control">
              <input className="input" type="text" placeholder="Blockchain account address"
                     ref={(userb) => this.userb = userb} />
            </div>
            <p className="help">Blockchain account address of user two</p>
          </div>

          <div className="field">
            <label className="label">Content</label>
            <div className="control">
              <input className="input" type="text" placeholder="Content you need to keep"
                     ref={(content) => this.content = content} />
            </div>
            <p className="help">Write the content that needs to be notarized</p>
          </div>

          <a className='button is-primary' onClick={this.handleClickAdd}>
            Add an item
          </a>

          <a className='button' onClick={this.handleClickGet}>
            Get the list of deployed document address
          </a>
        </section>
        <section className="section">
          result: {result}
        </section>
      </div>
    )
  }
}

export default NewNotarize;