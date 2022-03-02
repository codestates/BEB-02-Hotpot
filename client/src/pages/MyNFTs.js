import React, { useState } from "react";
import erc721Abi from "../erc721Abi";

function MyNFTs({ web3, account }) {
  const [NFTlist, setNFTlist] = useState([]);
  //트랜잭션 해쉬값 하드코딩함 -> 입력으로 바꾸거나 hotpot 에서 배포할 컨트랙트 주소 입력
  let NFTaddr = "0xc8118d1957e87df5a14b11355611546d3e5f01ca";
  const findNFTs = async () => {
    const tokenContract = await new web3.eth.Contract(erc721Abi, NFTaddr, {
      from: account,
    });
    const name = await tokenContract.methods.name().call();
    const symbol = await tokenContract.methods.symbol().call();
    const totalSupply = await tokenContract.methods.totalSupply().call();

    let arr = [];
    for (let i = 1; i <= totalSupply; i++) {
      arr.push(i);
    }

    for (let tokenId of arr) {
      let tokenOwner = await tokenContract.methods.ownerOf(tokenId).call();
      if (String(tokenOwner).toLowerCase() === account) {
        let tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
        setNFTlist((prevState) => {
          return [...prevState, { name, symbol, tokenId, tokenURI }];
        });
      }
    }
  };
  return (
    <div className="NFTs">
      <button className="findbtn" onClick={findNFTs}>
        My NFTs
      </button>
      <div className="NFTlist">
        {NFTlist.map((token) => {
          return (
            <div className="NFTtoken">
              <div className="name">Name: {token.name}</div>
              {/* <span className="symbol">{token.symbol}</span>) */}
              {/* <div className="nft">id: {token.tokenId}</div> */}
              <img src={token.tokenURI} width={300} alt="NFTimg" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyNFTs;
