const express = require('express');

const app = express();

const myProcess = process.env.NODE_ENV;

console.log(myProcess.PORT);