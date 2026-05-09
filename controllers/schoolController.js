const db = require("../config/db");

const addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

       

        const query = `
            INSERT INTO schools (name, address, latitude, longitude)
            VALUES (?, ?, ?, ?)
        `;

        const [result] = await db.execute(query, [
            name,
            address,
            latitude,
            longitude
        ]);

        res.status(201).json({
            success: true,
            message: "School added successfully",
            schoolId: result.insertId
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = degree => degree * (Math.PI / 180);

    const R = 6371;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

const listSchools = async (req, res) => {
    try {

        const { latitude, longitude } = req.query;

        
       
        // Fetch schools
        const [schools] = await db.execute(
            "SELECT * FROM schools"
        );

        
        const schoolsWithDistance = schools.map(school => {

            const distance = calculateDistance(
                parseFloat(latitude),
                parseFloat(longitude),
                school.latitude,
                school.longitude
            );

            return {
                ...school,
                distance: distance.toFixed(2)
            };
        });

        
        schoolsWithDistance.sort(
            (a, b) => a.distance - b.distance
        );

        res.status(200).json({
            success: true,
            count: schoolsWithDistance.length,
            schools: schoolsWithDistance
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    addSchool,
    listSchools
};