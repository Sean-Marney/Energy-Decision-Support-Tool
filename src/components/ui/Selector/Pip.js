import classNames from "classnames"

export default function Pip({ text, selected, position, onClick }){
    const classes = []
    if(selected){
        classes.push("bg-cardiff-red")
    } else {
        classes.push("bg-slate-300")
    }

    if(position == "left"){
        classes.push("rounded-tl-2xl")
        classes.push("rounded-bl-2xl")
    } else if(position == "right"){
        classes.push("rounded-tr-2xl")
        classes.push("rounded-br-2xl")
    }

    return (
        <div className={ classNames("p-2 text-white", classes) } onClick={ onClick } >{ text }</div>
    )
}