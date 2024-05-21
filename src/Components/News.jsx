import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalArticles, setTotalArticles] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        window.scrollTo({ top: 0, left: 0, behaviour: 'smooth' });
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData)
        setArticles(parsedData.articles)
        setTotalArticles(parsedData.totalResults)
        setLoading(false)
    }

    useEffect(() => {
        document.title = `NewZee | ${capitalizeFirstLetter(props.category)}`
        updateNews()
        // eslint-disable-next-line
    }, [])

    // const handleNextClick = async () => {
    //     setPage(page + 1)
    //     updateNews()
    // }

    // const handlePrevClick = async () => {
    //     setPage(page - 1)
    //     updateNews()
    // }

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
        setPage(page + 1)
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData)
        setArticles(articles.concat(parsedData.articles))
        setTotalArticles(parsedData.totalArticles)
    }

    return (
        <div className='container my-3'>
            <div id="scrollableDiv" style={{ height: 450, overflow: "auto", marginTop: '90px' }}>
                <h1 className='text-center'> NewZee - Top Headlines | {capitalizeFirstLetter(props.category)} </h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalArticles}
                    loader={<Spinner />}
                    scrollableTarget="scrollableDiv">
                    <div className="container">
                        <div className="row">
                            {articles.map((element) => {
                                return (
                                    <div className="col-md-4 my-5" key={element.url}>
                                        <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : "unknown"} time={element.publishedAt ? element.publishedAt : "Unknown"} source={element.source.name} />
                                    </ div>
                                )
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>

            {/* <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
                    <p>Page {page} of {Math.ceil(totalArticles / props.pageSize)}</p>
                    <button disabled={page >= Math.ceil(totalArticles / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                </div> */}

        </div>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 6
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number
}


export default News



// {
//     if (nonVeg.everyday() && nonVeg.everything()) {
//         nonVeg.eat()
//     }
//     else {
//         veg.eat()
//     }
// }
