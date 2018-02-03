import React from 'react';
import NyxFactory from './NyxFactory'
import RevlonFactory from './RevlonFactory'
import './MakeupContainer.css'

const nyxURL = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=nyx&product_type=lipstick"
const revlonURL = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=revlon&product_type=lipstick"

class MakeupContainer extends React.Component {

  state = {
    nyxInfo: [],
    revlonInfo: [],
    showing: 'NYX',
    matte: false,
    nonMatte: false
  }

  fetchNyxData = () => {
    fetch(nyxURL).then(res => res.json()).then(data => {
      data = data.sort(function(a,b) { return a.price-b.price})
      this.setState({ nyxInfo: data})
    })
  }

  fetchRevolnData = () => {
    fetch(revlonURL).then(res => res.json()).then(data => {
      data = data.sort(function(a,b) { return a.price-b.price})
      this.setState({ revlonInfo: data })
    })
  }

  componentDidMount() {
    this.fetchNyxData()
    this.fetchRevolnData()
  }

  handleSelect = (event) => {
    event.preventDefault()
    this.setState({
      showing: event.target.value
    })
  }

  handleCheckBox = (event) => {
    if (event.target.id === 'only-matte-filter') {
      this.state.matte ? this.setState({ matte: false}) : this.setState({ matte: true})
    } else if (event.target.id === 'no-matte-filter'){
      this.state.nonMatte ? this.setState({ nonMatte: false}) : this.setState({ nonMatte: true})
    }
  }


  render() {
    return (
      <div className='main-container'>
        <h1>Find the perfect budget lipstick shade for you</h1>

        <select onChange={this.handleSelect} id='brand selector'>
          <option id='nyx'>NYX</option>
          <option id='revlon'>Revlon</option>
        </select>
        <label for='brand-selector'>Select Brand</label>

        <div className='filters-div'>
          <input onChange={this.handleCheckBox} id='only-matte-filter' type='checkbox'/>
          <label for='only-matte-filter'>Matte Only</label>

          <input onChange={this.handleCheckBox} id='no-matte-filter' type='checkbox'/>
          <label for='no-matte-filter'>Non Matte Only</label>
        </div>

        {this.state.showing === 'NYX' ? <NyxFactory nyxInfo={this.state.nyxInfo} handleSelect={this.handleSelect}/> : <RevlonFactory nyxInfo={this.state.revlonInfo} handleSelect={this.handleSelect}/>}

      </div>
    );
  }
}

export default MakeupContainer
