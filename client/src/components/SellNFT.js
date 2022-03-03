import { Title } from '@mui/icons-material';
import { useState } from 'react'
import styled from "styled-components";

export default function SellNFT({ nft }) {
    const [price, setPrice] = useState(0);

    const sellNFT = (tokenId) => {
        //TODO
    }

    const onChangePrice = (e) => {
        setPrice(e.target.value);
    }

    const Body = styled.li`
    padding: 0.5rem;
    margin-bottom: 1rem;
    width: 100%;
    height: 170px;
    list-style-type: none;
    background: #ffffff;
    border: solid rgb(238, 238, 238) 0.2rem;
    display: flex;
    max-width: 800px;
    min-width: 500px;
    `;

    const Thumbnail = styled.div`
    margin: 10px;
    width: 130px;
    height: 130px;
    img{
        height:inherit;
        width:inherit;
        object-fit: cover;
    }
    `;

    const NFTInfo = styled.div`
    margin-left: 1rem;
    padding: 10px;
    flex: 1 0 auto;
    margin-top: 30px;
    `;

    const NFTTitle = styled.div`
    font-style: normal;
    font-weight: bold;
    font-size: 1.2rem;
    line-height: 2;
    color: #000000;
    `;

    const NFTName = styled.div`
    font-style: normal;
    font-size: 1rem;
    line-height: 1.2;
    color: #000000;
    `;

    const NFTPriceText = styled.span`
    display:flex;
    align-items: center;
    margin-right: 10px;
    `;

    const SellBtn = styled.button`
    width: 60px;
    height: 35px;
    padding: 6px 12px;
    color: #fff;
    background-color: #8977ad;
    border-radius: 5px;
    font-size: 13px;
    `;

    return (
        <Body>
            <Thumbnail>
                <img src={nft.tokenURI} alt={`${nft.symbol} #${nft.tokenId}`} />
            </Thumbnail>
            <NFTInfo>
                <NFTTitle>
                    {nft.symbol} #{nft.tokenId}
                </NFTTitle>
                <NFTName>
                    {nft.name}
                </NFTName>
            </NFTInfo>
            <NFTPriceText> Price</NFTPriceText>
            <input
                id="price-inputbox"
                type="number">
            </input>
            <SellBtn onClick={sellNFT}> 판매 </SellBtn>
        </Body>
    )
}