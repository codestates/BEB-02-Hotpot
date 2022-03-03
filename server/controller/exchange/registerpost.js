const exchangeForm = require("../../forms/exchangeForm");

module.exports = {
    registerpost: async (req, res) => {
        const { seller, seller_address, img_url, price, nft_name, ex_date } = req.body;
        const nft = new exchangeForm({
            seller,
            seller_address,
            img_url,
            price,
            trade_state: "거래중",
            nft_name,
            ex_date,
        })

        nft.save((err) => {
            if (err) {
                res.send(err);
            } else {
                res.send({ message: "nft가 등록되었습니다." })
            }
        })
    }
}