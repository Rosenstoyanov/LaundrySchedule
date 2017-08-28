# LaundryApp

Final project for 2016-2017 Advanced JS course at FMI.

## Description

System designed for making reservations on the available laundries

## Servers

Run `node server.js` for a dev server running on `http://localhost:3000/`.  
Run `ng serve` for a app server. Navigate to `http://localhost:4200/`.  
To start cron job open terminal and type: crontab -e  
add new line: 5 * * * * {pathToNode} {pathTo/crons/laundry-ready-cron.js}  

## Cron line description

  5      *        *                *           *  
(min) (hpur) (day of month) (month of year) (weekday)  
* -> all  
1,2,5,7 -> period  
1-10 -> period  
1-10/2 -> period every two  
1 -> exact value  

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Technologies 

Angular 2, Angular CLI, ExpressJS, NodeJS, MongoDB, RxJS, HTML, TypeScript, JavaScript, Mongoose, Jsonwebtoken, Bcrypt, Bootstrap, Angular 2 Bootstrap (Valor Software)

## Deploying to GitHub Pages

Run `ng github-pages:deploy` to deploy to GitHub Pages.
