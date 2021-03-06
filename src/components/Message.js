import React from 'react'
import '../App.css'

const Message = (props) => {
    return (
        <div>
            <div
                className={`row message 
                ${props.message.read
                        ? "read"
                        : "unread"}
                ${props.message.selected
                        ? "selected"
                        : ""}`}>
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input
                                type="checkbox"
                                checked={props.message.selected
                                    ? "checked"
                                    : ""}
                                onChange={() => props.messageSelected(props.message.id)}
                                checked={(typeof props.message.selected !== "undefined") && props.message.selected === true ? "checked" : ""} />
                        </div>
                        <div className="col-xs-2">
                            <i className={`star fa 
                            ${props.message.starred
                                    ? "fa-star"
                                    : "fa-star-o"}`}
                                onClick={() => props.messageStarred(props.message.id)}></i>
                        </div>
                    </div>
                </div>
                <div
                    className="col-xs-11"
                    onClick={() => props.messageRead(props.message.id)}>
                    <span
                        className={props.message.labels.includes("dev")
                            ? "label label-warning"
                            : "hidden"}>dev</span>
                    <span
                        className={props.message.labels.includes("personal")
                            ? "label label-warning"
                            : "hidden"}>personal</span>
                    <span
                        className={props.message.labels.includes("gschool")
                            ? "label label-warning"
                            : "hidden"}>gschool</span>
                    <a

                        href="/#"

                    >
                        {props.message.subject}

                    </a>

                </div>
            </div >
            <div className={props.message.open ? "row message-body" : "hidden"}>
                <div className="col-xs-11 col-xs-offset-1">
                    {props.message.body}
                </div>
            </div>
        </div>
    )
}

export default Message