import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { dashboardServerAPI } from './dashboardServerAPI'
import './dashboard.css'

export default function Dashboard() {
    const navigate = useNavigate()

    const [article, setArticle] = useState("")
    const [category, setCategory] = useState(localStorage.getItem('category') || "")
    const [subCategory, setSubCategory] = useState(localStorage.getItem('subCategory') || "")
    const [categoryArr, setCategoryArr] = useState({
        "Sports": ["Football", "Cricket"],
        "Animes": ["Action", "Romance", "Scifi"],
        "Entertainment": ["Movies", "Music"],
        "Research": ["Medical", "Engineering"],
        "Business": ["Investment", "Entrepreneurship", "E-Commerce"]
    })
    const [articleData, setArticleData] = useState(JSON.parse(localStorage.getItem('articleData')) || [])
    const [sidebar, setSidebar] = useState(true)
    const [heading, setHeading] = useState(localStorage.getItem("heading") || "")

    useEffect(() => {
        localStorage.setItem('category', category)
        localStorage.setItem('subCategory', subCategory)
    }, [category, subCategory])

    useEffect(() => {
        localStorage.setItem('articleData', JSON.stringify(articleData))
    }, [articleData])

    useEffect(() => {
        localStorage.setItem('heading', heading)
    }, [heading])

    const handleChange = () => {
        const element = document.getElementById("dashboard-mainpage-articlepage-navbar");
        if (element) element.style.display = article ? "none" : "flex"
    }

    const handleArticleSearch = async () => {
        handleChange()

        try {
            setHeading(`Results for '${article}' Articles`)
            const data = await dashboardServerAPI(article + " Articles")
            setArticleData(data.article_data)
            setArticle("");
        } catch (e) {
            console.error(`Client Error on Dashboard JSX ${e}`)
            setArticleData([])
        }
    }

    const handleSearch = async (subCategory) => {
        try {
            setHeading(`Results for '${category}' + '${subCategory}' Articles`)
            const data = await dashboardServerAPI(category + " " + subCategory + " Articles")
            setArticleData(data.article_data)
        } catch (e) {
            console.error(`Client Error on Dashboard JSX ${e}`)
            setArticleData([])
        }
    }

    useEffect(() => {
        const element = document.getElementById("dashboard-mainpage-articlepage");
        if (element) element.style.paddingLeft = sidebar ? "310px" : "90px"
    }, [sidebar])

    const handleNavigate = () => {
        navigate('/profile')
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
                        <input type="text" placeholder='Search "Articles"' value={article} onChange={(e) => setArticle(e.target.value)} className='dashboard-nav-search' />
                    </span>
                    <i className="fa-solid fa-user dashboard-nav-profile" onClick={handleNavigate}></i>
                </span>
            </nav>
            <main className='dashboard-mainpage'>
                {sidebar ? (
                    <aside className='dashboard-mainpage-sidebar'>
                        <i className="fa-solid fa-xmark mainpage-sidebar-close" onClick={() => {
                            setSidebar(!sidebar);
                        }}></i>
                        <h2 className='dashboard-mainpage-sidebar-heading'>Categories</h2>
                        <ul className='dashboard-mainpage-sidebar-categories'>
                            {Object.keys(categoryArr).map((cat, index) => (
                                <li className='sidebar-category' onClick={() => {
                                    setCategory(cat);
                                    setSubCategory("");
                                    setArticleData([]);
                                    handleChange();
                                }} key={index}>{cat}</li>
                            ))}
                        </ul>
                    </aside>
                ) : (
                    <aside className='dashboard-mainpage-sidebar2'>
                        <i className="fa-solid fa-bars mainpage-sidebar-open" onClick={() => {
                            setSidebar(!sidebar);
                        }}></i>
                    </aside>
                )}
                <main className='dashboard-mainpage-articlepage' id='dashboard-mainpage-articlepage'>
                    <nav className='dashboard-mainpage-articlepage-navbar' id='dashboard-mainpage-articlepage-navbar'>
                        {
                            categoryArr[category]?.map((subCat, index) => (
                                <li className='articlepage-nav' onClick={() => {
                                    setSubCategory(subCat);
                                    handleSearch(subCat);
                                }} key={index}>{subCat}</li>
                            ))
                        }
                    </nav>
                    <article className='dashboard-mainpage-articlepage-articles'>
                        <h2>{heading}</h2>
                        {articleData.length > 0 ? (
                            articleData.map((article, index) => (
                                <div className='articlepage-articles' key={index}>
                                    <a href={article.link} target='_blank' rel='noopener noreferrer'>
                                        <h3 style={{ color: 'black' }}>{article.title}</h3>
                                        {article.link}
                                    </a>
                                    <p>{article.snippet}</p>
                                    <p>{article.date}</p>
                                </div>
                            ))
                        ) : (
                            <article>No Articles Available</article>
                        )}
                    </article>
                </main>
            </main>
        </div>
    )
}
