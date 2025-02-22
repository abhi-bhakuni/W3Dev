import { useState } from 'react'
import { dashboardServerAPI } from './dashboardServerAPI'
import './dashboard.css'

export default function Dashboard() {
    const [article, setArticle] = useState("")
    const [category, setCategory] = useState("Sports")
    const [subCategory, setsubCategory] = useState("Football")

    const handleChange1 = (e) => {
        setArticle(e.target.value)
    }

    const handleChange2 = (e) => {
        setCategory(e.target.value)
    }

    const handleChange3 = (e) => {
        setsubCategory(e.target.value)
    }

    const handleArticleSearch = (e) => {
        e.preventDefault()
    }

    const handleSearch = async(e) => {
        e.preventDefault()

        const data = await dashboardServerAPI(subCategory + " Articles")
        console.log(data)
    }

    return (
        <div className='dashboard'>
            <nav className='dashboard-navbar'>
                <span className='dashboard-nav-logo'>
                    ARTICLE ZONE
                </span>
                <span className='dashboard-nav'>
                    <span className='dashboard-nav-searchbar'>
                        <i className="fa-solid fa-magnifying-glass dashboard-nav-searchlogo" onClick={handleArticleSearch}></i>
                        <input type="text" placeholder='Search "Articles"' value={article} onChange={handleChange1} className='dashboard-nav-search' />
                    </span>
                    <i className="fa-solid fa-user dashboard-nav-profile"></i>
                </span>
            </nav>
            <main className='dashboard-mainpage'>
                <aside className='dashboard-mainpage-sidebar'>
                    <h2 className='dashboard-mainpage-sidebar-heading'>Categories</h2>
                    <ul className='dashboard-mainpage-sidebar-categories'>
                        <li className='sidebar-category' value={category} onChange={handleChange2} onClick={handleSearch}>Sports</li>
                        <li className='sidebar-category' value={category} onChange={handleChange2} onClick={handleSearch}>Animes</li>
                        <li className='sidebar-category' value={category} onChange={handleChange2} onClick={handleSearch}>Entertainment</li>
                        <li className='sidebar-category' value={category} onChange={handleChange2} onClick={handleSearch}>Weather</li>
                        <li className='sidebar-category' value={category} onChange={handleChange2} onClick={handleSearch}>Real Estate</li>
                    </ul>
                </aside>
                <main className='dashboard-mainpage-articlepage'>
                    <nav className='dashboard-mainpage-articlepage-navbar'>
                        <li className='articlepage-nav' value={subCategory} onChange={handleChange3} onClick={handleSearch}>Football</li>
                        <li className='articlepage-nav' value={subCategory} onChange={handleChange3} onClick={handleSearch}>Cricket</li>
                    </nav>
                    <article className='dashboard-mainpage-articlepage-articles'>
                        Hello World
                    </article>
                </main>
            </main>
        </div>
    )
}
