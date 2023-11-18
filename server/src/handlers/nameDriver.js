const { nameDriverApi, nameDriverDB } = require("../controllers/nameDriver");

const driverDetailByName = async (req, res) => {
  try {
    const { name } = req.query;
    console.log("Name", name);

    if (!name) {
      return res.status(400).json({ message: "Name parameter is required" });
    }

    const apiDriverDetail = await nameDriverApi(name);
    const DBDriverDetail = await nameDriverDB(name);

    const result = [...apiDriverDetail, ...DBDriverDetail].slice(0, 15);

    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "No drivers found with the specified name" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in getDriverDetailsByName:", error);
    return {
      message: "Internal error when obtaining driver details",
      details: error.message,
    };
  }
};
module.exports = {
  driverDetailByName,
};
