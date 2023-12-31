const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Driver", {

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(3000),
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING(3000),
      allowNull: true,
    },

    image: {
      type: DataTypes.STRING(3000),
      defaultValue:"https://i.pinimg.com/564x/dd/ff/b3/ddffb39c11dbd5bf1c9b4af76537d5e0.jpg",
      validate: {
           isUrl: true
      },  
    },

    nationality: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },

    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    timestamps: false,
    
  });
};
