import React, { Component } from 'react';
import Image from './Image'

class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.order
        }
    }

    render() {
        return (
            <div>
                <h2>Post by: {this.state.data.user.username}</h2>
                <Image img={this.state.data.user.icon}/>
                <h4>Poster Location: [{this.state.data.user.location.coordinates[1]},{this.state.data.user.location.coordinates[0]}]</h4>
                <h5>Distance: {this.props.dis}</h5>
                <h4>Offer Product: {this.state.data.prod}</h4>
                <h4>Quantity: {this.state.data.amt}</h4>
                <h4>Desired Product: {this.state.data.wish}</h4>
                <h4>Quantity: {this.state.data.wish_amt}</h4>

                <h4>Contact Info:</h4>
                <h4>{this.state.data.user.email}</h4>

                <h5>Opining Status: {this.state.data.status}</h5>
                <h5>Reserved By: {this.state.data.reserved_by_user==undefined ? "None" : this.state.data.reserved_by_user.username}</h5>
                <br/>
                <h5>Last updated: {this.state.data.last_updated} </h5>
                <br/>
            </div>
        )
    }
}


export default Order;