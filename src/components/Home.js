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
      <div ref="homeRef">
        {showDeployedList()}
        <Link to="/create" className='button'>
          Create one
        </Link>
      </div>
    )
  }
}

export default Home;