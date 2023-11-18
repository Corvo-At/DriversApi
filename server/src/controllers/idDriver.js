const axios = require("axios");
require("dotenv").config();
const { DRIVER_URL } = process.env;
const { Driver, Team } = require("../db");

const driveDetailApi = async (id) => {
  try {
    const driverApi = await axios.get(`${DRIVER_URL}/${id}`);
    const driverData = driverApi.data;

    if (!driverData) {
      throw new Error("Driver not found in the API");
    }
    return {
      id: driverData.id,
      name: driverData.name.forename,
      surname: driverData.name.surname,
      description: driverData.description || driverData.url,
      image: driverData.image.url || "https://i.pinimg.com/564x/7a/e1/66/7ae1669348613c43a1299104789a76a7.jpg",
      nationality: driverData.nationality,
      dob: driverData.dob,
      teams: driverData.teams,
      source: "Api",
    };
  } catch (error) {
    console.error("Error in driverDetail:", error);
    return res.status(500).json({
      message: "Internal error when obtaining driver details",
      details: error.message,
    });
  }
};

const driveDetailDB = async (id) => {
  try {
    const driverDB = await Driver.findByPk(id, {
      where: {
        id,
      },
      include: {
        model: Team,
        attributes: ["name"],
      },
    });

    if (!driverDB) {
      throw new Error("Driver not found in the database");
    }
    else {
      return driverDB;
    }
  } catch (error) {
    console.error("Error in driverDetail:", error);
    return res.status(500).json({
      message: "Internal error when obtaining driver details",
      details: error.message,
    });
  }
};

module.exports = { driveDetailApi, driveDetailDB };
