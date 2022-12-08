import { React, useState } from "react";

export function TextField(props) {
    const [value, setValue] = useState("")

    return (
        <input type={props.type} className="inline-block rounded bg-slate-200 focus:bg-slate-300 py-3 px-3" placeholder={props.placeholder} value={props.value} onChange={(e) => {props.onChange(e.target.value)}} />
    );
}