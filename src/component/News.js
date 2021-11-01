import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
    const [articles, setarticles] = useState([])
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)
    const [totalResults, settotalResults] = useState(0)



    const updateNews = async () => {
        props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a1a20f6d552c48c2911fe46ec665d9b9&page=${page}&pageSize=${props.pageSize}`
        setloading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
        props.setProgress(30);
        setarticles(parsedData.articles)
        settotalResults(parsedData.totalResults)
        props.setProgress(70)
        setloading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${props.category}- MorbiusJournal`;

        updateNews();

    }, [])



    const fetchMoreData = async () => {

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a1a20f6d552c48c2911fe46ec665d9b9&page=${page + 1}&pageSize=${props.pageSize}`
        setpage(page + 1)
        setloading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
        setarticles(articles.concat(parsedData.articles))
        settotalResults(parsedData.totalResults)
    };



    return (
        <div className="container my-3">
            <div className="container my-3">
                <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>MorbiusJournal - Top {props.category} Headlines</h1>
                {loading}


                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4 bg-dark" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                            </div>
                        })}

                    </div>
                </InfiniteScroll>

            </div>
        </div>
    )

}
News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
}

export default News
