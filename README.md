# Mind

## Getting started

Before all, you need to have Docker Compose and Sequelize installed.

For Docker Compose this is the guide: https://docs.docker.com/compose/install/

To install Sequelize first you need `npm`.

Here is the link to install on any OS: https://www.npmjs.com/get-npm

Then install Sequelize with the command

```
$ npm i sequelize -g
```

## Running the project

For getting up all the projects run

```
$ docker-compose up -d --build
```

## Seeding the database

Change the terminal location to the Api files

```
$ cd api/src
```

Then run the Sequelize command for seeding

```
$ sequelize db:seed:all
```