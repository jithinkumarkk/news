import React, { Component } from 'react'
import loading_gif from './loading.gif'

export class Spinner extends Component {
    render() {
        return (
            <div align="center">
                 <img className="loaders" src={loading_gif} alt="loading" />
            </div>
        )
    }
}

export default Spinner