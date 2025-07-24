// clinic-backend/database.js

const { Sequelize } = require('sequelize');


const dbName = 'school_clinic_db';
const dbUser = 'root'; 
const dbPass = 'root';
const dbHost = 'localhost';


const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect: 'mysql',
    logging: console.log,
});


const testDbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connection to the database has been established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
        console.error('❌ Please check your database credentials in database.js and ensure your MySQL server is running.');
    }
};


module.exports = { sequelize, testDbConnection };
