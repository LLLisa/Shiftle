import React from 'react';
import { testDisplay, trie } from '../db/index';

export default class Body extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.clear = this.clear.bind(this);
  }

  handleOnChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  handleFormSubmit(ev) {
    ev.preventDefault();
    console.log(this.state.search);
  }

  clear(ev) {
    ev.preventDefault();
    this.setState({ search: '' });
  }

  render() {
    // console.log(trie);
    return (
      <div className="container">
        <ul>
          {testDisplay.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
        <form onSubmit={this.handleFormSubmit}>
          <input
            name="search"
            value={this.state.search}
            onChange={this.handleOnChange}
          ></input>
          <button type="button" onClick={this.clear}>
            clear
          </button>
        </form>
      </div>
    );
  }
}
