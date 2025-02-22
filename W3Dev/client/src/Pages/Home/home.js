import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './home.css'

export default function Home() {
    const [content, setContent] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            setContent(val => !val)
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className='home'>
            <nav className='home-navbar'>
                <div>
                    <ul className='home-navbar-list'>
                        <li className='home-navbar-list-content'>
                            <Link to="/">Home</Link>
                        </li>
                        <li className='home-navbar-list-content'>
                            <Link to="/signup">Login/Signup</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <main className='home-mainpage'>
                <div className='home-mainpage-content'>
                    <h1>Search @Latest "Articles"</h1>
                    {
                        (content)? <p className='home-mainpage-content-para'>Different categories and topics.</p> : <p className='home-mainpage-content-para'>Choose on your own.</p>
                    }
                </div>
            </main>
        </div>
    )
}
