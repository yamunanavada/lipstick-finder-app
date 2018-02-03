import React from 'react';

class RevlonFactory extends React.Component {

  render (){

    let itemHtml = this.props.nyxInfo.map(p => <div className='item-div'><h3>{p.name}</h3> {p.price > 0 ? <h3>Price: ${Number(p.price).toFixed(2)}</h3> : <h3>Price not available</h3>}<img src={p.image_link} /><p>{p.description}</p><p><a href={p.product_link}>Buy this lipstick</a></p></div>)

    return(
      <div className='makeup-items'>
        {itemHtml}
      </div>
    )
  }
}

export default RevlonFactory
