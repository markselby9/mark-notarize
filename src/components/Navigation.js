import React, { Component } from 'react';

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
                <img src="http://bulma.io/images/bulma-type-white.png" alt="Logo"/>
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
                <a className="navbar-item is-active">
                  Home
                </a>
                <a className="navbar-item">
                  Examples
                </a>
                <a className="navbar-item">
                  Documentation
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