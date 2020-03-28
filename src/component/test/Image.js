import React, { Component } from 'react';
import firebase from "../../firebase";

class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: null
        }
        this.getImage = this.getImage.bind(this);
    }

    componentDidMount() {
        this.getImage('8.jpg')
    }

    async getImage(image) {
        const url = await firebase.getImage(image)
        this.setState({ img: url });
    }

    render() {
        return (
            <img src={this.state.img}></img>
        )
    }
}

export default Image;