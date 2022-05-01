import React from 'react'

function List(props) {

    return (
        <div className={props.type ? 'list list-green' : 'list list-red'}>
            <div className='list-display'>
                <div className='list-column'>
                    <strong>{props.data.date}</strong>
                    <span>{props.data.time}</span>
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

List.defaultProps = {
    data: {
        date: new Date().toISOString(),
        time: new Date().toISOString(),
        category: undefined,
        comment: undefined,
        amount: 0
    },
    type: false
}

export default List