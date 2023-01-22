
One of two suggested ways to setup a Web React app:
https://www.tutorialspoint.com/reactjs/reactjs_environment_setup.htm

npx create-react-app avestan-client
sudo npm install -g npm@9.3.0

cd avestan-client

npm install axios

Add to package.json: "proxy": "http://localhost:8081",

Original dependencies:

  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.2.2",
    "material-table": "^2.0.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },

cd src

edit App.js & App.css

How to consume REST APIs in React
https://www.freecodecamp.org/news/how-to-consume-rest-apis-in-react/

npm start &

Browser:
http://44.224.225.167:3000/

