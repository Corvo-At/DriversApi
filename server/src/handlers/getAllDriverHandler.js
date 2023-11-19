const {driverData} = require("../controllers/getAllDrivers")



const getAllDriversHandler = async (req, res) => {
    try {
      const result = await driverData();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        details: error.message,
      });
    }
  }
 

 
module.exports = {
    getAllDriversHandler
}