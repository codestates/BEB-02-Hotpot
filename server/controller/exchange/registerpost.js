const exchangeForm = require("../../forms/exchangeForm");

module.exports = {
    registerpost: async (req, res) => {
        const { seller, seller_address, img_url, price, nft_name, tokenId, ex_date } = req.body;

        exchangeForm.findOne({ tokenId: tokenId }, (err, nft) => {
            if (nft) {
                res.send({ message: "이미 등록된 NFT입니다." })
            } else {
                const newPost = new exchangeForm({
                    seller,
                    seller_address,
                    img_url,
                    price,
                    nft_name,
                    tokenId,
                    ex_date,
                })

                newPost.save((err) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send({ message: "nft가 등록되었습니다." })
                    }
                })
            }
        })


    }
}