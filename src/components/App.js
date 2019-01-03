import React, { Component } from 'react';
import Toolbar from './Toolbar'
import MessageList from './MessageList'
import '../App.css';



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }

  fetchMessages = () => {
    return fetch('http://localhost:8082/api/messages')
      .then(res => res.json())
      .then(messages => {
        this.setState({ messages: messages })
        return messages
      })
  }

  componentDidMount() {
    this.fetchMessages()
      .catch(err => console.error(err))
  }

  render() {
    console.log(this.state.messages)
    return (
      <div className="container">
        <Toolbar />
        <MessageList
          messages={this.state.messages}>
        </MessageList>
      </div>
    );
  }
}

export default App;


