

const { Driver } = require("../db");
const axios = require('axios');

const URL = "http://localhost:5000/drivers";

const { Op } = require("sequelize");

const getDriverByName = async (name) => {
    name = name.charAt(0).toUpperCase() + name.slice(1);

    let drivers = [];

    try {
        // Búsqueda en la base de datos
        const dbDrivers = await Driver.findAll({ 
            where: {
              [Op.or]: [
                  { 'name': name },
                  
              ]}
        });

        drivers = dbDrivers;

        // Búsqueda en la API
        const response = await axios.get(`http://localhost:5000/drivers?name.forename=${name}`);
        const apiData = response.data;

        const apiDrivers = apiData.filter(driver =>  driver.name.forename === name || driver.name.surname === name);

        
        drivers = drivers.concat(apiDrivers);

        // Limitar la respuesta a 15 elementos
        const limitedDrivers = drivers.slice(0, 15);

         // Concatenar forename y surname en la propiedad name
         limitedDrivers.forEach(driver => {
          if (driver.name) {
              driver.name = `${driver.name.forename} ${driver.name.surname}`;
          }
      });

        return limitedDrivers;
    } catch (error) {
        throw error; // Propagar el error para que sea manejado por el manejador
    }
};

module.exports = getDriverByName;
