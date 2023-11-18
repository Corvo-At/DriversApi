const axios = require("axios");
require("dotenv").config();
const { DRIVER_URL } = process.env;
const { Driver, Team } = require("../db");

const nameDriverApi = async (name) => {
  try {
    const driverApi = await axios.get(`${DRIVER_URL}?name.forename=${name}`);
    const driverData = driverApi.data;

    if (!driverData) {
      throw new Error("Driver not found in the API");
    }

    return {
      id: driverData.id,
      name: driverData.name.forename,
      surname: driverData.name.surname,
      description: driverData.description || driverData.url,
      image:
        driverData.image.url ||
        "https://i.pinimg.com/564x/7a/e1/66/7ae1669348613c43a1299104789a76a7.jpg",
      nationality: driverData.nationality,
      dob: driverData.dob,
      teams: driverData.teams,
      source: "Api",
    };
  } catch (error) {
    console.error("Error in driverDetail:", error);
    return {
      message: "Internal error when obtaining driver details",
      details: error.message,
    };
  }
};

const nameDriverDB = async (name) => {
  try {
    const driverDB = await Driver.findAll({
      where: {
        name: {
            [Op.like]: `%${name}%`,
        }
      },
      include: Team,
      limit: 15,
    });

    if (!driverDB) {
      throw new Error("Driver not found in the database");
    }

    return {
      id: driverDB.id,
      name: driverDB.name,
      surname: driverDB.surname,
      description: driverDB.description,
      image:
        driverDB.image ||
        "https://i.pinimg.com/564x/7a/e1/66/7ae1669348613c43a1299104789a76a7.jpg",
      nationality: driverDB.nationality,
      dob: driverDB.dob,
      teams: driverDB.Teams.map((team) => team.name), // Asegúrate de tener la relación correctamente definida en tu modelo
      source: "DB",
    };
  } catch (error) {
    console.error("Error in driverDetail:", error);
    return {
      message: "Internal error when obtaining driver details",
      details: error.message,
    };
  }
};

module.exports = {
  nameDriverApi,
  nameDriverDB,
};
