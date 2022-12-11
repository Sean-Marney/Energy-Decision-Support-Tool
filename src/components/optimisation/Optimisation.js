
import React from "react";
import Image from "next/image";
import { router } from "next/router";

import { Card } from "../ui/Card"
import { Button } from "../ui/Button"

const classNames = require("classnames")

export class Optimisation extends React.Component {
  constructor(props) {
    super(props);

    this.handleArchive = this.handleArchive.bind(this);
  }

  // Handles archive the optimisation by api call to modify value and then reloads page
  async handleArchive() {
    let values = { id: this.props.optimisation.id, value: "0" };
    const submit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    await fetch("http://localhost:3000/api/toggleArchive", submit);
    router.push("http://localhost:3000/optimisations");
  }
  render() {
    // Sets the colour of the icon for the optimisation based on the priority
    let colour;
    if (this.props.optimisation.priority == "3") {
      colour = "bg-[#63A103]";
    } else if (this.props.optimisation.priority == "2") {
      colour = "bg-[#F08A24]";
    } else {
      colour = "bg-[#D9001B]";
    }
    return (

      <>
        <div className="mr-4 mb-4">
        <Card>
          <div className="flex flex-row mb-4">
            {/* Icon with background set due to the priority  */}
            <div className="basis-1/6 mr-4">
              <img src="/images/tips.svg" className={classNames('p-1', 'rounded', 'justify-center', colour)} />
            </div>
            {/* Displays data with information for the optimisation */}
            <div className="basis-5/6">
              <h1 className="font-black text-4xl text-left">
                {this.props.optimisation.title}
              </h1>
            </div>
          </div>

          <div>
            <p className="text-l">{this.props.optimisation.body}</p>
          </div>

          <div className="flex flex-row">
            <Button>
              <div className="flex-row flex h-6">
                <img className="mr-3" src="/images/archive.svg" />
                <strong>Archive</strong>
              </div>
            </Button>
          </div></Card></div>

      </>
    );
  }
}
