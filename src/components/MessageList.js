import React from 'react'
import Message from './Message'
import '../App.css'

let MessageList = (props) => {
    return (

        props.messages.map(message =>
            <Message message={message} />

        )
    )
}

export default MessageList