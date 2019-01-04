import React, { Component } from 'react';
import Toolbar from './Toolbar'
import MessageList from './MessageList'
import '../App.css';
const url = 'http://localhost:8082/api/messages'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }

  fetchMessages = () => {
    return fetch(url)
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

  messageRead = (id) => {
    const readMessages = this.state.messages.map(message => {
      if (message.id === id) message.read = true
      return message
    })
    this.setState({ messages: readMessages })
  }

  messageSelected = (id) => {
    const selectedMessages = this.state.messages.map(message => {
      if (message.id === id) message.selected = !message.selected
      return message
    })
    this.setState({ messages: selectedMessages })
  }

  messageStarred = (id) => {
    const starredMessages = this.state.messages.map(message => {
      if (message.id === id) message.starred = !message.starred
      return message
    })
    this.setState({ messages: starredMessages })
  }

  selectAllButton = () => {
    console.log('clicked')
    const allMessagesSelected = this.state.messages.map(message => {
      message.selected = true
      return message
    })
    this.setState({ messages: allMessagesSelected })
  }

  render() {
    console.log(this.state.messages)
    return (
      <div className="container">
        <Toolbar
          selectAllButton={this.selectAllButton} />
        <MessageList
          messages={this.state.messages}
          messageRead={this.messageRead}
          messageSelected={this.messageSelected}
          messageStarred={this.messageStarred} />
      </div>
    );
  }
}

export default App;