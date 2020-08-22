// Get Stock Price Function

const alpha = require("alphavantage")({
  key: process.env.ALPHA_VANTAGE_KEY,
});

module.exports = async function getPrice(symbol) {
  let stockPrice = alpha.data.quote(symbol).then((res) => {
    let latestPrice = res["Global Quote"]["05. price"];
    let low = res["Global Quote"]["04. low"];
    let high = res["Global Quote"]["03. high"];
    return { latestPrice, high, low };
  });
  return stockPrice;
};
