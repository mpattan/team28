# Steps to run our project:
1) Clone our project
2) Navigate to the downloaded folder in cmd/terminal
3) Execute metMuseum.py file
4) Open another terminal tab/window in same directory, and run the following commands:
    a) ssh -i "team28.pem" ec2-user@ec2-54-189-62-129.us-west-2.compute.amazonaws.com
    b) cd opt
    c) cd fuseki
    d) cd apache-jena-fuseki-4.6.1/
    e) ./fuseki-server --mem /art
5) go to : http://ec2-54-189-62-129.us-west-2.compute.amazonaws.com:3030/#/dataset/art/query and upload all the ontology files
6) go to https://ser531-team28.web.app and use our application
7) example value for art name : Two-and-a-half-dollar Liberty Head Coin
8) example value for artist name : Christian Gobrecht


# FrontEnd

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
