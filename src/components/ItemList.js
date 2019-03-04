import React, { Component } from 'react';
import { Link } from "react-router-dom";

import SearchForm from './SearchForm';
import ItemSingle from './ItemSingle';

class ItemList extends Component {
  constructor() {
    super()
    this.state = {
      isLoaded: false,
      filteredList: [],
    }

    this.filterList = this.filterList.bind(this)
  }

  componentDidMount() {
    const currentList = localStorage.getItem('itemlist')
    if (currentList !== null) {
      this.setState({
        isLoaded: true,
        filteredList: JSON.parse(currentList),
      })
    } else {
      fetch('dummy.json')
        .then(response => response.json())
        .then(data => {
          this.setState({
            isLoaded: true,
            filteredList: data,
          })
          localStorage.setItem('itemlist', JSON.stringify(data))
        })
    }
  }

  filterList(searchTerms) {
    let filteredList = JSON.parse(localStorage.getItem('itemlist'))
    if (searchTerms.length > 2) {
      filteredList = filteredList.filter(item => {
        return item.name.toLowerCase().search(searchTerms.toLowerCase()) !== -1
      })
    }
    this.setState({filteredList: filteredList})
  }

  render() {
    return (
      <div className="item-list">
        <SearchForm handleChange={this.filterList} />
        <Link to="/edit">
          <button>Add a beer</button>
        </Link>
        <div className="item-list-wrapper">
        {this.state.filteredList.map((beer) =>
          <ItemSingle
            key={beer.id}
            data={beer}
          />
        )}
        </div>
      </div>
    )
  }
}

export default ItemList;
