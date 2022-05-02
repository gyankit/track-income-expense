import React from 'react'

function List(props) {
    return (
        <div className={props.type ? 'list list-green' : 'list list-red'}>
            <div className='list-display'>
                <div className='list-column'>
                    <strong>{new Date(props.data.dateTime).toLocaleDateString('en-GB')}</strong>
                    <span>{new Date(props.data.dateTime).toLocaleTimeString()}</span>
                </div>
                <div className='list-column'>
                    <strong>{props.data.category}</strong>
                    <span>{props.data.comment}</span>
                </div>
                <div className='list-column'>
                    <strong>Rs. {props.data.amount}</strong>
                </div>
            </div>
        </div>
    )
}

export default List