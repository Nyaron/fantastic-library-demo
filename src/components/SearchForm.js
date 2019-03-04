import React, { Component } from 'react';

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerms: '',
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    const {name, value} = e.target
    this.setState({[name]: value})
    this.props.handleChange(value)
  }

  render() {
    return (
      <div className="search-form">
        <input type="text" name="searchTerms" placeholder="Search" onChange={this.handleChange}/>
      </div>
    )
  }
}

export default SearchForm;
