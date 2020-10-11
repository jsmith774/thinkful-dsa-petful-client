import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

export default class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <section>
          The adoption process works strictly on a "First-In, First-Out" basis.
          The FIFO is based on the animals that came to the shelter first.
          People can adopt a cat, or a dog, or both, but they may only adopt the
          animal that came to the shelter first. In addition, people who want to
          adopt are also put in a Queue so they can adopt when it's their turn.
        </section>
        <img
          className="petImage"
          src="https://placekitten.com/300/300"
          alt="Landing Cat"
        />
        <br />
        <Link to="adoption">
          <button type="submit">Start!</button>
        </Link>
      </div>
    );
  }
}
