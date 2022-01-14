import React, { useEffect, useState } from 'react'
import ContentHeader from '../../Components/ContentHeader'
import {useNavigate, useParams} from 'react-router-dom'
import "./UpdatePage.scss"
import Spinner from '../../Components/Spinner'

function UpdatePage() {
    const [image, setImage] = useState(null)
    const [imageBlob, setImageBlob] = useState("")
    const [description, setDescription] = useState("")
    const [sendLoading, setSendLoading] = useState(false)
    const [currentPost, setCurrentPost] = useState({})

    const {id} = useParams()
    const navigate = useNavigate()

    const handleSubmit = async (evt) => {
        evt.preventDefault()

        setSendLoading(true)

        const formData = new FormData()
        formData.append('data', JSON.stringify({ description , likes: 0 }))
        formData.append('files.image', image)

        const response = await fetch(`http://localhost:1337/posts/${id}`, {
            method: 'PUT',
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
    }, [image, id])

    return (
        <div className='update'>
            <div className="update--wrapper">
                <ContentHeader label={"Update"} />
                {sendLoading && (
                    <section className='overlay'>
                        <Spinner />
                    </section>
                )}
                <form action="" method="post" className='create-form' onSubmit={handleSubmit}>
                    <div className="create-form--wrapper">
                        <div className="file">
                            <div className="form-item form-item-file">
                                <div className="__inner">
                                    <label htmlFor="image" className='form-item-file-label'><span className="form-item-file-label-icon"><i className='bi bi-upload'></i></span></label>
                                    <input type="file" name='image' id="image" onChange={(evt) => { setImage(evt.target.files[0])}} className='form-item-file-input'/>
                                    <span>Update</span>
                                </div>
                            </div>
                            <div className='form-item form-item-file-overview'>
                                <figure>
                                    <img src={image ? imageBlob : `http://localhost:1337${currentPost.image?.url}`} alt={image ? imageBlob: ""} />
                                </figure>
                            </div>
                        </div>
                        <div className="form-item form-item-description">
                            <label htmlFor="description">Description</label>
                            <textarea type="text" name='description' id="description" onChange={(evt) => { setDescription(evt.target.value)}} value={description} rows="10"  placeholder="" />
                        </div>
                        <div className="form-item">
                            <button type="submit" className='form-item-submit'><span><i className="bi bi-box-arrow-down"></i></span>  <span>Save</span></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdatePage
