<div align="center">

# <img src="public/images/TradeByte-Favicon.png" alt="logo" width="30"/> **TradeByte**

## Stocks Trading Simulation WebApp

![Stars](https://img.shields.io/github/stars/iampavangandhi/TradeByte?color=2948ff&label=Stars&style=flat-square) ![Forks](https://img.shields.io/github/forks/iampavangandhi/TradeByte?color=2948ff&label=Forks&style=flat-square) ![Contributors](https://img.shields.io/github/contributors/iampavangandhi/TradeByte?color=2948ff&label=Contributors&style=flat-square) ![Issues](https://img.shields.io/github/issues/iampavangandhi/TradeByte?color=2948ff&label=Issues&style=flat-square) ![Pull Requests](https://img.shields.io/github/issues-pr/iampavangandhi/TradeByte?color=2948ff&label=Pull%20Requests&style=flat-square)

![License](https://img.shields.io/github/license/iampavangandhi/TradeByte?color=2948ff&label=License&style=flat-square) ![Language](https://img.shields.io/github/languages/top/iampavangandhi/TradeByte?color=2948ff&label=Language&style=flat-square) ![Lines of Code](https://img.shields.io/tokei/lines/github/iampavangandhi/TradeByte?label=Lines%20of%20Code&style=flat-square) ![Version](https://img.shields.io/github/package-json/v/iampavangandhi/TradeByte?color=2948ff&label=Version&style=flat-square) ![Deployment](https://img.shields.io/github/deployments/iampavangandhi/TradeByte/tradebyte?color=2948ff&label=Deployment&style=flat-square) ![Repo Size](https://img.shields.io/github/repo-size/iampavangandhi/TradeByte?color=2948ff&label=Repo%20Size&style=flat-square)

## Website : https://tradebyte.herokuapp.com/

[![Project Board](https://img.shields.io/badge/-Project%20Board-0e76a8?style=for-the-badge&logo=Github&logoColor=white)](https://github.com/iampavangandhi/TradeByte/projects/1) [![Project Wiki](https://img.shields.io/badge/-Project%20Wiki-283c86?style=for-the-badge&logo=wikipedia&logoColor=white)](https://github.com/iampavangandhi/TradeByte/wiki) [![Project Report](https://img.shields.io/badge/-Project%20Report-3b5998?style=for-the-badge&logo=google-sheets&logoColor=white)](https://docs.google.com/spreadsheets/d/1_vg-F2dk6jWy9jcYlGuKqAnXUX6NwbbnLg9Bmn_Ulrk/edit?usp=sharing) [![TheNodeCourse](https://img.shields.io/badge/-TheNodeCourse-11998e?style=for-the-badge&logo=node.js&logoColor=white)](https://github.com/iampavangandhi/TheNodeCourse)

</div>

---

## Table of Contents

- [**TradeByte**](#img-srcpublicimagestradebyte-faviconpng-width30-tradebyte)
  - [Tech Stack](#tech-stack)
  - [Config Setup](#config-setup)
  - [Build Setup](#build-setup)
  - [Folder Structure](#folder-structure)
  - [Contributing](#contributing)
  - [Contributors](#contributors)
  - [Maintainers](#maintainers)
  - [API Credits](#api-credits)
  - [License](#license)

## Tech Stack

<code><img height="38" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" alt="javascript"></code>
<code><img height="38" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png" alt="nodejs"></code>
<code><img height="37" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/npm/npm.png" alt="npm"></code>
<code><img height="40" src="https://devicons.github.io/devicon/devicon.git/icons/express/express-original.svg" alt="express"></code>
<code><img height="39" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTTzPAw-55ssm1Im594xYZ9eRQu2JylrkYLg&usqp=CAU" alt="mongodb"></code>
<code><img height="40" src="https://cdn.icon-icons.com/icons2/2148/PNG/512/ejs_icon_132422.png" alt="ejs"></code>
<code><img height="40" src="https://ph-files.imgix.net/108b5bdd-db00-4050-8a20-675ddfc5d99a?auto=format" alt="tailwind-css"></code>
<code><img height="41" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/google/google.png" alt="google"></code>
<code><img height="41" src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png" alt="gmail"></code>
<code><img height="39" src="https://cdn.glitch.com/project-avatar/0d184ee3-fd8d-4b94-acf4-b4e686e57375.png?2016-11-21T13:18:58.896Z" alt="passport"></code>
<code><img height="39" src="https://cdn.iconscout.com/icon/free/png-256/stripe-2-498440.png" alt="stripe"></code>
<code><img height="38" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSCjjrUqDfgOQsyoil76OpCKOnnpmEu71jHFQ&usqp=CAU" alt="heroku"></code>

## Config Setup

#### Add following keys into the `config.env` file. These all are free to use keys.

- [MongoDB URI](https://www.mongodb.com/cloud/atlas)
- [Alpha Vantage Keys](https://www.alphavantage.co/)
- [Google OAuth Credentials](console.developers.google.com/)
- [GMAIL API Credentials](https://www.woolha.com/tutorials/node-js-send-email-using-gmail-with-nodemailer-oauth-2)
- [Stripe Payment Gateway Keys](https://stripe.com/)

#### Make sure to use the same `config.env` format given below.

```bash
PORT = XXXX
MONGO_URI = XXXX
ALPHA_VANTAGE_KEY = XXXX

GOOGLE_CLIENT_ID = XXXX
GOOGLE_CLIENT_SECRET = XXXX

GMAIL_ADDRESS = XXXX
GMAIL_OAUTH_CLIENT_ID = XXXX
GMAIL_OAUTH_CLIENT_SECRET = XXXX
GMAIL_OAUTH_REFRESH_TOKEN = XXXX
GMAIL_OAUTH_ACCESS_TOKEN = XXXX
GMAIL_OAUTH_TOKEN_EXPIRE = XXXX

PK_TEST = XXXX
SK_TEST = XXXX

```

## Build Setup

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
    ├── 📁 config                  # Configuration files
    ├── 📁 helpers                 # Helper or Controller files
    ├── 📁 middleware              # Express middleware
    ├── 📁 models                  # Mongoose models
    ├── 📁 project-plan            # Project planning files
    │   └── 📁 ui-designs
    ├── 📁 public                  # Public folder
    │    ├── 📁 css
    │    ├── 📁 images
    │    └── 📁 javascript
    ├── 📁 routes                  # Express routes
    │    └── 📁 api
    └── 📁 views                   # EJS views
         ├── 📁 error
         ├── 📁 layouts
         └── 📁 partials

## Project Plan

![Project Plan](project-plan/TradeByte.jpg)

## Contributing

Feel free to dive in! [Open an issue](https://github.com/iampavangandhi/TradeByte/issues/new) or submit PRs.

See the [CONTRIBUTING.md](CONTRIBUTING.md) for details. Kindly follow the [Code Of Conduct](CODE_OF_CONDUCT.md)

## Contributors

This project exists thanks to all the people who contribute.

[![Contributors](https://readme-contributors.now.sh/iampavangandhi/tradebyte?extension=jpg&width=300&avatarSize=25)](https://github.com/iampavangandhi/TradeByte/graphs/contributors)

## Maintainers

<a href="https://github.con/iampavangandhi"><img src="https://avatars3.githubusercontent.com/u/42767012?s=460&v=4" alt="Pavan Gandhi" width=75/></a>

#### This repo is maintained by [Pavan Gandhi](https://github.con/iampavangandhi).

## API Credits

<img height="40" src="https://miro.medium.com/max/512/1*UCZCB7Vx3EJ9FN-pen4BqQ.png" alt="alpha-vantage">

### [Alpha Vantage](https://www.alphavantage.co/)

## License

[MIT](LICENSE) © Pavan Gandhi

---

<div align="center">

### Show some ❤️ by starring the repository!

</div>
