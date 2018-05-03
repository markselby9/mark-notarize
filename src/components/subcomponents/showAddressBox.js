import React, { Component } from 'react';
import { Link } from "react-router-dom";

class ShowAddressBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { address } = this.props;
    if (address) {
      return (
        <div className="box">
          <div className="media-content">
            <div className="content">
              <Link to={`/query/${address}`}>
                {address}
              </Link>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="box">
        empty address!
      </div>
    )
  }
}

export default ShowAddressBox;