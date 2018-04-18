import React, { Component } from 'react';

class NotarizeItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.match);
    return (
      <div>
        NotarizeItem
      </div>
    )
  }
}

export default NotarizeItem;