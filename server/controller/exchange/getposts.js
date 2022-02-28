const exchangeForm = require("../../forms/exchangeForm");

module.exports = {
    getposts: async (req, res) => {
        exchangeForm.find((err, posts) => {
            res.send(posts);
        });
    }
}