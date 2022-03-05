import styled from "styled-components";
import { useSelector } from 'react-redux';
import { erc20Abi, erc20Addr } from '../erc20Contract';
import axios from 'axios';

const ExchangeNFT = ({ web3, post }) => {
    const accountState = useSelector((state) => state.accountReducer);

    const buyNFT = async () => {
        const contract = new web3.eth.Contract(erc20Abi, erc20Addr);
        const toAddress = post.seller_address;
        const amount = post.price * Math.pow(10, 18);
        const recordTxURL = "http://localhost:8888/recordTx";

        if (accountState.isLogin) {
            const fromAddress = accountState.account.address;
            const balance = contract.methods.balanceOf(fromAddress).call()
                .then((bal) => {
                    if (amount >= Number(bal)) {
                        alert("잔액이 부족합니다.")
                    } else {
                        const result = contract.methods.transfer(toAddress, String(amount)).send(
                            { from: fromAddress, gasPrice: 2352340696, gas: 60000 },
                            (err, txhash) => {
                                try {
                                    axios.post(recordTxURL, { hash: txhash, type: "buyNFT", tokenId: post.tokenId })
                                        .then((res) => {
                                            console.log(res.data);
                                        })
                                        .catch((e) => console.log(e));
                                } catch (e) {
                                    console.log(e);
                                }
                            }
                        )
                    }
                });

        } else {
            alert("로그인을 해주세요.")
        }

    }

    const Container = styled.div`
    width: calc(25% - 44px);
    margin-right: 44px;
    margin-bottom: 56px;
    cursor: pointer;
    `;

    const NFTImg = styled.div`
    width: 100%;
    padding-top: 100%;
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    background-color: #f8f9fa;
    box-shadow: inset 0px 0px 0px 1px rgb(0 0 0 / 15%);
    box-sizing: border-box;
    img {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        box-sizing: border-box;
        border-radius: 12px;
        border: 1px solid transparent;
    }
    `;

    const DESC = styled.div`
    `;

    const Title = styled.h2`
    `;
    const Price = styled.div`
    `;
    const Seller = styled.div`
    `;
    const State = styled.div`
    `;

    return (
        <Container onClick={() => buyNFT()}>
            <NFTImg>
                <img alt="nft_img" src={post.img_url} />
            </NFTImg>
            <DESC>
                <Title> {post.nft_name}</Title >
                <Price className="nft-price " >
                    ♦️ {post.price}
                </Price >
                <Seller className="nft-seller-name" >
                    {post.seller}
                </Seller >
                <State className="nft-state" >
                    {post.trade_state}
                </State >
            </DESC >
        </Container >
    );
}
export default ExchangeNFT;

/*
.nft-cards-wrap .nft-container {
  width: calc(25% - 44px);
  margin-right: 44px;
  margin-bottom: 56px;
}

.nft-img {
  width: 100%;
  padding-top: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background-color: #f8f9fa;
  box-shadow: inset 0px 0px 0px 1px rgb(0 0 0 / 15%);
  box-sizing: border-box;
}

.nft-img img {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  border-radius: 12px;
  border: 1px solid transparent;
}
*/