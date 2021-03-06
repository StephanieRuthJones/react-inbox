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
      composeMessage: false,
      subject: '',
      body: ''
    }
  }

  fetchMessages = () => {
    return fetch(url)
      .then(res => res.json())
      .then(messages => {
        const newState = messages.map(message => {
          message.open = false
          return message
        })
        this.setState({ messages: newState })
      })
  }

  componentDidMount() {
    this.fetchMessages()
      .catch(err => console.error(err))
  }

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
  }

  markAsReadButtonClicked = () => {
    const selectedMessages = this.state.messages.map(message => {
      if (message.selected === true) {
        message.read = true
      } return message
    })
    this.setState({ messages: selectedMessages })
  }

  messageRead = (id) => {
    console.log("message read")
    const readMessages = this.state.messages.map(message => {
      if (message.id === id) {
        message.read = true
        message.open = !message.open
      }
      return message
    })
    this.setState({ messages: readMessages })
    this.updates([id], "read", "read", true)
  }

  markAsUnread = (id) => {
    const ids = []
    const updatedMessage = this.state.messages.map(message => {
      if (message.selected) {
        message.read = false
        ids.push(message.id)
      }
      return message
    })

    this.setState({ messages: updatedMessage })
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
    const messagesToKeep = this.state.messages.filter(message => !message.selected === true)
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
    const selectedMessages = this.state.messages.map(message => {
      if (message.selected === true) {
        message.labels = message.labels.filter(label => label !== e.target.value)
      }
      return message
    })
    const ids = selectedMessages.map(message => message.id)


    this.setState({ messages: selectedMessages })
    this.updates(ids, "removeLabel", "label", e.target.value)
  }

  unreadCount = () => {
    const unreadMessages = this.state.messages.filter(message => message.read === false)
    const numberUnread = unreadMessages.length
    return numberUnread
  }

  composeMessageButton = () => {
    this.setState({
      composeMessage: !this.state.composeMessage
    })
  }

  sendMessage = (e) => {
    e.preventDefault()
    var newMessage = {
      subject: this.state.subject,
      body: this.state.body
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(newMessage),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    })
      .then(res => res.json())
      .then(message => {
        this.setState({
          messages: [...this.state.messages, message],
          composeMessage: !this.state.composeMessage
        })
        return message
      })
  }

  messageForm = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })

  }

  render() {
    console.log(this.state.messages)
    return (
      <div className="container" >
        <Toolbar
          messages={this.state.messages}
          composeMessageButton={this.composeMessageButton}
          selectAllButton={this.selectAllButton}
          markAsReadButtonClicked={this.markAsReadButtonClicked}
          markAsUnread={this.markAsUnread}
          deleteMessage={this.deleteMessage}
          applyLabel={this.applyLabel}
          removeLabel={this.removeLabel}
          unreadCount={this.unreadCount} />

        {this.state.composeMessage === true ? <ComposeMessage sendMessage={this.sendMessage} messageForm={this.messageForm} /> : null}

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