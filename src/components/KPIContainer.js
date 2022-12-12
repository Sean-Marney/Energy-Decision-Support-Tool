import React from 'react';
// Container that contains KPI Data
export class KPIContainer extends React.Component {
  render() {
    return (
      <div>
        <h1 className="text-5xl afterline divide-y text-left">{ this.props.title }</h1>
            { this.props.children }
      </div>
    );
  }
}