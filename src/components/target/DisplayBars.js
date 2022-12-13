import TargetBar from "./TargetBar";

export default function DisplayBars({ targets, kpi }) {
    return (
        <div className="col-span-1">
            <h1 className="text-5xl afterline mb-12">Progress</h1>
            { targets.map(target => <TargetBar target={ target } progress={ kpi[target.timeframe][target.name] } />) }
        </div>
    )
}