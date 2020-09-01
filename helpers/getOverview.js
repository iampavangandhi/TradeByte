// Stock Overview Helper Function

const axios = require("axios");

module.exports = async function getOverview(symbol) {
  let data = await axios
    .get(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_KEY}`
    )
    .then((resp) => ({
      Symbol: resp.data.Symbol,
      AssetType: resp.data.AssetType,
      Name: resp.data.Name,
      Exchange: resp.data.Exchange,
      Currency: resp.data.Currency,
      Country: resp.data.Country,
      weeksHigh: resp.data["52WeekHigh"],
      weeksLow: resp.data["52WeekLow"],
      Desc: resp.data.Description,
      Sector: resp.data.Sector,
      MarketCap: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(resp.data.MarketCapitalization),
      EBITDA: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(resp.data.EBITDA),
      PERatio: resp.data.PERatio,
      PriceToBookRatio: resp.data.PriceToBookRatio,
      EPS: resp.data.EPS,
      DividendYield: resp.data.DividendYield,
      BookValue: resp.data.BookValue,
      ProfitMargin: resp.data.ProfitMargin,
      RevenueTTM: resp.data.RevenueTTM,
    }))
    .catch((err) => {
      console.log(err);
      res.status(500).render("error/500");
    });

  return data;
};
