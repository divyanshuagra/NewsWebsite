import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {

    const [articles, setarticles] = useState([])
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)
    const [totalResults, settotalResults] = useState(0)


    const updateNews = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        setloading(true)
        let data = await fetch(url)
        let parsedData = await data.json()

        setarticles(parsedData.articles)
        settotalResults(parsedData.totalResults)
        setloading(false)
    }

    useEffect(() => {
        updateNews()
    }, [])


    const fetchMoreData = async () => {

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d332c1c1afdc40a0b47c2823f291f53e&page=${page + 1}&pageSize=${props.pageSize}`
        setpage(page + 1)
        setloading(true)
        let data = await fetch(url)
        let parsedData = await data.json()

        setarticles(articles.concat(parsedData.articles))  //parsedData.articles
        settotalResults(parsedData.totalResults)
    }

    return (
        <>
            <h1 className="text-center">NewsMonkey- Top {props.category.toUpperCase()} Headlines Of The Day</h1>
            {/* {loading && <Spinner />} */}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {/*!loading && //commented for infinite scrolling//*/ articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 80) : ""}
                                    imageUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : "Unknown"}
                                    date={element.publishedAt} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>

            {/* <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevious}>&larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNext}>Next &rarr;</button>
                </div> */}
        </>
    )

}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
