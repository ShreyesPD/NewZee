import React, { Component } from 'react'
import loading from '../Resources/gif/loading.gif'

export class Spinner extends Component {
    render() {
        return (
            <div className='text-center'>
                <img className='my-3' src={loading} alt='loading...' width='35' height='35' />
            </div>
        )
    }
}

export default Spinner