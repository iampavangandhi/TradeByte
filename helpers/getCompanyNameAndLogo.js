// Get Stock Company symbol Function

const axios = require("axios");

module.exports = async function getCompanyNameAndLogo(symbol) {
  let data = await axios
    .get(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_KEY}`
    )
    .then(async (resp) => {
      let companyName = resp.data.Name;
      let logoSrc = await axios
        .get(
          `https://autocomplete.clearbit.com/v1/companies/suggest?query=:${
            companyName.split(" ")[0]
          }`
        )
        .then((resp) => resp.data[0].logo)
        .catch((err) => console.log(err));
      return { companyName, logoSrc };
    })
    .catch((err) => {
      console.log(err);
    });

  return data;
};
