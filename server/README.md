#  WebPong (Back-End)

###  By C124 Studios

  

This project is a multiplayer gaming application accessible through web browsers, allowing users to interact in a dynamic and competitive environment by connecting through the host's IP. This game is designed to offer an interactive and entertaining experience, where players can actively participate and spectators can watch and wait their turn to play, encouraging continuous participation and real-time interaction.


#  Architecture
The webPong_Sockets backend architecture is organized by layers, which consist of various layers essential for its operation. At the root of the directory is the app.js file, which acts as the entry point of the backend, in addition, there are several folders that structure the code in a modular way: models stores the data definitions and model structures; services includes the business logic and services that interact with the models, utils contains utilities and support functions that facilitate various operations; and controllers sends and receives data to frontend. This layered organization allows for a clear separation of responsibilities, facilitating project maintenance and scalability.

>webPong_Sockets/
└── server/
    ├── models/
    ├── services/
    ├── utils/
    ├── controllers/
    ├── README.md 
    └── app.js


#  How can I run WebPong?

First of all, you need to install [Node.js](https://nodejs.org/en/download/package-manager/current). This program is essential for running the backend of the application and is only required on the host's device. Node.js provides the runtime environment necessary for executing JavaScript code outside of a web browser, which allows the server-side components of the game to function properly. The app has been tested on v20.11.0 and latest versions.

  
  

##  Setting up the WebPong Back-End for the first time

  

Open a terminal and go to the root project path, then you want to execute this command: npm install, just like this: C:\Users\diego\Programacion 3\webPong_Sockets> npm install to install the neccesary packages.
You might see a confirmation message to install Vite, you just have to accept it.

  

##  Running the WebPong Back-End

  

Once you have everything installed, you are ready to turn on the back-end, to get to that, you go to the same route (C:\Users\diego\Programacion 3\webPong_Sockets>) and type: npm run dev, then execute, you should see something like this:

>\> webpong_sockets@1.0.0 dev
>\> nodemon server/app.js --ignore client
[nodemon] 3.1.0
[nodemon] to restart at any time, enter 'rs'
[nodemon] watching path(s): .
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting 'node server/app.js'

  

That is everything you need to know to set up and execute the back-end of Web-pong, remember that the same device must run back-end and front-end, you are going to find a README file with that purpose on client folder.

  

Have fun!
  

[GitHub Repository](https://github.com/Steven-Leon-007/webPong_Sockets)

  

Developed with ❤ by C124 Studios