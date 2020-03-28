import React, { Component } from 'react';
import $ from 'jquery';

import Order from './order'

class OrderList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            info: "fetching...",
            data: [],
            lat: 0,
            long: 0
        }
    }

    componentDidMount() {
        if ("geolocation" in navigator) {
            // check if geolocation is supported/enabled on current browser
            navigator.geolocation.getCurrentPosition(
                function success(position) {
                    // for when getting location is a success
                    console.log('latitude', position.coords.latitude,'longitude', position.coords.longitude);
                    this.setState({
                        lat: position.coords.latitude,
                        long: position.coords.longitude
                    });
                }.bind(this),
                function error(error_message) {
                    // for when getting location results in an error
                    console.error('An error has occured while retrievinglocation', error_message)
                }
            );
        } else {
            // geolocation is not supported
            // get your location some other way
            console.log('geolocation is not enabled on this browser')
        }
        $.ajax({
            url: 'http://localhost:3001/get_all_orders',
            type: 'GET',
            success: function (res) {
                // alert('complete!')
                console.log(res);
                this.setState({
                    info: "completed",
                    data: res
                })
            }.bind(this),
            error: function (e) {
                console.log(e);
            }
        });
    }

    render() {
        var compare = (o1, o2) => {
            let a = Math.sqrt(((this.state.lat - o1.user.location.coordinates[1]) * (this.state.lat - o1.user.location.coordinates[1])) + ((this.state.long - o1.user.location.coordinates[0]) * (this.state.long - o1.user.location.coordinates[0])));
            let b = Math.sqrt(((this.state.lat - o2.user.location.coordinates[1]) * (this.state.lat - o2.user.location.coordinates[1])) + ((this.state.long - o2.user.location.coordinates[0]) * (this.state.long - o2.user.location.coordinates[0])));
            if (a > b) return 1;
            if (b > a) return -1;
          
            return 0;
        };

        this.state.data.sort(compare);

        return (
            <div>
                <h1>Current Loaction:</h1>
                <h1>[{this.state.lat} , {this.state.long}]</h1>
                {this.state.data.map(order => <Order key={order._id} order={order} dis={Math.sqrt(((this.state.lat - order.user.location.coordinates[1]) * (this.state.lat - order.user.location.coordinates[1])) + ((this.state.long - order.user.location.coordinates[0]) * (this.state.long - order.user.location.coordinates[0])))}/>)}
            </div>
        )
    }
}

export default OrderList;