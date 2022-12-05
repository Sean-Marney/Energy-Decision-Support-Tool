import React from "react";

export class TextField extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <input type={this.props.type} className="inline-block rounded bg-slate-200 focus:bg-slate-300 py-3 px-3" placeholder={this.props.placeholder} />
        );
    }
}