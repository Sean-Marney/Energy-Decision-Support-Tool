import tips from "public/tips.svg";
import React from "react";
import Image from "next/image";
import { router } from "next/router";

export class ArchivedOptimisation extends React.Component {
  constructor(props) {
    super(props);
    this.showArchiveButton = React.createRef();
    this.handleUnarchive = this.handleUnarchive.bind(this);
  }
  //   Handles unarchive the optimisation by calling api which modifies the database and then reloads the page
  async handleUnarchive() {
    let values = { id: this.props.optimisation.id, value: "1" };
    const submit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    await fetch("http://localhost:3000/api/toggleArchive", submit);
    router.push("http://localhost:3000/optimisations");
  }
  render() {
    // Sets the background colour depending on the priority of the optimisation
    let colour;
    if (this.props.optimisation.priority == "3") {
      colour = "basis-1/6 bg-green-600 w-1 h-9 rounded-sm";
    } else if (this.props.optimisation.priority == "2") {
      colour = "basis-1/6 bg-yellow-600 w-1 h-9 rounded-sm";
    } else {
      colour = "basis-1/6 bg-red-600 w-1 h-9 rounded-sm";
    }
    return (
      // Shows the details of the archived optimisation
      <div
        className="border-slate-800/75 border-2 rounded-sm cursor-pointer h-12 w-60"
        ref={this.showArchiveButton}
        onClick={this.handleUnarchive}
      >
        <div className="flex flex-row m-1">
          <div className={colour}>
            <Image src={tips} height={36} width={36} alt="Tip" />
          </div>
          <div className="basis-5/6">
            <p className="font-bold ml-2">{this.props.optimisation.title}</p>
          </div>
        </div>
      </div>
    );
  }
}
