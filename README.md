# DC&ES Goals & Concerns High-Touch Forms App

## Prerequisites

1. Postgres
2. Node
3. `npm/yarn`

### For deployment

4. `heroku-cli`

## Install

```zsh
# clone repo and install dependencies
$ cd ~ && mkdir investorsgroup
$ git clone https://github.com/cordea1/igfedm-hightouch.git
$ cd igfedm-hightouch && npm install

# create .env file with BASE_URL config
$ print BASE_URL=http://localhost:8080 > .env

# import latest.dump into postgres `sfgc` database
$ pg_restore --verbose --clean --no-acl --no-owner -h localhost -U <your-username> -d sfgc latest.dump
```

## Implementation

-   Server: ExpressJS, Typescript
-   Client: VueJS, Babel (Implemented through the Nuxt framework)
-   Database: Postgres

## Build Setup

```zsh
# install dependencies
$ npm install

# serve with hot reload at localhost:8080
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static (SPA) project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
