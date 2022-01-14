import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../Components/Spinner'

function CreatePage() {
    const [image, setImage] = useState(null)
    const [imageBlob, setImageBlob] = useState("")
    const [description, setDescription] = useState("")
    const [sendLoading, setSendLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (evt) => {
        evt.preventDefault()

        setSendLoading(true)

        const formData = new FormData()
        formData.append('data', JSON.stringify({ description, likes: 0 }))
        formData.append('files.image', image)

        const response = await fetch("http://localhost:1337/posts", {
            method: 'POST',
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
    }, [image])

    return (
        <div className='create'>
            <div className="create--wrapper">
                <header className="create--header">
                    <h1 className="create--header--title dot-path"><span>Pictures</span><span className="dot dot-large"></span><span>Create</span></h1>
                </header>
                {sendLoading && (
                    <section className='overlay'>
                        <Spinner />
                    </section>
                )}
                <form action="" method="post" className='create-form' onSubmit={handleSubmit}>
                    <div className="create-form--wrapper">
                        <div className="file">
                            <div className="form-item form-item-file">
                                <label htmlFor="image" className='form-item-file-label'><span className="form-item-file-label-icon"><i className='bi bi-upload'></i></span></label>
                                <input type="file" name='image' id="image" onChange={(evt) => { setImage(evt.target.files[0])}} className='form-item-file-input'/>
                                <span>Upload</span>
                            </div>
                            { image && (
                                <div className='form-item form-item-file-overview'>
                                    <figure>
                                        <img src={imageBlob} alt={imageBlob} />
                                    </figure>
                                </div>
                            )}

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

export default CreatePage
