import React, { Component } from 'react';
import { Redirect } from 'react-router';

class ItemSingle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.data.id,
      name: this.props.data.name,
      type: this.props.data.type,
      stock: this.props.data.quantity,
      redirect: false,
    }

    this.updateStock = this.updateStock.bind(this)
    this.handleDblClick = this.handleDblClick.bind(this)
  }

  updateStock() {
    let itemsList = JSON.parse(localStorage.getItem('itemlist'))
    itemsList = itemsList.map(item => {
      if (item.id === this.state.id && this.state.stock > 0) {
       this.setState(prevState => {
        return {stock: prevState.stock - 1}
       })
       item.quantity = item.quantity - 1;
      }
      return item
    })
    localStorage.setItem('itemlist', JSON.stringify(itemsList))
  }

  handleDblClick() {
    this.setState({redirect: true})
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={`/edit/${this.state.id}`} />
    }

    return (
      <div
        className={`item-single${this.state.stock === 0 ?  ' item-oos' : ''}`}
        onDoubleClick={() => this.handleDblClick()}
      >
        <div>{this.state.type}</div>
        <div>{this.state.name}</div>
        <div>{this.state.stock}</div>
        <button onClick={() => this.updateStock()} disabled={this.state.stock === 0}>Drink it!</button>
      </div>
    )
  }
}

export default ItemSingle;
