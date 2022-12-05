import React from "react";

export class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <button
            className="bg-cardiff-blue text-white font-bold py-3 px-4 text-2xl"
        >
            {this.props.children}
        </button>
        );
    }
}