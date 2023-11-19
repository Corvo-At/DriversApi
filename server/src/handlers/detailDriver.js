const { driveDetailDB} = require("../controllers/idDriver")

const driverDetail = async (req, res) =>{
    try {
        const {id} = req.params;
 

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