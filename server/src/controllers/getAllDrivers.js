const axios = require("axios");
require("dotenv").config();
const { DRIVER_URL } = process.env;
const { Driver, Team } = require("../db");

// Función para crear un nuevo driver en la base de datos
const createDriverInDB = async (newDriver) => {
  try {
    const createdDriver = await Driver.create({
      id: newDriver.id,
      name: newDriver.name.substring(0, 3000), // Limitar a 500 caracteres
      description: newDriver.description ? newDriver.description.substring(0, 3000) : null, // Limitar a 1000 caracteres
      image: newDriver.image.substring(0, 3000),
      nationality: newDriver.nationality.substring(0, 500), // Limitar a 500 caracteres
      dob: newDriver.dob,
    });
    console.log("createdDriver", createdDriver);

    logDriverCreationResult(createdDriver, newDriver);

    return createdDriver;
  } catch (error) {
    console.error(`Failed to create driver ${newDriver.name}: ${error.message}`);
    return null;
  }
};
//Función para imprimir mensajes de éxito o error al crear un driver
const logDriverCreationResult = (createdDriver, newDriver) => {
  if (createdDriver) {
    console.log(`Driver ${createdDriver.name} created successfully`);
  } else {
    console.log(`Failed to create driver ${newDriver.name}`);
  }
};

// Controlador principal
const driverData = async () => {
  try {
    const driverApi = await axios.get(DRIVER_URL);

    const apiDriverData = driverApi.data.map((driver) => ({
      id: driver.id,
      name:  `${driver.name && driver.name.forename ? driver.name.forename : ''} ${driver.name && driver.name.surname ? driver.name.surname : ''}`.substring(0, 3000),
      description: driver.description || driver.url,
      image: driver.image.url || "https://i.pinimg.com/564x/7a/e1/66/7ae1669348613c43a1299104789a76a7.jpg".substring(0, 3000),
      nationality: driver.nationality,
      dob: driver.dob,
      teams: driver.teams,
      source: "API",
    }));
    console.log("apiDriverData",apiDriverData);
    const driverDB = await Driver.findAll({
      include: Team,
    });
    
    const dbDriverData = driverDB.map((driver) => ({
      id: driver.id,
      name:  driver.name,
      description: driver.description,
      image: driver.image.substring(0, 3000),
      nationality: driver.nationality,
      dob: driver.dob,
      source: 'DB',
    }
    )
    );
    //console.log("driver de create driver", dbDriverData);
    
    const existingDriverIds = dbDriverData.map(driver => driver.id);
    
    const newDrivers = apiDriverData.filter(apiDriver => 
      !existingDriverIds.includes(apiDriver.id)
    );

    for (const newDriver of newDrivers) {
      try {
        const createdDriver = await createDriverInDB(newDriver);
        logDriverCreationResult(createdDriver, newDriver);
      } catch (error) {
        console.error(`Failed to create driver ${newDriver.name}: ${error.message}`);
        // Puedes decidir si deseas continuar con la iteración o detenerte completamente según tus necesidades.
      }
    }

    const result = [...dbDriverData, ...apiDriverData];

    return result;
  } catch (error) {
    console.error("Internal error when obtaining driver data:", error.message);
    return [];
  }
};

module.exports = {
  driverData,
};
