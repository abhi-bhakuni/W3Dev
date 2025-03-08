import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './profile.css'

export default function Profile() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("abhi-bhakuni")
    const [password, setPassword] = useState("xyz")
    const [usernameClick, setUsernameClick] = useState(true)
    const [passwordClick, setPasswordClick] = useState(true)

    const handleNavigate = () => {
        navigate('/dashboard')
    }

    return (
        <div className='profile'>
            <nav className='profile-navbar'>
                <span className='profile-navbar-navigate' onClick={handleNavigate}>
                    <i className="fa-solid fa-angles-left"></i>
                    <p>Go back to Dashboard</p>
                </span>
            </nav>
            <div className='profile-form'>
                <span className='profile-form-image'>
                    <i className="fa-solid fa-user profile-form-photo"></i>
                </span>
                <span className='profile-form-vertical'></span>
                <span className='profile-form-details'>
                    <div>
                        <h4>Username</h4>
                        {usernameClick ? (
                            <span>
                                <p>{username}</p>
                                <button onClick={() => setUsernameClick(!usernameClick)}>Change Username</button>
                            </span>
                        ) : (
                            <span>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                                <button onClick={() => setUsernameClick(!usernameClick)}>Set Username</button>
                            </span>
                        )}
                    </div>
                    <div>
                        <h4>Email</h4>
                        <span>
                            <p>abhishek.bhakuni189@gmail.com</p>
                        </span>
                    </div>
                    <div>
                        <h4>Password</h4>
                        {passwordClick ? (
                            <span>
                                <p>{password}</p>
                                <button onClick={() => setPasswordClick(!passwordClick)}>Change Password</button>
                            </span>
                        ) : (
                            <span>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <button onClick={() => setPasswordClick(!passwordClick)}>Set Password</button>
                            </span>
                        )}
                    </div>
                </span>
            </div>
        </div>
    )
}
