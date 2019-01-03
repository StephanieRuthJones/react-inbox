import React, { Component } from 'react';
import Toolbar from './Toolbar'
import MessageList from './MessageList'
import '../App.css';



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [1, 2, 3]
    }
  }
  render() {
    return (
      <div className="container">
        <Toolbar />
        <MessageList messages={this.state.messages}></MessageList>
      </div>
    );
  }
}

export default App;
