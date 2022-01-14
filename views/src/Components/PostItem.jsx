import React from 'react'
import "./PostItem.scss"

function PostItem (props) {
    return (
        <article className='post-item'>
            <header className="post-item--header">
                <div className="post-item--header--wrapper">
                    <h3 className='post-item--header--title'><span className='post-item--header--title--icon'><i class="bi bi-person-circle"></i></span><span>{props.author ? props.author.username : "Anonym"}</span></h3>
                    <span className='post-item--header--extra'><i class="bi bi-three-dots-vertical"></i></span>
                </div>
            </header>
            <figure className="post-item--media">
                <img src={"http://localhost:1337" + props.image?.formats.small.url} alt={props.image ? props.image.name : ""} className="post-item--media--image" />
            </figure>
            <div className="post-item--content">
                <div className="post-item--content--wrapper">
                    <p>
                        <span className="post-item--header--title">{props.author ? props.author.username : "Anonym"}</span>
                        <span className='dot'></span>
                        <span>{props.description || "..."}</span>
                    </p>
                </div>
            </div>
            <footer className="post-item--footer">
                <div className="post-item--footer--wrapper">
                    <p className='dot-path'>
                        <span>{props.likes}</span> <span className="dot"></span> <span>{props.likes > 1 ? "likes" : "like" }</span> 
                    </p>
                </div>
            </footer>
        </article>
    )
}

export default PostItem
