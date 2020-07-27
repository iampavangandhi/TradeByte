# 💸 TradeByte

> ### Stocks Trading Simulation WebApp

## Table of Contents

- [💸 TradeByte](#-tradebyte)
  - [Table of Contents](#table-of-contents)
  - [Build Setup](#build-setup)
  - [Folder Structure](#folder-structure)
  - [Contributing](#contributing)
  - [Contributors](#contributors)
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
    ├── 📁 config                  # Config files
    ├── 📁 helpers                 # EJS Helper files
    ├── 📁 middleware              # Expresss middlewares
    ├── 📁 models                  # Mongoose Models
    ├── 📁 public                  # Public
    │    ├── 📁 css
    │    └── 📁 javascript
    ├── 📁 routes                  # Express routes
    │    └── 📁 api
    └── 📁 views                   # EJS views
         ├── 📁 layouts
         └── 📁 partials

## Contributing

Feel free to dive in! [Open an issue](https://github.com/iampavangandhi/TradeByte/issues/new) or submit PRs.

## Contributors

This project exists thanks to all the people who contribute.

[![Contributors](https://readme-contributors.now.sh/iampavangandhi/tradebyte?extension=jpg&width=300&avatarSize=25)](https://github.com/iampavangandhi/TradeByte/graphs/contributors)

## License

[MIT](LICENSE) © Pavan Gandhi
