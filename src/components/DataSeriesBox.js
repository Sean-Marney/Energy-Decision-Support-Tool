import React from 'react'
export class DataSeriesBox extends React.Component {
    render() {
        return (
        <div id='destination' className="border border-black h-40 w-40 text-center content-center rounded-lg border-radius: 500px">
                { this.props.content}
        </div>
            )
    }
}