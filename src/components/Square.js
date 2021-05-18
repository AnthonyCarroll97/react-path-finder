import React from 'react'

export default function Square(props) {
    return (
        <button onClick={props.onClick} value={props.i} className={props.className}>
            {props.x}
            {props.i}
        </button>
    )
}
