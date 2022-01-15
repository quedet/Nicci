import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ContentHeader from '../../Components/ContentHeader'
import Form from '../../Components/Form'
import Spinner from '../../Components/Spinner'
import { UserContext } from '../../Context/UserContext'

function CreatePage() {
    const [image, setImage] = useState(null)
    const [imageBlob, setImageBlob] = useState("")
    const [description, setDescription] = useState("")
    const [sendLoading, setSendLoading] = useState(false)

    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const handleSubmit = async (evt) => {
        evt.preventDefault()

        setSendLoading(true)

        const formData = new FormData()
        formData.append('data', JSON.stringify({ description, likes: 0, author: user.user }))
        formData.append('files.image', image)

        const response = await fetch("http://localhost:1337/posts", {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${user.jwt}`
            },
            body: formData
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

        if (!user) {
            navigate("/login")
        }
    }, [image, navigate, user])

    return (
        <div className='create'>
            <div className="create--wrapper">
                <ContentHeader label={"Create"} />
                {sendLoading && (
                    <section className='overlay'>
                        <Spinner />
                    </section>
                )}
                <Form image={image} imageBlob={imageBlob} description={description} setDescription={setDescription} handleSubmit={handleSubmit} setImage={setImage} />
            </div>
        </div>
    )
}

export default CreatePage
