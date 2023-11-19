const { createDriverController } = require ("../controllers/createDriverController")


const createDriverHandler =  async(req,res, err, next)=>{

    console.error(err); // Log del error para propósitos de debugging

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        // Error de JSON malformado
        return res.status(400).send({ error: 'JSON malformado' });
    }

    if (err.message === 'Faltan datos') {
        return res.status(422).send({ error: 'Faltan datos' });
    }

    if (err.message === 'Ya existe ese corredor') {
        return res.status(409).send({ error: 'Ya existe ese corredor' });
    }

    // Manejar otros tipos de errores o enviar una respuesta genérica para errores no manejados
    return res.status(500).send({ error: 'Error interno del servidor' });
}
  
module.exports = createDriverHandler;
