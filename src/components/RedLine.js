import React from 'react';
// Red Line for Styling
export class RedLine extends React.Component {
  render() {
    return (
        <hr
          style={{
              color: "#D4374A",
              backgroundColor: "#D4374A",
              height: 5,
              width: 20
          }}
        />
    );
  }
}