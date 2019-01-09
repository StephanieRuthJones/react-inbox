import React, { Component } from 'react';
import '../App.css';

class Toolbar extends Component {
    render() {
        const selectedMessages = this.props.messages.filter(message => message.selected === true).length

        return (
            <div className="row toolbar">
                <div className="col-md-12">
                    <p className="pull-right">
                        <span className="badge badge">{this.props.unreadCount()}</span>
                        unread messages
                    </p>

                    <a className="btn btn-danger">
                        <i className="fa fa-plus"></i>
                    </a>

                    <button className="btn btn-default">
                        <i
                            className={selectedMessages === this.props.messages.length
                                ? "fa fa-check-square-o"
                                : selectedMessages === 0
                                    ? "fa fa-square-o"
                                    : "fa fa-minus-square-o"}

                            onClick={this.props.selectAllButton} ></i>
                    </button>

                    <button
                        className="btn btn-default"
                        onClick={this.props.markAsReadButtonClicked}>
                        Mark As Read
                    </button>

                    <button
                        className="btn btn-default"
                        onClick={this.props.markAsUnreadButtonClicked}>
                        Mark As Unread
                    </button>

                    <select
                        className="form-control label-select"
                        onChange={this.props.applyLabel}>
                        <option>Apply label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <select
                        className="form-control label-select"
                        onChange={this.props.removeLabel} >
                        <option>Remove label</option>
                        <option value="dev">dev</option>
                        <option value="personal">personal</option>
                        <option value="gschool">gschool</option>
                    </select>

                    <button className="btn btn-default">
                        <i
                            className="fa fa-trash-o"
                            onClick={this.props.deleteMessage}></i>
                    </button>
                </div>
            </div>

        );
    }
}

export default Toolbar;