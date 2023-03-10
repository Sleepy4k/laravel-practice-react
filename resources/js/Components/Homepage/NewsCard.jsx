const NewsCard = (news) => {
    return news.map((data, index) => {
        return <div key={index} className="card w-full lg:w-96 bg-base-100 shadow-xl">
            <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {data.title}
                </h2>
                <p>{data.description}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-inline">{data.category}</div>
                    <div className="badge badge-outline">{data.author}</div>
                </div>
            </div>
        </div>
    })
}

const DefaultNewsCard = () => {
    return (
        <div>Belum ada berita yang tersedia</div>
    )
}

const NewsList = ({ news }) => {
    return !news ? DefaultNewsCard() : NewsCard(news)
}

export default NewsList