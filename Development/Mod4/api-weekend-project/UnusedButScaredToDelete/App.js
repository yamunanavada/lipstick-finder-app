import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import MakeupContainer from './MakeupContainer'

const nyxURL = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=nyx&product_type=lipstick"
const revlonURL = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=revlon&product_type=lipstick"

class App extends Component {

  state = {
    nyxInfo: '',
    revlonInfo: '',
    showing: 'NYX',
    matte: false,
    nonMatte: false
  }

  componentDidMount() {
    fetch(nyxURL).then(res => res.json()).then(data => {
        data = data.sort(function(a,b) { return a.price-b.price})
      let nyxData = data.map((p) => {
        return(
          <div className='makeup-item'>
            <div id='fav-me'>
              <h1>😍</h1>
            </div>
            <h3>{p.name}</h3>
            {p.price > 0 ? <h3>Price: ${Number(p.price).toFixed(2)}</h3> : <h3>Price not available</h3>}

            <img src={p.image_link} />
            <p>{p.description}</p>
            <p><a href={p.product_link}>Buy this lipstick</a></p>
          </div>
        )
      })
      this.setState({ nyxInfo: nyxData })
      }
    )

    fetch(revlonURL).then(res => res.json()).then(data => {
      data = data.sort(function(a,b) { return a.price-b.price})
      let revlonData = data.map((p) => {
        return(
          <div className='makeup-item'>
            <div id='fav-me'>
              <h1>😍</h1>
            </div>
            <h3>{p.name}</h3>
            <h3>Price: {p.price}</h3>
            <img src={p.image_link} />
            <p>{p.description}</p>
            <p><a href={p.product_link}>Buy this lipstick</a></p>
          </div>
        )
      })
      this.setState({ revlonInfo: revlonData })
      }
    )
  }

  handleSelect = (event) => {
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

        {this.state.showing === 'NYX' ? this.state.nyxInfo : this.state.revlonInfo }

      </div>
    );
  }
}

export default App;
