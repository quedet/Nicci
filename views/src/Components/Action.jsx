import React from 'react'
import "./Action.scss"

function Action(props) {
    return (
        <div className='action--overlay'>
            <div className="action--overlay--wrapper">
                <ul>
                    <li onClick={props.delete}>Delete</li>
                    <li onClick={props.update}>Update</li>
                    <li onClick={props.close}>Close</li>
                </ul>
            </div>
        </div>
    )
}

export default Action
