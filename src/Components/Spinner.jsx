import React from 'react'
import loading from '../Resources/gif/loading.gif'

const Spinner = () => {
    return (
        <div className='text-center'>
            <img className='my-3' src={loading} alt='loading...' width='35' height='35' />
        </div>
    )
}

export default Spinner