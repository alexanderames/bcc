import React, { Component } from 'react'
import Listing from './Listing'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const NEW_LISTINGS = gql`
  subscription {
    newMake {
      id
      name
    }
  }
`

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
    _subscribeToNewMakes = subscribeToMore => {
      subscribeToMore({
        document: NEW_LISTINGS,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev

          const newMake = subscriptionData.data.newMake

          return Object.assign({}, prev, {
            Listings: [newMake, ...prev.makes],
            __typename: prev.makes.__typename
          })
        }
      })
    }

    render() {
      return (
        <Query query={LISTINGS}>
          {({ loading, error, data, subscribeToMore }) => {
            if (loading) return <div>Loading...</div>
            if (error) return <div>Error</div>

            this._subscribeToNewMakes(subscribeToMore)

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
