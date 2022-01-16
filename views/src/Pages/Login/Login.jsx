import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ContentHeader from '../../Components/ContentHeader'
import Spinner from '../../Components/Spinner'
import { UserContext } from '../../Context/UserContext'
import "./Login.scss"

function Login() {
    const { user, setUser } = useContext(UserContext)

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
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

        setError("")
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()

        setSendLoading(true)
        try {
            const response = await fetch('http://localhost:1337/auth/local', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ identifier: credentials.email, password: credentials.password })
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
        } catch(err) {
            setSendLoading(false)
            setError("Something went wrong " + err.message)
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/")
        }

        console.log(user);
    }, [navigate, user])

    return (
        <div className='login'>
            <div className="login--wrapper">
                <ContentHeader label="Login" />
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
                        <label htmlFor="email" className="login--form--item--label">Email</label>
                        <input type="email" name="email" id="email" className="login--form--item--control" placeholder='Email' onChange={handleChange} value={credentials.email} />
                    </div>
                    <div className="login--form-item">
                        <label htmlFor="password" className="login--form--item--label">Password</label>
                        <input type="password" name="password" id="password" className="login--form--item--control" placeholder='Password' onChange={handleChange} value={credentials.password} />
                    </div>
                    <div className="login--form-item">
                        <input type="submit" value="Login" className="login--form--item--control login--form--item--submit" />
                    </div>
                    <div className="login--form-item">
                        <p><span>You don't already have an account ? </span><span><Link to="/signup" className='login--form--item--link'>Sign Up here</Link></span></p>
                        <p><span><Link to="/auth/forgot-password" className='login--form--item--link'>Password Forgotten</Link></span></p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
