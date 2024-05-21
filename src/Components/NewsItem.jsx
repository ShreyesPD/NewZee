import React from 'react'
import NewZeeLogo from '../Resources/images/newzee.jpeg'

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, time, source } = props;
    return (
        <div>
            < div className="card">
                <span className="badge text-bg-info">{source}</span>
                <img src={imageUrl ? imageUrl : NewZeeLogo} className="card-img" alt=" not found " />
                <div className="card-body">
                    <h5 className="card-title">{(title) ? title : " NewZee "}...{(new Date().getDate() === new Date(time).getDate()) && ((new Date().getHours() - new Date(time).getHours()) <= 1) ? <span className="badge text-bg-danger">Latest</span> : ""}</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(time).toDateString()} / {new Date(time).toLocaleTimeString()}</small></p>
                    <a href={newsUrl} className="btn btn-sm btn-dark" target='_blank' rel='noreferrer'>Read More</a>
                </div>
            </div >
        </div >
    )
}

export default NewsItem