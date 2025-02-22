import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signupServerAPI } from './signupServerAPI'
import './signup.css'

export default function Signup() {
    const [err, setErr] = useState("")

    const navigate = useNavigate()

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value
        })
    }

    const handleSignupSubmit = async(e) => {
        e.preventDefault()

        const apiData = await signupServerAPI(signupData)
        if (apiData.status===200) {
            navigate('/login')
        } else {
            setErr(apiData.error)
        }
    }

    return (
        <div className='signup'>
            <div className='signup-mainpage'>
                <form action="" className='signup-form' onSubmit={handleSignupSubmit}>
                    {
                        (err)? <span className='signup-error'>{ err }</span>:<></>
                    }
                    <label htmlFor="username">Username</label>
                    <input type="text" name='username' id='username' value={signupData.username} onChange={handleChange} required />
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' id='email' value={signupData.email} onChange={handleChange} required />
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' id='password' value={signupData.password} onChange={handleChange} required />
                    <div className='signup-form-instructions'>
                        <li>Should contain atleast one Capital Alphabet[A-Z]</li>
                        <li>Should contain atleast one number[0-9]</li>
                        <li>Should contain atleast one special character</li>
                        <li>Should have more than 6 characters</li>
                    </div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name='confirmPassword' id='confirmPassword' value={signupData.confirmPassword} onChange={handleChange} required />
                    <button type='submit'>Submit</button>
                    <Link to="/login">Already have an account?</Link>
                </form>
            </div>
        </div>
    )
}
