import React, { Component } from 'react'

class Listing extends Component {
  render() {
    return (
      <div>
          <div>
            {this.props.make.name}
          </div>
      </div>
    )
  }
}

export default Listing
