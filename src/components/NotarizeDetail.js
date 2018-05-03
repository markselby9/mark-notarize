import React, { Component } from 'react'
import {
  addNotarizeInFactoryInstance, getDeployedNotarizesInFactoryInstance,
  getNotarizeByAddress, getPropertiesOfNotarizeInstance, isFinishedInNotarizeInstance
} from '../api/blockchainService';

class NotarizeDetail extends Component {
  state = {
    userAAddr: '',
    userASigned: false,
    userBAddr: '',
    userBSigned: false,
    content: '',
    result: null,
  };

  constructor(props) {
    super(props);
    this.didClickSignBtn = this.didClickSignBtn.bind(this);
  }

  componentDidMount() {
    const { detail } = this.props;
    const { userA, userB, content } = detail;
    if (userA && userB) {
      this.setState({
        userAAddr: userA[0],
        userASigned: userA[1],
        userBAddr: userB[0],
        userBSigned: userB[1],
        content,
      });
    }
  }

  // handleInputChange(event) {
  //   const target = event.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const name = target.name;
  //
  //   this.setState({
  //     [name]: value
  //   });
  // }

  didClickSignBtn() {
    console.log('didClickSignBtn');
  }

  render() {
    const {
      userAAddr,
      userASigned,
      userBAddr,
      userBSigned,
      content,
    } = this.state;
    return (
      <div>
        <section className="section">
          <div className="field">
            <label className="label">Address of user one</label>
            <div className="control">
              <input className="input" type="text" placeholder="Blockchain account address"
                     value={userAAddr}
                     name="userAAddr"
                     disabled/>
            </div>
            <p className="help">Blockchain account address of user one</p>

            <div className="control">
              <label className="checkbox">
                <input type="checkbox" checked={userASigned}
                       name="userASigned"
                       disabled/>
                Signed
              </label>
            </div>
          </div>

          <div className="field">
            <label className="label">Address of user two</label>
            <div className="control">
              <input className="input" type="text" placeholder="Blockchain account address"
                     value={userBAddr}
                     name="userBAddr"
                     disabled/>
            </div>
            <p className="help">Blockchain account address of user two</p>

            <div className="control">
              <label className="checkbox">
                <input type="checkbox" checked={userBSigned}
                       name="userBSigned"
                       disabled/>
                Signed
              </label>
            </div>
          </div>

          <div className="field">
            <label className="label">Content</label>
            <div className="control">
              <input className="input" type="text" placeholder="Content you need to keep"
                     value={content}
                     name="content"
                     disabled/>
            </div>
            <p className="help">Write the content that needs to be notarized</p>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" onClick={this.didClickSignBtn}>Sign notarize!</button>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default NotarizeDetail;