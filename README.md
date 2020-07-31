# 💸 TradeByte

> ### Stocks Trading Simulation WebApp
> #### TradeByte Project Excel Sheet: [Here](https://docs.google.com/spreadsheets/d/1_vg-F2dk6jWy9jcYlGuKqAnXUX6NwbbnLg9Bmn_Ulrk/edit?usp=sharing)
> #### Checkout TheNodeCourse at [https://github.com/iampavangandhi/TheNodeCourse](https://github.com/iampavangandhi/TheNodeCourse)

## Table of Contents

- [💸 TradeByte](#-tradebyte)
  - [Table of Contents](#table-of-contents)
  - [Build Setup](#build-setup)
  - [Folder Structure](#folder-structure)
  - [Contributing](#contributing)
  - [Contributors](#contributors)
  - [Maintainers](#maintainers)
  - [API Credits](#api-credits)
  - [License](#license)

## Build Setup

Add your [MongoDB URI](https://www.mongodb.com/cloud/atlas), [Google OAuth credentials](console.developers.google.com/) and [Alpha Vantage Keys](https://www.alphavantage.co/) to the config.env file see config.env.example for details.

```bash
# install dependencies
npm install

# run in production
npm start

# run in development
npm run dev
```

## Folder Structure

    .
    ├── 📁 .github                 # Github files (don't change)
    ├── 📁 config                  # Config files
    ├── 📁 helpers                 # EJS helper files
    ├── 📁 middleware              # Expresss middlewares
    ├── 📁 models                  # Mongoose models
    ├── 📁 public                  # Public folder
    │    ├── 📁 css
    │    └── 📁 javascript
    ├── 📁 routes                  # Express routes
    │    └── 📁 api
    └── 📁 views                   # EJS views
         ├── 📁 error
         ├── 📁 layouts
         └── 📁 partials

## Contributing

Feel free to dive in! [Open an issue](https://github.com/iampavangandhi/TradeByte/issues/new) or submit PRs.

See the [CONTRIBUTING.md](CONTRIBUTING.md) for details. Kindly follow the [Code Of Conduct](CODE_OF_CONDUCT.md).

## Contributors

This project exists thanks to all the people who contribute.

[![Contributors](https://readme-contributors.now.sh/iampavangandhi/tradebyte?extension=jpg&width=300&avatarSize=25)](https://github.com/iampavangandhi/TradeByte/graphs/contributors)

## Maintainers

This repo is maintained by [Pavan Gandhi](https://github.con/iampavangandhi).

<img style="border-radius = 50%" src="https://avatars3.githubusercontent.com/u/42767012?s=460&v=4" width=75/>

## API Credits

[Alpha Vantage](https://www.alphavantage.co/)

## License

[MIT](LICENSE) © Pavan Gandhi
