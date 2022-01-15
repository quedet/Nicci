import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ContentHeader from '../../Components/ContentHeader'
import Spinner from '../../Components/Spinner'
import { UserContext } from '../../Context/UserContext'

function Signup () {
    const { user, setUser } = useContext(UserContext)
    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })
    const [error, setError] = useState("")
    const [sendLoading, setSendLoading] = useState(false)
    const navigate = useNavigate()

    const closeErrorPanel = () => {
        setError("")
    }

    const handleChange = (evt) => {
        setCredentials(state => ({
            ...state,
            [evt.target.name]: evt.target.value
        }))
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()

        setSendLoading(true)

        if (credentials.password === credentials.passwordConfirm) {
            try {
                const response = await fetch('http://localhost:1337/auth/local/register', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: credentials.username,
                        email: credentials.email,
                        password: credentials.password
                    })
                })

                const data = await response.json()

                if (data.message) {
                    setSendLoading(false)
                    setError(data.message[0].messages[0].message)

                    return // Stop execution
                }

                if (data.jwt) {
                    setUser(data)
                    setSendLoading(false)
                    navigate("/")
                }
            } catch (err) {
                setSendLoading(false)
                setError("Something went wrong", err)
            }
        } else {
            setSendLoading(false)
            setError("Confirmation password should be the same as password")
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user, navigate])

    return (
        <div className='signup'>
            <div className="signup--wrapper">
                <ContentHeader label="Sign Up" />
            </div>
            {sendLoading && (
                <section className='overlay'>
                    <Spinner />
                </section>
            )}
            <form action="" method="post" onSubmit={handleSubmit}>
                <div className="login--form--wrapper">
                    { error && (
                        <div className="login--form-item login--form-item--error">
                            <p><span>{ error }</span><span onClick={closeErrorPanel}><i className="bi bi-x-square"></i></span></p>
                        </div>
                    )}
                    <div className="login--form-item">
                        <label htmlFor="username" className="login--form--item--label">Username</label>
                        <input type="username" name="username" id="username" className="login--form--item--control" placeholder='username' onChange={handleChange} value={credentials.username} />
                    </div>
                    <div className="login--form-item">
                        <label htmlFor="email" className="login--form--item--label">Email</label>
                        <input type="email" name="email" id="email" className="login--form--item--control" placeholder='Email' onChange={handleChange} value={credentials.email} />
                    </div>
                    <div className="login--form-item">
                        <label htmlFor="password" className="login--form--item--label">Password</label>
                        <input type="password" name="password" id="password" className="login--form--item--control" placeholder='Password' onChange={handleChange} value={credentials.password} />
                    </div>
                    <div className="login--form-item">
                        <label htmlFor="passwordConfirm" className="login--form--item--label">Confirm your Password</label>
                        <input type="password" name="passwordConfirm" id="passwordConfirm" className="login--form--item--control" placeholder='Password Confirmation' onChange={handleChange} value={credentials.passwordConfirm} />
                    </div>
                    <div className="login--form-item">
                        <input type="submit" value="Sign Up" className="login--form--item--control login--form--item--submit" />
                    </div>
                    <div className="login--form-item">
                        <p><span>Already have an account ? </span><span><Link to="/login" className='login--form--item--link'>Log in here</Link></span></p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signup
