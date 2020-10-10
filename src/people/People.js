import React, { Component } from 'react';
import '../index.css'

export default class People extends Component {
  render() {
    const { people } = this.props
    return (
      <ul className='people'>
        {people.map((person, idx) => (
          <li key={idx} className='person'>
            <div>{person}</div>
          </li>
        ))}
      </ul>
    )
  }

}