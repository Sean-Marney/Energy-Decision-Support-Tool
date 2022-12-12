import React from "react";
import classNames from "classnames";

export class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <button
            className={ classNames("bg-cardiff-blue text-white font-bold py-3 px-4 text-2xl", this.props.style) } onClick={this.props.onClick}
        >
            {this.props.children}
        </button>
        );
    }
}