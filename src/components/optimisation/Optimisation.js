
import React from "react";
import Image from "next/image";
import { router } from "next/router";

import Card from "../ui/Card"
import { Button } from "../ui/Button"

const classNames = require("classnames")

export class Optimisation extends React.Component {
  constructor(props) {
    super(props);

    this.handleArchive = this.handleArchive.bind(this);
  }

  // Handles archive the optimisation by api call to modify value and then reloads page
  async handleArchive() {
    let values = { id: this.props.optimisation.id, value: true };
    const submit = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    await fetch("/api/optimisation/" + this.props.optimisation.id + "/archive", submit)
    this.props.refreshMethod()
  }

  render() {
    // Sets the colour of the icon for the optimisation based on the priority
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

      <>
        <div className="col-span-1 mr-4 mb-4">
          <Card inverseTransition="true">
            <div className="grid grid-cols-12 flex items-center">
              <div className="col-span-1 justify-center">
                <img src="/images/tips.svg" className={classNames('p-1', 'rounded', 'justify-center', colour)} />
              </div>

              <div className="col-span-10">
                <h1 className="ml-3 font-black text-4xl text-left">
                  {this.props.optimisation.title}
                </h1>
              </div>
            </div>

            <p className="text-xl mt-4">{this.props.optimisation.body}</p>
            <p className="text-xl mt-4"><b>{this.props.optimisation.action}</b></p>

            <div className="flex flex-row mt-4 justify-end">
              <a onClick={() => this.handleArchive()}><Button>
                <div className="flex-row flex h-6 justify-center align-center items-center">
                  <img className="mr-3 h-8" src="/images/archive.svg" />
                  <strong>Archive</strong>
                </div>
              </Button></a>
            </div>

          </Card>
        </div>

      </>
    );
  }
}
