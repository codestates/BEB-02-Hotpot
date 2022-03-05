const exchangeForm = require("../../forms/exchangeForm");

module.exports = {
  registerpost: async (req, res) => {
    const {
      seller,
      seller_address,
      img_url,
      price,
      tokenId,
      nft_name,
      ex_date,
    } = req.body;
    //수정사항! tokenId로 하니까 undefined오류 생김(데이터 타입 문제 혹은 tokenid가 없는 데이터가 있어서라고 추정)
    exchangeForm.findOneAndUpdate(
      { seller: seller, seller_address: seller_address, nft_name: nft_name },
      {
        img_url,
        price,
        tokenId,
        nft_name,
        trade_state: "판매중",
        ex_date,
      },
      { new: true, upsert: true },
      (err) => {
        if (err) res.send(err);
        else res.send({ message: "nft가 등록되었습니다." });
      }
    );
  },
};