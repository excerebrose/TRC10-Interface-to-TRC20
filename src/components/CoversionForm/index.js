import React, { Component } from 'react'
import Select from 'react-select';

import './ConversionForm.scss'

class ConversionForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: null,
      amount: 0,
      error: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.convert = this.convert.bind(this)
  }

  handleChange(selectedOption) {
    this.setState({selectedOption})
  }

  async convert(reverse) {
    if(this.state.selectedOption && this.state.amount !== '0') {
      let contract = await window.tronWeb.contract().at(this.state.selectedOption.value)
      const tokenValue = parseInt(this.state.amount)
      // If Not reverse
      if(!reverse) {
        try {
          const res = await contract.deposit().send(
            {
              tokenId: this.state.selectedOption.tokenId,
              tokenValue: tokenValue
            })
        }
        catch(e) {
          this.setState({
            error: toString(e)
          })
        }
      }
      // Else reverse 
      else {
        try {
          const res = await contract.withdraw(tokenValue).send()
        }
        catch(e) {
          this.setState({
            error: toString(e)
          })
        }
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div className="formwrapper">
          <div className="Error">{this.state.error}</div>
          <input className="formwrapper__input"
            onChange={e => this.setState({amount: e.target.value})}
            value={this.state.amount}
          />
          <Select
            className="selector__container"
            classNamePrefix="selector"
            isSearchable
            isMulti={false}
            options={this.props.config}
            value={this.state.selectedOption}
            onChange={v => this.handleChange(v)}
            placeholder="Token"
          />
          <div className="formwrapper__text">
          {`You will receive ${this.state.amount} tokens of `}
          <span className="formwrapper__text--wp">{`${this.state.selectedOption? this.state.selectedOption.wrapped_token : ''}`}</span>
          </div>

          <div 
            className="formwrapper__submit"
            onClick={() => this.convert(this.props.reverse)}
          >
          Convert
          </div>
        </div>
      </div>
    )
  }
}

export default ConversionForm