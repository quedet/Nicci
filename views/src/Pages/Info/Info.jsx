import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ContentHeader from '../../Components/ContentHeader'
import PostItem from '../../Components/PostItem'

function Info () {
    const [Post, setPost] = useState({})
    const { id } = useParams()

    useEffect(() => {
        const getSinglePost = async () => {
            const response = await fetch(`http://localhost:1337/posts/${id}`)

            const data = await response.json()

            setPost({...data})
        }

        getSinglePost()
    }, [id])

    return (
        <div className='info'>
            <div className="info--wrapper">
                <ContentHeader label={"Details"} />
                <div className="info--content">
                    <PostItem id={Post.id} image={Post.image} description={Post.description} author={Post.author} likes={Post.likes} />
                </div>
            </div>
        </div>
    )
}

export default Info
