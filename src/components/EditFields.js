import React, { Component } from 'react';

class editFields extends Component {
  constructor(props) {
    super(props)
    const {name, type, quantity, id} = props.data;
    this.state = {
      id: id,
      type: type,
      name: name,
      stock: quantity,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const {name, value} = e.target
    if (name === '') {
      this.setState({type: value})
    } else {
      this.setState({[name]: value})
    }
  }

  render() {
    return (
      <div className="edit-fields">
        <input type="hidden" name="id" value={this.state.id} onChange={this.handleChange}/>
        <div className="form-group">
          <input
            type="radio"
            value="Bottle"
            checked={this.state.type === "Bottle"}
            onChange={this.handleChange}/>
            Bottle
          <input
            type="radio"
            value="Can"
            checked={this.state.type === "Can"}
            onChange={this.handleChange}/>
            Can
          <input
            type="radio"
            value="Other"
            checked={this.state.type === "Other"}
            onChange={this.handleChange}/>
            Other
        </div>
        <div className="form-group">
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
        </div>
        <div className="form-group">
          <input type="number" name="stock" min="0" value={this.state.stock} onChange={this.handleChange}/>
        </div>
      </div>
    )
  }
}

export default editFields;
