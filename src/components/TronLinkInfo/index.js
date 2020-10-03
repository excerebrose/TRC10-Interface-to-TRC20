import React, { Component } from "react";

import "./TronLinkInfo.scss";

export default class TronLinkInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountAddress: "None",
      accountBalance: "None",
    };
  }

  // Uncomment each call one at a time to see your account information filled out
  componentDidMount() {
   this.fetchAccountAddress();
   this.fetchAccountBalance();
  }

  // // The function below will return an object with address, balance, create_time,
  // // account_resource;
  async fetchAccountAddress() {
    const account = await window.tronWeb.trx.getAccount();
    const accountAddress = account.__payload__.address; // HexString(Ascii)
    const accountAddressInBase58 = window.tronWeb.address.fromHex(
      accountAddress
    ); // Base58
    this.setState({
      accountAddress: accountAddress
    });
  }
  //
  // // The function below will return the account balance in SUN as a number
  async fetchAccountBalance() {
    const balanceInSun = await window.tronWeb.trx.getBalance(); //number
    const balanceInTRX = window.tronWeb.fromSun(balanceInSun); //string
    const changeBackToSun = window.tronWeb.toSun(balanceInTRX); //string

    this.setState({
      accountBalance: balanceInSun
    });
  }
  //

  render() {
    const { accountAddress, accountBalance } = this.state;
    return (
      
      <div className="tronLinkInfo-component-container">
        <div className="account-info-address">
          Address: <span>{accountAddress}</span>
        </div>
        <div className="account-info-balance">
          Balance: <span>{accountBalance}</span>
        </div>
      </div>
    );
  }
}
