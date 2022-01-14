import React, { useState } from 'react'
import "./PostItem.scss"
import { Link, useNavigate } from 'react-router-dom'
import Action from './Action'

function PostItem (props) {
    const [isActivate, setActivation] = useState(false)
    const navigate = useNavigate()

    const OpenOverlay = () => {
        setActivation(true)
    }

    const CloseOverlay = () => {
        setActivation(false)
    }

    const DeletePost = async () => {
        const response = await fetch(`http://localhost:1337/posts/${props.id}`, {
            method: 'DELETE'
        })

        const data = await response.json()

        if (data) {
            navigate('/')
        } else {
            window.alert("Cant delete thsi post")
        }
    }

    const UpdateLink = () => {
        navigate(`/details/${props.id}/update`)
    }

    return (
        <article className='post-item'>
            <header className="post-item--header">
                <div className="post-item--header--wrapper">
                    <h3 className='post-item--header--title'><span className='post-item--header--title--icon'><i className="bi bi-person-circle"></i></span><span>{props.author ? props.author.username : "Anonym"}</span></h3>
                    <span className='post-item--header--extra' onClick={OpenOverlay}><i className="bi bi-three-dots-vertical"></i></span>
                </div>
            </header>
            <figure className="post-item--media">
                <Link to={"/details/" + props.id}>
                    <img src={"http://localhost:1337" + props.image?.formats.small.url} alt={props.image ? props.image.name : ""} className="post-item--media--image" />
                </Link>
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
            {isActivate && (<Action close={CloseOverlay} delete={DeletePost} update={UpdateLink} />)}
        </article>
    )
}

export default PostItem
