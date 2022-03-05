import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import HotNFTAbi from "../HotNFTAbi";

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
  img {
    height: inherit;
    width: inherit;
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
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const InputBox = styled.input`
  margin-right: -4rem;
  width: 100px;
  background: #f9f9f9;
  position: relative;
  top: 50%;
  text-align: center;
  padding-left: 15px;
  font-size: 1.5rem;
  height: 2rem;
  transform: translateY(-50%);
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

export default function SellNFT({ nft, web3 }) {
  const account = useSelector((state) => state.accountReducer);
  const [price, setPrice] = useState();
  const recordTxURL = "http://localhost:8888/recordTx";
  const registerpostURL = "http://localhost:8888/exchange/registerpost";


  const sellNFT = async () => {
    const NFTaddr = "0xCc1108f7c353e5d12DfdeD369ec21C46570afd6D";
    const contract = await new web3.eth.Contract(HotNFTAbi, NFTaddr);
    await contract.methods
      .approve("0x78bbc7331640d03fe0287d6aa8a623a0edc4daa4", `${nft.tokenId}`)
      .send({ from: account.account.address }, (err, txhash) => {
        try {
          axios.post(recordTxURL, { hash: txhash, type: "sellNFT", tokenId: nft.tokenId })
            .then((res) => {
              console.log(res.data);
            })
            .catch((e) => console.log(e));
        } catch (e) {
          console.log(e);
        }
      });

    if (price) {
      await axios
        .post(registerpostURL, {
          seller: account.account.username,
          seller_address: account.account.address,
          img_url: nft.tokenURI,
          price: price,
          tokenId: nft.tokenId,
          nft_name: `${nft.symbol} #${nft.tokenId}`,
          //일단 3일로
          ex_date: function () {
            let today = new Date();
            let date = new Date(today.setDate(today.getDate() + 3))
              .toISOString()
              .split("T")[0];
            let time = new Date().toTimeString().split(" ")[0];
            return date + " " + time;
          },
        })
        .then((res) => {
          alert(res.data.message);
        })
        .catch((e) => console.log(e));
    } else alert("가격을 입력해주세요");
  };

  const onChangePrice = (e) => {
    setPrice(e.target.value);
  };

  return (
    <Body>
      <Thumbnail>
        <img src={nft.tokenURI} alt={`${nft.symbol} #${nft.tokenId}`} />
      </Thumbnail>
      <NFTInfo>
        <NFTTitle>
          {nft.symbol} #{nft.tokenId}
        </NFTTitle>
        <NFTName>{nft.name}</NFTName>
      </NFTInfo>
      <NFTPriceText> Price</NFTPriceText>
      <InputBox
        type="number"
        value={price}
        onChange={onChangePrice}
        placeholder="0"
      />
      <SellBtn onClick={sellNFT}> 판매 </SellBtn>
    </Body>
  );
}