import React, { Component } from 'react';
import { getDeployedNotarizesInFactoryInstance } from "../api/blockchainService";
import ShowAddressBox from './subcomponents/showAddressBox';
import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    deployedList: '[]', // list of deployed notarizes
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    getDeployedNotarizesInFactoryInstance(response => {
      if (this.refs.homeRef) {
        this.setState({
          deployedList: JSON.stringify(response),
        })
      }
    });
  }

  render() {
    console.log(this.state.deployedList);
    const deployedList = JSON.parse(this.state.deployedList);

    const showDeployedList = () => {
      const showListDiv = deployedList.map((address, index) => {
        return <ShowAddressBox address={address} key={index}/>
      });
      if (deployedList && deployedList.length > 0) {
        return (
          <section className='section'>
            <h1 className='title is-5'>Deployed documents for notarization, by address:</h1>
            { showListDiv }
          </section>
        )
      }
      return (
        <section className='section'>
          <p>No instance of deployed notarizes is found!</p>
        </section>
      )
    };

    return (
      <section className="section" ref="homeRef">
        <article className="message is-warning">
          <div className="message-header">
            <p>Warning</p>
          </div>
          <div className="message-body">
            Please make sure you have: 1. Metamask installed, 2. Switched to Rinkeby test network<br/>or you may be unable to use the app!
          </div>
        </article>
        {showDeployedList()}
        <Link to="/create" className='button'>
          Create new document to sign
        </Link>
      </section>
    )
  }
}

export default Home;