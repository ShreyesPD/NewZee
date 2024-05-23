import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from 'react-router-dom';


const Search = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalArticles, setTotalArticles] = useState(0)
    // const [keyWord, setKeyWord] = useState("")

    const location = useLocation();
    const keyWord = location.state.keyWord
    // setKeyWord(keyWordd)
    console.log("search" + keyWord)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        // const location = useLocation();
        // setKeyWord(location.state.keyWord)
        window.scrollTo({ top: 0, left: 0, behaviour: 'smooth' });
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&q=${keyWord}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log("search updatenews")
        console.log(parsedData)
        setArticles(parsedData.articles)
        setTotalArticles(parsedData.totalResults)
        setLoading(false)
    }

    useEffect(() => {
        document.title = `NewZee | ${capitalizeFirstLetter(props.keyWord)}`
        setPage(1)
        updateNews()
        // eslint-disable-next-line
    }, [keyWord])

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&q=${keyWord}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        setPage(page + 1)
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log("search fetchdata" + parsedData)
        setArticles(articles.concat(parsedData.articles))
        setTotalArticles(parsedData.totalArticles)
    }

    return (
        < div className='container my-3' >
            <div id="scrollableDiv" style={{ height: 450, overflow: "auto", marginTop: '90px' }}>
                <h1 className='text-center'> NewZee - Top Headlines | {capitalizeFirstLetter(props.keyWord)} </h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length <= totalArticles}
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
        </div >
    )
}

export default Search