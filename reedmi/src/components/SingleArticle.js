import './SingleArticle.css';
function SingleArticle({singleNewsArticle}){
    console.log("Single News Article", singleNewsArticle)
    return (
        <div className = "singleArticle">
           
            <p id = "articleSource">`Source;` {singleNewsArticle.source.name}</p>
            <p id="articleAuthor">`Author;` {singleNewsArticle.author}</p>
            <p id="articleTitle">`Title;` {singleNewsArticle.title}</p>
            <img id="articleImage" src={singleNewsArticle.urlToImage} alt={singleNewsArticle.body} />
            <p id = "articleDescription"> {singleNewsArticle.description}</p>
            <a id = "articleLink" href ={singleNewsArticle.url} > Click here to view full article</a>
        </div>
    )
}

export default SingleArticle;