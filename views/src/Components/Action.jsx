import React from 'react'
import { Link } from 'react-router-dom'
import "./Action.scss"

function Action(props) {
    return (
        <div className='action--overlay'>
            <div className="action--overlay--wrapper">
                { props.user && (
                    <ul>
                        {props.owner && (
                            <>
                                <li onClick={props.delete}>Delete</li>
                                <li onClick={props.update}>Update</li>
                            </>
                        )}
                        <li onClick={props.close}>Close</li>
                    </ul>
                )}
                {!props.user && (
                    <ul className='action--overlay--warning'>
                        <li className='action--overlay--warning--icon'><i className="bi bi-exclamation-triangle"></i></li>
                        <li><Link to="/login" className='action--overlay--warning--link'>Login before perfom an action</Link></li>
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Action
