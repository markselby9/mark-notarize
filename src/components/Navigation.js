import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Navigation extends Component {
  state = {
    active: false,
  };

  constructor(props) {
    super(props);
    this.clickMenuBurger = this.clickMenuBurger.bind(this);
  }

  clickMenuBurger() {
    this.setState({
      active: !this.state.active,
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item" href="../">
                Logo
              </a>
              <span className={"navbar-burger burger " + (this.state.active ? 'is-active' : '')} data-target="navbarMenu"
                    onClick={this.clickMenuBurger}>
              <span></span>
              <span></span>
              <span></span>
            </span>
            </div>
            <div id="navbarMenu" className={"navbar-menu " + (this.state.active ? 'is-active': '')}>
              <div className="navbar-end">
                <Link to='/' className="navbar-item is-active">
                  Home
                </Link>
                <Link to='/create' className="navbar-item">
                  Create
                </Link>
                <Link to='/query' className="navbar-item">
                  Query item by address
                </Link>
                <a className="navbar-item">
                  Help
                </a>
                <span className="navbar-item">
              </span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navigation;