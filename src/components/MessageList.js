import React from 'react'
import Message from './Message'
import '../App.css'

const MessageList = (props) => {
    return (

        props.messages.map((message, idx) =>
            <Message
                key={idx}
                message={message}
                messageRead={props.messageRead}
                messageSelected={props.messageSelected}
                messageStarred={props.messageStarred}
                deleteMessage={props.deleteMessage} />

        )
    )
}

export default MessageList