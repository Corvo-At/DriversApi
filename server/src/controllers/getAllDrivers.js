const axios = require("axios");
require("dotenv").config();
const { DRIVER_URL } = process.env;
const { Driver, Team } = require("../db");

const driverData = async (req, res) => {
  try {
    const driverApi = await axios.get(`${DRIVER_URL}`);

 

    const  apiDriverData = driverApi.data.map((driver) => {
      return {
        id: driver.id,
        name: driver.name.forename,
        surname: driver.name.surname,
        description: driver.description || driver.url,
        image: driver.image.url || "https://i.pinimg.com/564x/7a/e1/66/7ae1669348613c43a1299104789a76a7.jpg",
        nationality: driver.nationality,
        dob: driver.dob,
        teams: driver.teams,
        source: "API",
      };
    });

    

    const driverDB = await Driver.findAll({
      include: Team,
    })

    const dbDriverData = driverDB.map((driver) => ({
      id: driver.id,
      name: driver.name,
      surname: driver.surname,
      description: driver.description,
      image: driver.image,
      nationality: driver.nationality,
      dob: driver.dob,
      source: 'DB', 
    }));

    
    const result = [...apiDriverData, ...dbDriverData]

    if (result.length === 0) {
      res.status(404).send([]);
      return;
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Internal error when obtaining driver data",
      details: error.message,
    });
  }
};

module.exports = {
  driverData,
};
