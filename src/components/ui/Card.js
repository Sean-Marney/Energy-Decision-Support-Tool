import React from "react";

import classNames from "classnames";

export class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={classNames(['shadow-2xl', 'bg-white', 'p4', 'rounded', 'p-8'].concat(this.props.className))}>
                {this.props.children}
            </div>
        );
    }
}