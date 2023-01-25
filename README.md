# SvelteKit AWS Cognito Oauth2 Demo App

This barebones demo app will show you how to use cognito user pools for authorization in a SvelteKit app.  This example is only meant to show the cognito-related code.  It does not show interation with your user or session stores.  You will likely want to use a database to manage these, and I highly recommend Prisma for working with your databse within SvelteKit.

## Cognito Set Up

You must have a valid cognito user pool set up.  Once you set up your user pool, add an app to the user pool with the logout and redirect_uri of https://localhost:5173.  This is the vite dev address you will be using. You must update the other settings in the example.env file to match your AWS domain and credentials.  Rename the example.env file to .env.  Note that the client secret does not have the prefix PUBLIC.  Also note that it is imported in the hooks.server.js file from '$env/static/private' instead of '$env/static/public'.  It is very important not to change this.

## Install

pull the git repository and then rum 

```bash
npm install
# to start the dev server in self-signed https mode
npm install -D @vitejs/plugin-basic-ssl
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev -- --https
```

When you see the security warning in the browser, this is normal. The https encrytion is not using a cert signed by a recognized CA. The reason is that you are using the self-signed certificate you installed above. Just click advanced and proceed to site.