# DC&ES Goals & Concerns High-Touch Forms App

## Prerequisites

1. Postgres
2. Node
3. SSL on localhost
4. `npm/yarn`

### For deployment

`heroku-cli` should be installed in order to deploy to heroku.

## Install

1. Install Postgres
    - Note: if you set a password for postgres, you'll need to set the DATABASE_URL environment variable correctly
2. Install TablePlus (UI for Postgres)
    - Setup a connection
    - Create a database named 'sfgc' (name must be an exact match for now...)
    - On the terminal, use: `psql sfgc < sfgc.dump` to import the current database dump
4. Open KeyChain, upload localhost-ssl/rootCA.pem to certificates and set it to 'Always Trust'
5. Setup your .env file
    - Make sure application is running on HTTPS and port 8443
6. Use yarn to install the packages
    - `yarn install`
7. Use either npm or yarn to run the application
    - `npm run dev`, `yarn run dev`

## Running the app
Once the app is running locally, go to `https://na85.lightning.force.com`, set it to a mobile device view (tablet will do) in order to trigger SF1 rendering. Choose `High Touch - Local` on the left side panel and once you see the app you can close SF and work with `https://localhost:8443` for the remainder of the session. If you need to reauthenticate, use `https://na85.lightning.force.com` again.

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

## Caveats
* X-Frame-Options header cannot be set to ALLOW FROM because Chrome and Firefox don't support it.
* Authentication will fail if the user has an invalid session id in Salesforce. This is sometimes caused by the user being logged by a third party app.
