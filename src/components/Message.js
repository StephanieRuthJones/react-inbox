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
                onClick={() =>  props.messageRead(props.message.id)}>
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
                {/* <div className="row message-body">
                    <div className={`col-xs-11 col-xs-offset-1 ${props.message.read ? "" : "hidden"}`}>
                        {props.message.body}
                    </div>
                </div> */}
            </div>
        </div >
    )
}

export default Message