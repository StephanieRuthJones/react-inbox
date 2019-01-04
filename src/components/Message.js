import React from 'react'
import '../App.css'

const Message = (props) => {
    return (
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
                            onChange={() => props.messageSelected(props.message.id)} />
                    </div>
                    <div className="col-xs-2">
                        <i className={`star fa 
                            ${props.message.starred
                                ? "fa-star"
                                : "fa-star-o"}`}></i>
                    </div>
                </div>
            </div>
            <div
                onClick={() => props.messageRead(props.message.id)}
                className="col-xs-11">
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
                    {/* {props.message.body} */}

                </a>
            </div>
        </div >
    )
}

export default Message