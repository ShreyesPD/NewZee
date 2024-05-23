import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'


const NavBar = () => {

    const [searchText, setSearchText] = useState("")
    const navigate = useNavigate()

    const onChangeHandler = (event) => {
        setSearchText(event.target.value)
    }

    const searchResults = (event) => {
        event.preventDefault();
        console.log(`navbar ${searchText}`)
        navigate('/search', { state: { keyWord: searchText }, replace: true });
    }

    return (
        <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">NewZee</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><NavLink className="nav-link" to="/general">General</NavLink></li>
                        {/* <li className="nav-item"><a className="nav-link" href="/">About</a></li> */}
                        <li className="nav-item"><NavLink className="nav-link" to="/business">Business</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/entertainment">Entertainment</NavLink></li>
                        {/* <li className="nav-item"><NavLink className="nav-link" to="/general">General</NavLink></li> */}
                        <li className="nav-item"><NavLink className="nav-link" to="/health">Health</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/science">Science</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/sports">Sports</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/technology">Technology</NavLink></li>
                    </ul>
                </div>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" id='search' defaultValue={searchText} onChange={onChangeHandler} type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type='submit' onClick={searchResults}>Search</button>
                </form>
            </div>
        </nav>
    )
}

export default NavBar