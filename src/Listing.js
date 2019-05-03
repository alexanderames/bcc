import React, {Component} from 'react'

class Listing extends Component {
  render() {
    return (<main>
        {this.props.make.name}
        {
          this.props.make.models.map((i, id) => (<span key={id}>
            <b>{i.name} </b>
            {
              i.options.map((c, x) => (<i key={x}>
                {c.color}
              </i>))
            }
          </span>))
        } | 
        {
          this.props.make.vehicles.map((i, id) => (<span key={id}>
            {i.year}
          </span>))
        }
    </main>)
  }
}

export default Listing
