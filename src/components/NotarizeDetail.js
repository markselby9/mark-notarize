import React, { Component } from 'react'
import {
  isMyAddress, signNotarizeInstance
} from '../api/blockchainService';

class NotarizeDetail extends Component {
  state = {
    userAAddr: '',
    userASigned: false,
    userBAddr: '',
    userBSigned: false,
    content: '',
    result: null,
    joined: false,
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
      const setJoined = () => {
        this.setState({
          joined: true,
        });
      };
      isMyAddress(userA[0], setJoined, () => {
      });
      isMyAddress(userB[0], setJoined, () => {
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
    signNotarizeInstance(this.props.address, response => {
      console.log(response);
      alert('Successfully signed!')
    });
  }

  render() {
    const {
      userAAddr,
      userASigned,
      userBAddr,
      userBSigned,
      content,
      joined,
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

          {
            joined ? (
              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-link" onClick={this.didClickSignBtn}>Sign notarize!</button>
                </div>
                <p className="help">You can sign the notarize if you are one of the participants.</p>
              </div>
            ) : (<p>You're not a participant!</p>)
          }

        </section>
      </div>
    )
  }
}

export default NotarizeDetail;