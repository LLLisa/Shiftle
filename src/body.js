import React from 'react';
import testDisplay from '../db/index';

export default class Body extends React.Component {
  render() {
    console.log(Array.isArray(testDisplay));
    return (
      <div>
        <h1>{testDisplay[0]}</h1>
        {/* <ul>
          {testDisplay.map((word, i) => (
            <li key={i}>{word}</li>
          ))}
        </ul> */}
      </div>
    );
  }
}
