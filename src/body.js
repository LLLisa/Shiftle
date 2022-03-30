import React from 'react';
import testDisplay from '../db/index';

export default class Body extends React.Component {
  render() {
    console.log(testDisplay);
    return (
      <div className="container-flush">
        <ul>
          {testDisplay.map((x) => (
            <li>{x}</li>
          ))}
        </ul>
      </div>
    );
  }
}
