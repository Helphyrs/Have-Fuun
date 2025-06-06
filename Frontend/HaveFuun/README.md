# HaveFuun

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

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

## Utilisation des routes 

Toutes les routes ont une utilisation précises, identifiable par le nom :
    - adminRoad, traitent toutes les routes qui sont géré par les administrateurs ;
    - articleRoad, traitent toutes les routes qui sont en lien avec les articles ;
    - etc

L'architecture, est un modèle MVC, le back gère, le MC, Model/Controller, et le V pour Views est géré par le front via Angular 

L'architecture est segmentée, avant de passer aux controllers dans les routes, les middlewares adaptés vont être enclenchés pour faire la vérification,
ou traiter certains éléments en amont (sanitization, multer, etc)

BDD : MYSQL / BACK : Express Nodejs / FRONT : Angular

Il faut charger les fixtures par la commande : 
    - cd Backend/Fixtures
    - ts-node ./loadFixtures.js
    - cd ../../ (=> afin de revenir à la racine)

Pour supprimer les fixtures, ou tout simplement réinitialisé la BDD de cette table (sans toucher aux roles)
    - cd Backend/Fixtures
    - ts-node ./removeFixtures.js
    - cd ../../ (=> afin de revenir à la racine)