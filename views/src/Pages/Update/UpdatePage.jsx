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
    const [error, setError] = useState('')

    const {id} = useParams()
    const { user } = useContext(UserContext)
    
    const navigate = useNavigate()

    const closeErrorPanel = () => {
        setError("")
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()

        setSendLoading(true)

        const formData = new FormData()
        formData.append('data', JSON.stringify({ description, author: user.user }))
        formData.append('files.image', image)

        try {
            const response = await fetch(`http://localhost:1337/posts/${id}`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${user.jwt}`
                },
                body: formData
            })

            const data = await response.json()
            
            if (data.id) {
                navigate("/")
            }

            if (data.error) {
                setError(data.message)
            }

            setSendLoading(false)
        } catch(err) {
            setError(err.message)
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
    }, [image, id, navigate, user])

    return (
        <div className='update'>
            <div className="update--wrapper">
                <ContentHeader label={"Update"} />
                {sendLoading && (
                    <section className='overlay'>
                        <Spinner />
                    </section>
                )}
                <Form 
                    image={image} 
                    currentPost={currentPost}
                    imageBlob={imageBlob} 
                    description={description} 
                    setDescription={setDescription} 
                    handleSubmit={handleSubmit} 
                    setImage={setImage} 
                    error={error} 
                    closeErrorPanel={closeErrorPanel} 
                    setError={setError} 
                />
            </div>
        </div>
    )
}

export default UpdatePage
