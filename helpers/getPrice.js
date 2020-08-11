// Get Stock Price Function

const alpha = require("alphavantage")({
  key: process.env.ALPHA_VANTAGE_KEY,
});

module.exports = async function getPrice(symbol) {
  let stockPrice = alpha.data.quote(symbol).then((res) => {
    let price = res["Global Quote"]["05. price"];
    return price;
  });
  return stockPrice;
};
