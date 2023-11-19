// const {createDbTeam} = require("../controllers/createDbTeam")

// const createTeamHandler = async (req, res) =>{
//     try {

//        // if(isNaN(Number())) return res.status(404).send("Driver not found" );

//         const detailApi = await createDbTeam()

//         if(detailApi) return res.status(200).json(detailApi);
//             else{
//                 res.status(404).send("Driver not found in detail api")
//             } 

//         const detailDB = await createDbTeam()

//         if(detailDB) return res.status(200).json(detailDB)
//         else{
//              res.status(404).send("Driver not found in detail database")
//         } 
//     } catch (error) {

//         console.error("Error in driverDetail:", error);
//         return res.status(500).json({
//           message: "Internal error when obtaining driver details",
//           details: error.message,
//         });
//     }
// }


// module.exports = {
//     createTeamHandler
// }



const { createTeamDb, getAllTeamsControllerDb} = require ("../controllers/createDbTeam")



const getAllTeamsHandlerDb = async (req, res) => {

    try {
      const reponse = await getAllTeamsControllerDb();
      res.status(200).json(reponse);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Team not found ' });
    }
  };
  const createTeamHandler =  async(req,res) =>{

    const { id, name,  } = req.body

    //console.log("query en handler",id,name);
    try {
        const newTeam  = await createTeamDb(id, name )
        res.status(200).json(newTeam )
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
  



module.exports = {createTeamHandler, getAllTeamsHandlerDb}

