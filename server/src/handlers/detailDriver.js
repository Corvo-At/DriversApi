const {driveDetailApi, driveDetailDB} = require("../controllers/idDriver")

const driverDetail = async (req, res) =>{
    try {
        const {id} = req.params;

        if(isNaN(Number(id))) return res.status(404).send("Driver not found" );

        const detailApi = await driveDetailApi(id)

        if(detailApi) return res.status(200).json(detailApi);
            else{
                res.status(404).send("Driver not found in detail api")
            } 

        const detailDB = await driveDetailDB(id)

        if(detailDB) return res.status(200).json(detailDB)
        else{
             res.status(404).send("Driver not found in detail database")
        } 
    } catch (error) {

        console.error("Error in driverDetail:", error);
        return res.status(500).json({
          message: "Internal error when obtaining driver details",
          details: error.message,
        });
    }
}


module.exports = {
    driverDetail
}