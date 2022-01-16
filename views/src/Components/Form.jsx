import React from 'react'
import "./Form.scss"

function Form (props) {
    return (
        <form action="" method="post" className='create-form' onSubmit={props.handleSubmit}>
            <div className="create-form--wrapper">
                { props.error && (
                    <div className="login--form-item login--form-item--error">
                        <p><span>{ props.error }</span><span onClick={props.closeErrorPanel}><i className="bi bi-x-square"></i></span></p>
                    </div>
                )}
                <div className="file">
                    <div className="form-item form-item-file">
                        <div className="__inner">
                            <label htmlFor="image" className='form-item-file-label'><span className="form-item-file-label-icon"><i className='bi bi-upload'></i></span></label>
                            <input type="file" name='image' id="image" onChange={(evt) => { props.setImage(evt.target.files[0]); props.setError("")}} className='form-item-file-input'/>
                            <span>Update</span>
                        </div>
                    </div>
                    <div className='form-item form-item-file-overview'>
                        <figure>
                            {props.image && (<img src={props.imageBlob} alt={props.imageBlob} />)}
                            {props.currentPost.image && (<img src={`http://localhost:1337${props.currentPost.image.url}`} alt={""} />)}
                        </figure>
                    </div>
                </div>
                <div className="form-item form-item-description">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name='description' id="description" onChange={(evt) => { props.setDescription(evt.target.value); props.setError("")}} value={props.description} rows="10" />
                </div>
                <div className="form-item">
                    <button type="submit" className='form-item-submit'><span><i className="bi bi-box-arrow-down"></i></span>  <span>Save</span></button>
                </div>
            </div>
        </form>
    )
}

export default Form
