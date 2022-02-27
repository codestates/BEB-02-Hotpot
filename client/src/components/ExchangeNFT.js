const ExchangeNFT = ({ post }) => {
    { console.log(post) }
    return (
        <div className='nft-container'>
            <div className="nft-img ">
                <img alt="nft_img" src={post.img_url} />
            </div>
            <div className="nft-desc" >
                <h2 className="nft-title" > {post.nft_name}</h2 >
                <div className="nft-price " >
                    ♦️ {post.price}
                </div >
                <div className="nft-seller-name" >
                    {post.seller}
                </div >
                <div className="nft-state" >
                    {post.trade_state}
                </div >
            </div >
        </div >
    );
}
export default ExchangeNFT;
