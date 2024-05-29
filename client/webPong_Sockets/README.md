#  WebPong (Front-End)

###  By C124 Studios

  

This project is a multiplayer gaming application accessible through web browsers, allowing users to interact in a dynamic and competitive environment by connecting through the host's IP. This game is designed to offer an interactive and entertaining experience,

where players can actively participate and spectators can watch and wait their turn to play, encouraging continuous participation and real-time interaction.

#  Architecture

The componentized architecture of the webPong_Sockets application frontend is designed to promote modularity and code reuse. In the src directory, the files App.css and App.jsx contain the styles and main structure of the application, respectively, while `main.
jsx` acts as the initial entry point. The socketManager.js file handles the socket connection logic. The assets, components, and hooks subdirectories are organized to store static resources, reusable components, and custom hooks, respectively. This structure allows clear and efficient code management, facilitating development and maintenance by encapsulating specific functionalities within independent components.

> webPong_Sockets/
└── src/
├── assets/
├── components/
├─ hooks/  
├── socketManager.js
├── App.css
├── App.jsx
└── main.jsx


#  How can I run WebPong?

First of all, you need to install [Node.js](https://nodejs.org/en/download/package-manager/current). This program is essential for running the backend of the application and is only required on the host's device. Node.js provides the runtime environment necessary for executing JavaScript code outside of a web browser, which allows the server-side components of the game to function properly. The app has been tested on v20.11.0 and latest versions.
  

##  Setting up the WebPong Front-End for the first time

  

*IMPORTANT: Set up and run the back-end of the project before following this instructions. You can find a README file into the **server* folder

__

Open a terminal and go to the root project path, then you want to move to client and then its son folder, this way C:\Users\diego\Programacion 3\webPong_Sockets\client\webPong_Sockets> execute this command: npm install, just like this: C:\Users\diego\Programacion 3\webPong_Sockets\client\webPong_Sockets> npm install to install the neccesary packages.

  

You might see a confirmation message to install Vite, you just have to accept it.

  

##  Running the WebPong Front-End

  

Once you have everything installed, you are ready to turn on the back-end, to get to that, you go to the same route (C:\Users\diego\Programacion 3\webPong_Sockets\client\webPong_Sockets>) and type: npm run dev, then execute, you should see something like this:

> webpong-sockets@0.0.0 dev

> vite --host

VITE v5.2.11 ready in 635 ms

➜ Local: http://localhost:5173/

➜ Network: http://[IP]:5173/

➜ press h + enter to show help

  

-  *Local*: refers to the network address that points to the device itself on which the application is running. It is used to access services and resources on the same device without needing to connect through an external network.

-  *Network*: refers to the IP address of the device within a broader network, allowing other devices on the same network to access the application. The network IP address enables communication between different devices connected to the same local area network (LAN) or even across larger networks like the internet.

  

That is everything you need to know to set up and execute the front-end of Web-pong, remember that the same device must run back-end and front-end.

  

Have fun!

  

[GitHub Repository](https://github.com/Steven-Leon-007/webPong_Sockets)

  
Developed with ❤ by C124 Studios