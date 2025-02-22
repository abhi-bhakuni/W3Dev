import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginServerAPI } from './loginServerAPI'
import './login.css'

export default function Login() {
    const [err, setErr] = useState("")

    const navigate = useNavigate()

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    const handleLoginSubmit = async(e) => {
        e.preventDefault()

        const apiData = await loginServerAPI(loginData)
        if (apiData.status===200) {
            navigate('/dashboard')
        } else {
            setErr(apiData.error)
        }
    }

    return (
        <div className='login'>
            <div className='login-mainpage'>
                <form action="" className='login-form' onSubmit={handleLoginSubmit}>
                    {
                        (err)? <span className='login-error'>{ err }</span>:<></>
                    }
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' id='email' value={loginData.email} onChange={handleChange} />
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' id='password' value={loginData.password} onChange={handleChange} />
                    <button type='submit'>Submit</button>
                    <Link to="/signup">New Account?</Link>
                </form>
            </div>
        </div>
    )
}
