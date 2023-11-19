// const axios = require('axios');
// const { Team } = require('./../db');

// const URL = "http://localhost:5000/drivers";

// const createDbTeam = async (_, res) => {
//     try {
//         const dbTeams = await Team.findAll();

//         if (dbTeams.length > 0) {
//             res.json(dbTeams);
//             return;
//         }

//         const response = await axios.get(URL);
//         const apiDrivers = response.data.filter(driver => driver.hasOwnProperty("teams"));

//         if (!apiDrivers || apiDrivers.length === 0) {
//             res.json([]); // No hay equipos disponibles en la API
//             return;
//         }

//         const allTeams = [];

//         apiDrivers.forEach(driver => {
//             const driverTeams = driver.teams.split(",").map(team => team.trim());
//             allTeams.push(...driverTeams);
//         });

//         const uniqueTeams = Array.from(new Set(allTeams));

//         // Crear los equipos en la base de datos
//         await Promise.all(uniqueTeams.map(async team => {
//             await Team.create({ name: team });
//         }));

//         res.json(uniqueTeams);
//     } catch (error) {
//         res.status(500).send({ error: error.message });
//     }
// };

// module.exports = createDbTeam;

// controlador
const { Team } = require("../db");
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const createTeamDb = async () => {
    try {
        const response = await axios.get('http://localhost:5000/drivers');
        const driversExternos = response.data;

        const equiposCreados = [];

        for (const driverExterno of driversExternos) {
            const { id, name, teams } = driverExterno;

            // Convertir el ID a UUID si es un entero
            const equipoId = typeof id === 'number' ? uuidv4() : id;

            // Dividir la cadena de equipos en un array
            const equipos = typeof teams === 'string' ? teams.split(',').map(team => team.trim()) : [];
            console.log(`Procesando conductor ${name.forename} ${name.surname} (ID: ${id})`);

            // Crear los equipos y manejar duplicados
            for (const equipoNombre of equipos) {
                try {
                    const [equipo, created] = await Team.findOrCreate({
                        where: { name: equipoNombre },
                        defaults: { id: equipoId }
                    });

                    if (created) {
                        console.log("Nuevo equipo creado:", equipo.name);
                        equiposCreados.push(equipo);
                    } else {
                        console.log(`Equipo con nombre ${equipoNombre} ya existe en la base de datos. Evitando duplicado.`);
                    }
                } catch (error) {
                    console.error('Error al crear el equipo:', error.message);
                    // Manejar el error según sea necesario
                }
            }
        }

        return equiposCreados;
    } catch (error) {
        console.error('Error al obtener y guardar equipos desde la API externa:', error.message);
        throw error;
    }
};

const getAllTeamsControllerDb = async () => {
    const allTeams = await Team.findAll();
    return allTeams;
};

module.exports = { createTeamDb, getAllTeamsControllerDb };
