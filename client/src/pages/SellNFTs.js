import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadMyNFTs } from "../actions/index";
import styled from "styled-components";
import HotNFTAbi from "../HotNFTAbi";
import SellNFT from "../components/SellNFT";

const SellNFTs = ({ web3 }) => {
  // 일단은 컨트랙트 하드코딩한거 나중에 변경될수도
  const NFTaddr = "0xCc1108f7c353e5d12DfdeD369ec21C46570afd6D";
  const account = useSelector((state) => state.accountReducer);
  const nfts = useSelector((state) => state.myNFTReducer);
  const [isLoading, setisLoading] = useState(true);
  const dispatch = useDispatch();

  const findNFTs = async () => {
    const tokenContract = await new web3.eth.Contract(HotNFTAbi, NFTaddr, {
      from: account.account.address,
    });
    const name = await tokenContract.methods.name().call();
    const symbol = await tokenContract.methods.symbol().call();
    const totalSupply = await tokenContract.methods.totalSupply().call();

    let arr = [];
    for (let i = 1; i <= totalSupply; i++) {
      arr.push(i);
    }
    const nfts = [];

    for (let tokenId of arr) {
      let tokenOwner = await tokenContract.methods.ownerOf(tokenId).call();
      if (
        String(tokenOwner).toLowerCase() ===
        String(account.account.address).toLowerCase()
      ) {
        let tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
        const nft = {
          tokenContract,
          name,
          symbol,
          tokenId,
          tokenURI,
        };
        nfts.push(nft);
      }
    }
    dispatch(loadMyNFTs(nfts)).then(setisLoading(false));
  };

  useEffect(() => {
    dispatch(loadMyNFTs([]));
    findNFTs();
  }, []);

  return (
    <Container>
      <Body>
        <Title>Sell your NFT!</Title>
        <Wrapper>
          {isLoading ? (
            <NFTListText>Loading...</NFTListText>
          ) : nfts.nfts.length === 0 ? (
            <NFTListText>보유한 nft가 없습니다.</NFTListText>
          ) : (
            <NFTList>
              {nfts.nfts.map((nft, idx) => {
                return <SellNFT key={idx} nft={nft} web3={web3} />;
              })}
            </NFTList>
          )}
        </Wrapper>
      </Body>
    </Container>
  );
};

const Container = styled.div`
  display: table;
  margin: 0 auto;
  width: 100%;
  height: calc(100vh - 4rem);
`;

const Body = styled.div`
  background-color: #bc9eff0e;
  padding: 5rem;
  display: table-cell;
  width: 100%;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  padding-bottom: 1rem;
  margin: 0.5rem;
`;

const Wrapper = styled.div`
  display: flex;
`;

const NFTListText = styled.div`
  text-align: center;
  padding: 10rem;
  font-size: 1.3rem;
  font-weight: 800;
  color: #4000c7;
  width: 800px;
  display: inline-block;
`;

const NFTList = styled.div`
  flex: 1 1 auto;
  margin: 1rem;
`;

export default SellNFTs;
