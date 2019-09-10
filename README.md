# Gisting

Loose clone of [GitHub Gist](https://gist.github.com), based on requirements for an interview take-home assignment.

## Requirements

* Ruby 2.5.1
* Node / Yarn
* Docker / `docker-compose` (if you want to run postgres via docker)

## Quick Start

1. Clone the repo
2. `bundle install` and `yarn install` to install dependencies
3. Copy the `.env.example` file to `.env` or `.env.development` and update the values as necessary
4. `docker-compose up -d` launches postgres in a docker container in the background
5. `bundle exec rake db:setup` will create the db, load the schema, and seed the db with examples from this codebase
6. `./bin/webpack-dev-server` starts the webpack dev server for hot reloading, etc.
7. `bundle exec rails s` starts the rails server
8. Visit [http://localhost:3000/](http://localhost:3000/)
