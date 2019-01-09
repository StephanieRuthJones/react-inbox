import React, { Component } from 'react';
import Toolbar from './Toolbar'
import ComposeMessage from './ComposeMessage'
import MessageList from './MessageList'
import '../App.css';
const url = 'http://localhost:8082/api/messages'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      composeMessage: false
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

  //patch request here
  updates = async (ids, command, prop, value) => {
    let message = {
      messageIds: ids,
      command: command,
      [prop]: value
    }
    await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    })
      .then(res => res.json())
      .then(messages => {
        this.setState({ messages: messages })
        return messages
      })
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
    this.updates([id], "read", "read", true)
  }
  //ids need to come in as array either from .map or filter.. or put []
  messageUnread = async (id) => {
    const unreadMessages = this.state.messages.filter(message => message.selected === true).map(message => {
      message.read = false
      return message
    })
    const ids = unreadMessages.map(message => message.id)

    this.setState({ messages: unreadMessages })
    this.updates(ids, "read", "read", false)
  }

  selectAllButton = () => {
    const allMessagesSelected = this.state.messages.filter(message => message.selected === true)
    const select = this.state.messages.map(message => {
      allMessagesSelected.length === this.state.messages.length
        ? message.selected = false
        : message.selected = true
      return message
    })

    this.setState({ messages: select })

  }

  messageStarred = async (id) => {
    const starredMessages = this.state.messages.map(message => {
      if (message.id === id) message.starred = !message.starred
      return message
    })
    this.setState({ messages: starredMessages })
    this.updates([id], "star", "starred")
  }

  deleteMessage = () => {
    const messagesToKeep = this.state.messages.filter(message => {
      if (message.selected) {
        return message
      }

    })

    const ids = messagesToKeep.map(message => message.id)

    this.setState({ messages: messagesToKeep })
    this.updates(ids, "delete", "delete")
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

  applyLabel = (e) => {
    //filter to find message then map to find id of each message
    const ids = []
    const label = this.state.messages.map((message) => {
      if (message.selected === true) {
        if (!message.labels.includes(e.target.value)) {
          message.labels = [...message.labels, e.target.value]
          ids.push(message.id)
        }
      }
      return message
    })
    this.setState({
      messages: label
    })

    this.updates(ids, "addLabel", "label", e.target.value)
  }

  removeLabel = (e) => {
    const selectedMessages = this.state.messages.filter(message => message.selected)
    const ids = selectedMessages.map(message => message.id)

    this.updates(ids, "removeLabel", "label", e.target.value)
  }

  unreadCount = () => {
    const unreadMessages = this.state.messages.filter(message => message.read === false)
    const numberUnread = unreadMessages.length
    return numberUnread
  }

  composeMessageButton = () => {
    console.log('compose button clicked')
    this.setState({
      composeMessage: !this.state.composeMessage
    })
  }

  sendMessage = (e) => {
    e.preventDefault()
    console.log('send button clicked')
    // this.state.messages.push(newMessage)
  }

  subject = (e) => {
    console.log('subject', e.target.value)

  }

  render() {

    return (
      <div className="container" >
        <Toolbar
          messages={this.state.messages}
          composeMessageButton={this.composeMessageButton}
          selectAllButton={this.selectAllButton}
          markAsReadButtonClicked={this.markAsReadButtonClicked}
          markAsUnreadButtonClicked={this.markAsUnreadButtonClicked}
          deleteMessage={this.deleteMessage}
          applyLabel={this.applyLabel}
          removeLabel={this.removeLabel}
          unreadCount={this.unreadCount} />

        {this.state.composeMessage === true ? <ComposeMessage sendMessage={this.sendMessage} subject={this.subject} /> : null}

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