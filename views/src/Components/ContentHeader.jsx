import React from 'react'

function ContentHeader(props) {
    return (
        <header className="content--header">
            <h1 className="content--header--title dot-path"><span>Pictures</span><span className="dot dot-large"></span><span>{ props.label }</span></h1>
        </header>
    )
}

export default ContentHeader
