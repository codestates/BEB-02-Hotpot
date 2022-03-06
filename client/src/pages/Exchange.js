import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadExchange } from "../actions/index";
import ExchangeNFT from "../components/ExchangeNFT";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Exchange({ web3, account }) {
  const [loadingComplete, isloadingComplete] = useState(false);
  const posts = useSelector((state) => state.exchangeReducer);
  const dispatch = useDispatch();
  const getPostsURL = "http://localhost:8888/exchange/getposts";

  const getPosts = async () => {
    await axios
      .get(getPostsURL)
      .then((res) => {
        dispatch(loadExchange(res.data));
      })
      .then(() => {
        isloadingComplete(true);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div id="exchange-body">
      <h1 id="head-title">Exchange your NFT! </h1>
      <nav id="exchange-nav-container">
        <Link to="/sellnft">
          <button id="sell-nft-button">NFT 판매</button>
        </Link>
        <Link to="/mynfts" style={{ textDecoration: "none" }}>
          <button>My NFT</button>
        </Link>
        <span id="search-wrap">
          <input
            type="text"
            id="nft-search-input"
            placeholder="찾는 NFT를 검색해보세요"
          ></input>
          <SearchIcon
            fontSize="large"
            id="search-button"
            onClick={() => alert("버튼 테스트")}
          ></SearchIcon>
        </span>
      </nav>
      <section className="nft-cards-wrap">
        {posts.posts.map((post, idx) => (
          <ExchangeNFT post={post} key={idx} web3={web3} account={account} />
        ))}
      </section>
    </div>
  );
}
