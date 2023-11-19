const { Driver, Team } = require('./../db');
const axios = require('axios');
const { Op } = require("sequelize");

const URL = "http://localhost:5000/drivers";

const createDriverController = async (req, res, next) => {
    console.log("soy contoller ");
    try {
        const { name, description, image, nationality, dob, teams } = req.body;
        
        console.log("Solicitud recibida con los siguientes datos:");
        console.log("Nombre:", name);
        console.log("Descripción:", description);
        console.log("Imagen:", image);
        console.log("Nacionalidad:", nationality);
        console.log("Fecha de nacimiento:", dob);
        console.log("Equipos:", teams);

        if (!name || !description || !image || !nationality || !dob) {
            throw new Error("Faltan datos");
        }

        const dbDriver = await Driver.findAll({
            where: {
                [Op.and]: [
                    { name: name}
                ]
            }
        });

        const response = await axios.get(URL);
        const data = response.data;

        const apiDriver = data.filter(
            driver =>
                driver.name.forename === forename &&
                driver.name.surname === surname
        );

        if (dbDriver.length === 0 && apiDriver.length === 0) {
            const newDriver = await Driver.create({
                name,
                description,
                image,
                nationality,
                dob,
            });

            for (const team of teams) {
                const dbTeam = await Team.findAll({
                    where: {
                        name: {
                            [Op.like]: team
                        }
                    }
                });

                if (dbTeam.length > 0) {
                    await newDriver.addTeam(dbTeam, { through: 'DriverTeams' });
                }
            }

            res.send(newDriver);
        } else {
            throw new Error("Ya existe ese corredor");
        }
    } catch (error) {
        next(error); // Lanza el error al manejador centralizado
    }
};

module.exports = createDriverController;
