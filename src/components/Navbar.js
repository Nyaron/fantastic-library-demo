import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <header>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Me</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </header>
      </div>
    );
  }
}

export default Navbar;
