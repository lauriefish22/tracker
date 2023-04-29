// const connection = require('./config/connection');
// const inquirer = require('inquirer');
const express = require('express')
const fs = require('fs')
const mysql = require('mysql2')

const PORT = process.env.PORT || 3001;

const app = express();

//establishing connection to db
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'tracker_db'
    },
    console.log('Connected to tracker_db')
);
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

