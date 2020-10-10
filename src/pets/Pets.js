import React, { Component } from 'react';
import '../index.css';

export default class Pets extends Component {
  renderAdoptButton() {
    const canAdopt = this.props.canAdopt;
    const adoptionHandler = this.props.adoptionHandler;
    if (canAdopt === 'true') {
      return (
        <div>
          <button type="submit" onClick={() => adoptionHandler()}>
            Adopt Me!
          </button>
          <button type="submit" onClick={() => adoptionHandler('both')}>
            Adopt Both!
          </button>
        </div>
      );
    } else {
      return '';
    }
  }

  render() {
    const {
      age,
      breed,
      description,
      gender,
      imageURL,
      name,
      story,
    } = this.props.details;
    return (
      <article className="pet">
        <div className="petImage">
          <img className="petImage" src={imageURL} alt="pet pic" />
        </div>
        <div className="petDesc">Description: {description}</div>
        <div className="petName">Name: {name}</div>
        <div className="petGender">Gender: {gender}</div>
        <div className="petAge">Age: {age}</div>
        <div className="petBreed">Breed: {breed}</div>
        <div className="petStory">Story: {story}</div>
        {this.renderAdoptButton()}
      </article>
    );
  }
}
