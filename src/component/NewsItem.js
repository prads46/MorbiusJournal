import React from 'react'

const NewsItem = (props) => {

    let { title, description, imageurl, newsUrl, author, date } = props;
    return (
        <div className="my-3 bg-dark mx-5">
            <div className="card">
                <img src={!imageurl ? "https://airandspace.si.edu/sites/default/files/images/7151h.jpg" : imageurl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted"> By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-block btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )

}

export default NewsItem
