import React, { useContext, useEffect, useState } from 'react'
import ContentHeader from '../../Components/ContentHeader'
import {useNavigate, useParams} from 'react-router-dom'
import Spinner from '../../Components/Spinner'
import Form from '../../Components/Form'
import { UserContext } from '../../Context/UserContext'

function UpdatePage() {
    const [image, setImage] = useState(null)
    const [imageBlob, setImageBlob] = useState("")
    const [description, setDescription] = useState("")
    const [sendLoading, setSendLoading] = useState(false)
    const [currentPost, setCurrentPost] = useState({})

    const {id} = useParams()
    const navigate = useNavigate()

    const { user } = useContext(UserContext)

    const handleSubmit = async (evt) => {
        evt.preventDefault()

        setSendLoading(true)

        const formData = new FormData()
        formData.append('data', JSON.stringify({ description , likes: 0, author: user.user }))
        formData.append('files.image', image)

        const response = await fetch(`http://localhost:1337/posts/${id}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${user.jwt}`
            },
            body: formData
        }).catch(err => {
            setSendLoading(false)
        })

        const data = await response.json()
        
        if (data) {
            setSendLoading(false)
            navigate("/")
        }
    }

    useEffect(() => {
        if (image && image.name) {
            setImageBlob(URL.createObjectURL(image))
        }

        const fetchData = async () => {
            const response = await fetch(`http://localhost:1337/posts/${id}`)
            const data = await response.json()

            setCurrentPost({...data})
            setDescription(data.description)
        }

        fetchData()

        if (user && currentPost.author) {
            if (currentPost.author.email !== user.user.email) {
                navigate("/")
            }
        } else {
            navigate("/login")
        }
    }, [image, id, navigate, user, currentPost])

    return (
        <div className='update'>
            <div className="update--wrapper">
                <ContentHeader label={"Update"} />
                {sendLoading && (
                    <section className='overlay'>
                        <Spinner />
                    </section>
                )}
                <Form image={image} imageBlob={imageBlob} description={description} setDescription={setDescription} currentPost={currentPost} handleSubmit={handleSubmit} setImage={setImage} />
            </div>
        </div>
    )
}

export default UpdatePage
