# Disney Plus One<br />A Project for Plus One Robotics

This project uses the GraphQL API available at [https://api.disneyapi.dev/graphql](https://api.disneyapi.dev/graphql)
to allow the user to view basic information about various Disney characters, as well as to keep track of who those
favorite characters might be.

## Tech Stack

This project uses [React](https://reactjs.org/) for the frontend and [Vite](https://vitejs.dev/) for the build
compiler. In addition to these are the following:

- [Material UI](https://mui.com/) - A fully-featured React component library used for easy and concise styling.
- [Apollo](https://www.apollographql.com/docs/) - Used for interacting with the GraphQL backend.
- [React-Router-Dom](https://www.npmjs.com/package/react-router-dom) - Used for routing different pages in this single-page application.
- [Vite](https://vitejs.dev/) - For an awesome development experience with HMR et all (including building).
- [Yarn](https://yarnpkg.com/) - For installing packages and dependencies.

## Running the Project

To get this project running, first clone the repo:

```sh
# The normie way:
git clone https://github.com/sk3p7ic/disney-plus-one.git
# Or using ssh:
git clone git@github.com:sk3p7ic/disney-plus-one.git
```

Then install the dependencies:

```sh
yarn install
```

If everything installs correctly, you should now be able to run the development server with:

```sh
yarn dev
```

## ...Haven't You Made a Project for Plus One Already?

This project has had to be made after the API for my previous project,
[sk3p7ic/spacex-plus-one](https://github.com/sk3p7ic/spacex-plus-one) was taken down.
I'd considered attempting to host the previous API myself or to create my own, but I learned that the API that was
previously called was also going to be taken down soon--and that was the one I was going to use! Therefore, I made
this project instead so that I'd at least have something to turn in.
