import React, { Component } from 'react';

class addOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handlesubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <h2>Place Order</h2>
                <form onSubmit={e => this.handlesubmit(e)}>

                </form>
            </div>

        )
    }
}