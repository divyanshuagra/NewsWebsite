import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
    }


    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d332c1c1afdc40a0b47c2823f291f53e&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        let parsedData = await data.json()

        this.setState({
            articles: parsedData.articles,  //parsedData.articles
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    //called after render function everytime
    async componentDidMount() {
        this.updateNews()
    }

    //prev and next button not required after infinite scrolling
    // handlePrevious = async () => {

    //     this.setState({ page: this.state.page - 1 })
    //     this.updateNews()

    // }

    // handleNext = async () => {

    //     this.setState({ page: this.state.page + 1 })
    //     this.updateNews()

    // }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d332c1c1afdc40a0b47c2823f291f53e&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        let parsedData = await data.json()

        this.setState({
            articles: this.state.articles.concat(parsedData.articles),  //parsedData.articles
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    render() {

        return (
            <>
                <h1 className="text-center">NewsMonkey- Top Headlines Of The Day</h1>
                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="row">
                        {/*!this.state.loading && //commented for infinite scrolling//*/ this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 80) : ""}
                                    imageUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : "Unknown"}
                                    date={element.publishedAt} />
                            </div>
                        })}

                    </div>
                </InfiniteScroll>

                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevious}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
                </div> */}
            </>
        )
    }
}

export default News
