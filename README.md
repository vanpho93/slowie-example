## About

This small project demonstrate how to use `slowie`

## How to start

>In order to run this, you have to have mongodb running in localhost:27017 and PORT 300 being free. You can change database connection and port in `src/index.ts`. I keep no enviroment variables for the simplicity of this example.

```bash
yarn install && yarn start
```

## Features

Three models: `User`, `Country` and `Phone`

For `User`:

* How to use different graphql type in apis
* How to populate country from `user.countryId`
* How to hide country in `create` or `update` apis
* How to show `phone input` when in `create user input`
* Remember to use `User.createIndexes()`
* How to add hooks (see `user.hook.ts`)

For `Country`:

* How to validate `phonePrefix not duplicate`
* How to allow only `ADMIN` to create new `Country`

For `Phone`:

* How to hide default APIs
