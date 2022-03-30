import React from 'react';
import ReactDom from 'react-dom';
import Body from './body';

class Main extends React.Component {
  render() {
    return (
      <div>
        <Body />
      </div>
    );
  }
}

ReactDom.render(<Main />, document.getElementById('root'));
