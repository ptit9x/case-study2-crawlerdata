<div align="center">
  <a href="https://github.com/posquit0/koa-rest-api-boilerplate" title="Koa REST API Boilerplate">
    <img alt="Koa REST API Boilerplate" src="http://crocodillon.com/images/blog/2015/asynchronous-callbacks-in-koa--twitter.png" width="240px" />
  </a>
  <br />
  <h1>Koa REST API Boilerplate</h1>
</div>

<br />

**Koa REST API Boilerplate** is a highly opinionated boilerplate template for building RESTful API application with Koa.

This boilerplate include the following features:

- Log rotation and log management using [Bunyan](https://github.com/trentm/node-bunyan)
- A super small and optimized [Docker](https://www.docker.com/) image based on Alpine image
- [Swagger](https://swagger.io/) API documentation based on JSDoc
- Continuous integration and delivery using [CircleCI](https://circleci.com/)
- Unit Test and Integration Test along with Test Coverage using [Jest](https://facebook.github.io/jest/) testing framework

---


## Getting Started

```zsh
$ git clone https://github.com/posquit0/koa-rest-api-boilerplate your-project-name
$ cd your-project-name
$ rm -rf .git && git init
```

```zsh
$ yarn
$ yarn start
```


## Commands

### Run

```zsh
# Run normally
$ yarn start
# Run the application with nodemon for development
$ yarn dev
```

### Test

```zsh
# Test
$ yarn test                           # Run all test
$ yarn test:unit                      # Run only unit test
$ yarn test:integration               # Run only integration test
# Test (Watch Mode for development)
$ yarn test:watch                     # Run all test with watch mode
$ yarn test:watch:unit                # Run only unit test with watch mode
$ yarn test:watch:integration         # Run only integration test with watch mode
# Test Coverage
$ yarn test:coverage                  # Calculate the coverage of all test
$ yarn test:coverage:unit             # Calculate the coverage of unit test
$ yarn test:coverage:integration      # Calculate the coverage of integration test
# Test consistent coding style (Lint)
$ yarn lint                           # Lint all sourcecode
$ yarn lint:app                       # Lint app sourcecode
$ yarn lint:test                      # Lint test sourcecode
```

### Archive

```zsh
$ yarn pack
```


## Contributing

This project follows the [**Contributor Covenant**](http://contributor-covenant.org/version/1/4/) Code of Conduct.

#### Bug Reports & Feature Requests

Please use the [issue tracker](https://github.com/posquit0/koa-rest-api-boilerplate/issues) to report any bugs or ask feature requests.


## Contact

If you have any questions, feel free to join me at [`#posquit0` on Freenode](irc://irc.freenode.net/posquit0) and ask away. Click [here](https://kiwiirc.com/client/irc.freenode.net/posquit0) to connect.


## License

Provided under the terms of the [MIT License](https://github.com/posquit0/koa-rest-api-boilerplate/blob/master/LICENSE).

Copyright © 2018, [Byungjin Park](http://www.posquit0.com).
