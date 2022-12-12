
import React from "react";
import Image from "next/image";
import { router } from "next/router";

import Card from "components/ui/Card";

import classNames from "classnames";

import { FaTrashRestoreAlt } from "react-icons/fa";


export class ArchivedOptimisation extends React.Component {
  constructor(props) {
    super(props);
    this.showArchiveButton = React.createRef();
    this.handleUnarchive = this.handleUnarchive.bind(this);
  }
  //   Handles unarchive the optimisation by calling api which modifies the database and then reloads the page
  async handleUnarchive() {
    let values = { id: this.props.optimisation.id, value: false };
    const submit = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    await fetch("/api/optimisation/" + this.props.optimisation.id + "/archive", submit)
    this.props.refreshMethod()
  }

  render() {
    // Sets the background colour depending on the priority of the optimisation
    let colour;
    switch(this.props.optimisation.priority){
      case "3":
        colour = "bg-[#63A103]";
        break;
      case "2":
        colour = "bg-[#F08A24]";
        break;
      default:
        colour = "bg-[#D9001B]";
        break;
    }

    return (
      // Shows the details of the archived optimisation
      <div onClick={this.handleUnarchive}>
        <Card className="flex flex-row mb-4 px-4 py-4 items-center">
        <img src="/images/tips.svg" className={classNames('p-1', 'mr-3', 'rounded', 'justify-center', 'w-8', colour)} />
        <strong>{ this.props.optimisation.title }</strong>
        <FaTrashRestoreAlt className="ml-auto" size="1.75rem" color="#383735" />
      </Card></div>
    );
  }
}
