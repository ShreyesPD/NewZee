import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 6
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalArticles: 0
        }

        document.title = `NewZee | ${this.capitalizeFirstLetter(this.props.category)}`
    }

    async updateNews() {
        window.scrollTo({ top: 0, left: 0, behaviour: 'smooth' });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({
            articles: parsedData.articles,
            totalArticles: parsedData.totalResults,
            loading: false
        })
    }

    async componentDidMount() {
        this.updateNews()
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 })
        this.updateNews()
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page + 1 })
        this.updateNews()
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        // this.updateNews()
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalArticles: parsedData.totalResults,
            loading: false
        })

    }

    render() {
        return (
            <div className='container my-3'>
                {/* {this.state.loading && <Spinner />} */}
                <div id="scrollableDiv" style={{ height: 450, overflow: "auto" }}>
                    <h1 className='text-center'> NewZee - Top Headlines | {this.capitalizeFirstLetter(this.props.category)} </h1>
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalArticles}
                        loader={<Spinner />}
                        scrollableTarget="scrollableDiv">
                        <div className="container">
                            <div className="row">
                                {this.state.articles.map((element) => {
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
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <p>Page {this.state.page} of {Math.ceil(this.state.totalArticles / this.props.pageSize)}</p>
                    <button disabled={this.state.page >= Math.ceil(this.state.totalArticles / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}

            </div>
        )
    }
}

export default News