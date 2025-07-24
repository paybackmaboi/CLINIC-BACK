// clinic-backend/server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize, testDbConnection } = require('./database');
const allRoutes = require('./routes'); // Imports the main router from routes/index.js

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middleware ---
app.use(cors({ origin: 'http://localhost:3000' })); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- API Routes ---
// Mount the main router on the /api path
app.use('/api', allRoutes);

// =================================================================
// DATABASE SYNC AND SERVER START
// =================================================================

const startServer = async () => {
    await testDbConnection();
    // {force: true} will drop all tables and recreate them.
    await sequelize.sync({ force: true }); 
    console.log("✅ All models were synchronized successfully.");

    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
};

startServer();
