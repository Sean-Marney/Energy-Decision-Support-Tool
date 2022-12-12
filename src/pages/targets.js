import * as React from "react";
import TargetDisplay from "../components/target/TargetDisplay";

import Card from "../components/ui/Card"
import {Button} from "../components/ui/Button"

import { FaEdit } from "react-icons/fa";

export default function Targets({data}) {

  return (
    <Card className="m-8 w-full">
      <div className="grid grid-cols-2">
        <div className="col-span-1">
          <h1 className="text-5xl afterline mb-12">Targets</h1>
          <TargetDisplay name="Energy consumption" value="1,000 kW" />
          <TargetDisplay name="Cost" value="£1,000" />
          <TargetDisplay name="Carbon emissions" value="1,000 CO₂e" />
          <Button>
            <div className="flex-row flex">
              <FaEdit className="mr-3" size="1.75rem" color="#FFFFFF" />
              <strong>Edit</strong>
            </div>
          </Button>
        </div>
        <div className="col-span-1">
          <h1 className="text-5xl afterline">Progress</h1>
        </div>
      </div>
    </Card>
  )
}
