import React, { Component } from 'react';
import firebase from "../../firebase";

class Uploadimage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({ image }));
        }
    }

    handleUpload = () => {
        const { image } = this.state;
        const uploadTask = firebase.storage.ref(`prod/${image.name}`).put(image);
        uploadTask.on('state_changed',
            (snapshot) => {
                // progrss function ....
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({ progress });
            },
            (error) => {
                // error function ....
                console.log(error);
            },
            () => {
                // complete function ....
                firebase.storage.ref('prod').child(image.name).getDownloadURL().then(url => {
                    console.log(url);
                    this.setState({ url });
                })
            });
    }

    render() {
        return (
            <div>
                <progress value={this.state.progress} max="100" />
                <br />
                <input type="file" onChange={this.handleChange} />
                <button onClick={this.handleUpload}>Upload</button>
                <br />
                <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" />
            </div>
        );
    }
}

export default Uploadimage