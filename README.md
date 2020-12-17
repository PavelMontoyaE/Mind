# Mind

## Getting started

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