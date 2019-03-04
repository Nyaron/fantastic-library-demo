import React, { Component } from 'react';
import { Redirect, withRouter } from "react-router";
import { Link } from "react-router-dom";

import EditFields from './EditFields'

class EditForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refsCollection: [React.createRef()],
      redirect: false,
    }

    this.saveChanges = this.saveChanges.bind(this)
    this.addFields = this.addFields.bind(this)
  }

  saveChanges() {
    // Mock MongoDB's _id, source: https://stackoverflow.com/a/46609126
    const ObjectId = (rnd = r16 => Math.floor(r16).toString(16)) =>
    rnd(Date.now()/1000) + ' '.repeat(16).replace(/./g, () => rnd(Math.random()*16))
    let itemsList = JSON.parse(localStorage.getItem('itemlist'))

    this.state.refsCollection.forEach(fieldsRef => {
      const current = fieldsRef.current.state

      if (typeof current.id === 'undefined') {
        itemsList.push({
          id: ObjectId(),
          type: current.type,
          name: current.name,
          quantity: current.stock,
        })
      } else {
        itemsList = itemsList.map(item => {
          if (item.id === current.id) {
            item.type = current.type
            item.name = current.name
            item.quantity = current.stock
          }
          return item
        })
      }

    })
    localStorage.setItem('itemlist', JSON.stringify(itemsList))
    this.setState({redirect: true})
  }

  addFields() {
    this.setState(prevState => {
      let currentRefs = prevState.refsCollection
      currentRefs.push(React.createRef())
      return {
        refsCollection: currentRefs
      }
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />
    }

    let editData = {};

    if (typeof this.props.match.params.id !== 'undefined') {
      const currentList = JSON.parse(localStorage.getItem('itemlist'))
      editData = currentList.find(elem => elem.id === this.props.match.params.id)
    }

    return (
      <div className="edit-form">
        <button onClick={() => this.saveChanges()}>Save changes</button>
        <Link to="/">
          <button>Cancel</button>
        </Link>
        {this.state.refsCollection.map((fieldsRef, index) =>
          <EditFields
            key={index}
            ref={fieldsRef}
            data={editData}
          />

        )}
        <button onClick={() => this.addFields()}>Add one more</button>
      </div>
    )
  }
}

export default withRouter(EditForm);
