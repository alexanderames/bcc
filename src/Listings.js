import React, { Component } from 'react'
import Listing from './Listing'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const LISTINGS = gql`
  query {
    makes {
      id
      name
      models {
        name
        options {
          color
          doorCount
          drivetrain
          fuelType
          style
          transmission
        }
      }
      vehicles {
        plateState
        year
        vin
      }
    }
  }`

  class Listings extends Component {
    render() {
      return (
        <Query query={LISTINGS}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>
            if (error) return <div>Error</div>

            const listingsToRender = data.makes

            return (
              <div className="col col-center">
                <header>
                  <div id="logo">vehicle<b>listings</b></div>
                </header>
                {listingsToRender.map(m => <Listing key={m.id} make={m} />)}
              </div>
            )
          }}
        </Query>
      )
    }
  }

  export default Listings
