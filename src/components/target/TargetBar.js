import classNames from "classnames"

export default function TargetBar({ target, progress }) {
    var twelvePercent = Math.ceil((progress / target.value) * 12)
    if(twelvePercent > 12){
        twelvePercent = 12
    }

    return (
        <div className="flex flex-col mb-12">
            <div className="bg-cardiff-blue text-clip h-24">
                <div className={ classNames("bg-cardiff-red w-" + twelvePercent + "/12 h-full text-clip whitespace-nowrap p-2 flex items-center text-white text-4xl font-bold") }>
                    { progress } / {target.value} ({Math.round(progress / target.value * 100 * 100)/100 }%)
                </div>
            </div>
        </div>
    )
}