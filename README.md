# Chedah
Master Status: [![CircleCI](https://circleci.com/gh/jamesmart77/chedah.svg?style=svg)](https://circleci.com/gh/jamesmart77/chedah)

Is the fear of having to overlook your expenses and budgets preventing you from starting a side hustle? Does the word budgeting make you uncomfortable? If there was a way you could just overlook your finances vs. spending time on tracking them, would you go out and start a side gig?

## Lucky for you, there is Chedah!

Chedah aims to focus on the "Gig Economy" by allowing users to link their business accounts to a user-friendly dashboard. Users can track everything from their monthly expesnes to their own persoanl business goals. Chedah takes the burden of tracking expenses, so that users can focus on what really matters, making CHEDAH

## Starting the app locally

Start by installing front and backend dependencies. While in this directory, run the following commands:

```
yarn install
cd client
yarn install
cd ..
```

After both installations complete, run the following command in your terminal:

```
yarn start
```

That's it, your app should be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

## Setting up Mongo


1. Install `node-mongo-seeds` globally:

    ```
    npm install -g node-mongo-seeds
    ```

2. Run the seed command:

    ```
    seed
    ```

## Deployment (Heroku)

After confirming that you have an up to date git repository and a Heroku app created, complete the following:

1. Build the React app for production by running the following command:

```
yarn build
```

2. Add and commit all changes to git

3. Push to Heroku

If all previous steps were followed correctly, your application should be deployed to Heroku!
