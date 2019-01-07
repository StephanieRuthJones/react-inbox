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

  markAsReadButtonClicked = () => {
    const selectedMessages = this.state.messages.filter(message => message.selected === true)
    selectedMessages.forEach(message => this.messageRead(message.id))
  }

  messageRead = async (id) => {
    const readMessages = this.state.messages.map(message => {
      if (message.id === id) message.read = true
      return message
    })
    this.setState({ messages: readMessages })
  }

  markAsUnreadButtonClicked = () => {
    console.log('unreadbutton clicked')
    const selectedMessages = this.state.messages.filter(message => message.selected === true)
    selectedMessages.forEach(message => this.messageUnread(message.id))
  }

  messageUnread = async (id) => {
    const unreadMessages = this.state.messages.map(message => {
      if (message.id === id) message.read = false
      return message
    })
    this.setState({ messages: unreadMessages })
  }

  messageSelected = async (id) => {

    const selectedMessages = this.state.messages.map(message => {
      if (message.id === id) {
        message.selected = !message.selected
      }
      return message
    })
    this.setState({
      messages: selectedMessages
    })
  }

  selectAllButton = () => {
    const allMessagesSelected = this.state.messages.map(message => {
      message.selected = true
      return message
    })
    this.setState({ messages: allMessagesSelected })
  }

  messageStarred = async (id) => {
    const starredMessages = this.state.messages.map(message => {
      if (message.id === id) message.starred = !message.starred
      return message
    })
    this.setState({ messages: starredMessages })
  }

  deleteMessage = () => {
    const messagesToKeep = this.state.messages.filter(message => {
      return message.selected !== true
    })

    this.setState({ messages: messagesToKeep })
  }

  //onChange event listener for dropdown menu
  //value of dropdown added to array of labels 

  applyLabel = (e) => {
    const selectedMessages = this.state.messages.filter(message => message.selected === true)
    selectedMessages.forEach(message => this.messageSelected(message.labels = [...message.labels, e.target.value]))
  }

  removeLabel = (e) => {
    console.log('remove label', e.target.value)
    // const selectedMessages = this.state.messages.filter(message => message.selected === true)
    // selectedMessages.forEach(message => this.messageSelected(message.labels = [...message.labels, e.target.value]))
  }




  render() {

    return (
      <div className="container" >
        <Toolbar
          selectAllButton={this.selectAllButton}
          markAsReadButtonClicked={this.markAsReadButtonClicked}
          markAsUnreadButtonClicked={this.markAsUnreadButtonClicked}
          deleteMessage={this.deleteMessage}
          applyLabel={this.applyLabel}
          removeLabel={this.removeLabel} />
        <MessageList
          messages={this.state.messages}
          messageRead={this.messageRead}
          messageSelected={this.messageSelected}
          messageStarred={this.messageStarred} />
      </div >
    );
  }
}

export default App;