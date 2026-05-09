const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const app = express();
const schoolRoutes = require("./routes/schoolRoutes");

app.use(cors());
app.use(express.json());
app.use("/api", schoolRoutes);

app.get("/", (req, res) => {
    res.send("School Management API Running");
});

db.getConnection()
    .then(connection => {
        console.log("MySQL Connected Successfully");
        connection.release();
    })
    .catch(err => {
        console.log("Database Connection Failed");
        console.log(err);
    });

const PORT = process.env.PORT || 5000;

const createTable = async () => {
    try {

        await db.execute(`
            CREATE TABLE IF NOT EXISTS schools (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                address VARCHAR(255) NOT NULL,
                latitude FLOAT NOT NULL,
                longitude FLOAT NOT NULL
            )
        `);

        console.log("Schools table ready");

    } catch (error) {
        console.log(error);
    }
};

createTable();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});