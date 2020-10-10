import React, { Component } from 'react';
import Pets from '../pets/Pets';
import People from '../people/People';
import AdoptionService from '../services/adoption-api-service';
import '../index.css';

export default class AdoptionPage extends Component {
  state = {
    people: [],
    dogs: [],
    cats: [],
    currentUser: '',
    nextInLine: '',
  };

  fakeUsers = [
    'Imma Zero',
    'Bob Zureunkle',
    'Mary Jane',
    'Fred Savage',
    'Harry Potter',
  ];

  renderDogs() {
    const { dogs } = this.state;
    if (!dogs || !dogs.length) {
      return null;
    }
    return (
      <Pets
        details={dogs[0]}
        canAdopt={
          this.state.nextInLine === this.state.currentUser ? 'true' : 'false'
        }
        adoptionHandler={this.adoptDogClick}
      />
    );
  }

  // Fixes mounting issue in a better fashion
  renderCats() {
    const { cats } = this.state;
    if (!cats || !cats.length) {
      return null;
    }
    return (
      <Pets
        details={cats[0]}
        canAdopt={
          this.state.nextInLine === this.state.currentUser ? 'true' : 'false'
        }
        adoptionHandler={this.adoptCatClick}
      />
    );
  }

  componentDidMount() {
    AdoptionService.getPeople().then((res) => this.setState({ people: res }));
    AdoptionService.getPets().then((res) =>
      this.setState({ dogs: res.dogs, cats: res.cats })
    );

    this.setState({ nextInLine: this.state.people[0] });

    setInterval(() => {
      this.handleIntervalTickEvent();
    }, 5000);
  }

  // TODO implement adopt methods
  adoptDogClick = (option) => {
    if (option === 'both') {
      this.adoptPet('both');
    } else {
      this.adoptPet('dogs');
    }
  };

  adoptCatClick = (option) => {
    if (option === 'both') {
      this.adoptPet('both');
    } else {
      this.adoptPet('cats');
    }
  };

  adoptPet = (type) => {
    const people = this.state.people;
    const cats = this.state.cats;
    const dogs = this.state.dogs;

    AdoptionService.deletePet(type).then(() => {
      //deletes pet and person from server
      //then deletes pet from appropriate local data pool to keep client/server in sync
      if (type === 'cats') {
        cats.shift();
      } else if (type === 'dogs') {
        dogs.shift();
      } else {
        cats.shift();
        dogs.shift();
      }
      //then delete person from local data to keep client/server in sync
      people.shift();
      //    then update state with local data to force rerender to update view
      this.setState({
        people: people,
        cats: cats,
        dogs: dogs,
        nextInLine: people[0],
        currentUser: '',
      });
    });
  };

  handleAddPerson = (ev) => {
    ev.preventDefault();
    const { name } = ev.target;
    const people = this.state.people;

    AdoptionService.postPerson(name.value).then(() => {
      people.push(name.value);
      this.setState({ people: people, currentUser: name.value });
    });
  };

  handleIntervalTickEvent() {
    const people = this.state.people;
    const cats = this.state.cats;
    const dogs = this.state.dogs;

    const currentUser = this.state.currentUser;
    let nextInLine = this.state.nextInLine;

    if (nextInLine === currentUser) {
      if (people.length < 5) {
        //add random person
        const rando = this.fakeUsers[people.length];
        AdoptionService.postPerson(rando).then(() => {
          people.push(rando);
          this.setState({ people: people });
        });
      }
    } else if (people.length > 0) {
      const petType = people.length % 2 === 0 ? 'cats' : 'dogs';
      AdoptionService.deletePet(petType).then(() => {
        //deletes pet and person from server
        //then deletes pet from appropriate local data pool to keep client/server in sync
        if (petType === 'cats') {
          cats.shift();
        } else {
          dogs.shift();
        }
        //then delete person from local data to keep client/server in sync
        people.shift();

        this.setState({
          people: people,
          cats: cats,
          dogs: dogs,
          nextInLine: people[0],
        }); //    then update state with local data to force rerender to update view
      });
    }
  }

  render() {
    const { people } = this.state;
    return (
      <>
        <section className="petDetails">
          {this.renderDogs()}
          {this.renderCats()}
        </section>
        <h2>Adoption Line</h2>
        <People people={people} />
        <form className="nameForm" onSubmit={this.handleAddPerson}>
          <label htmlFor="adoptForm">Name:</label>
          <input name="name" type="text" />
          <button type="submit">Get In Line</button>
        </form>
      </>
    );
  }
}
