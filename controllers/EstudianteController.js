const Estudiante = require('../models/estudiante');

let getEstudiantes = (req, res) => {
    Estudiante.find({}, (err, estudiantes) => {
        if (err) {
            res.status(500).send({
                message: `Error ${err}`
            })
        }
        if (!estudiantes) {
            res.status(404).send({
                message: 'No existen estudiantes'
            })
        }
        res.status(200).send({
            estudiantes
        })
        // res.render('lestudiante', { estudiantes })

    })
}
let getEstudiante = async (req, res) => {
    const estudiante = await Estudiante.findById(req.params.id);
    res.json(estudiante);
}

let newEstudiante = async (req, res) => {
    const estudiante=new Estudiante(req.body);
    await estudiante.save();
    res.json({
        status:'Estudiante guardado'
    })
}
let deleteEstudiante = (req, res) => {
    let { id } = req.params.id;
    Estudiante.findById(id, (err, estudiante) => {
        if (err) {
            res.status(500).send({
                message: `Error ${err}`
            })
        }
        Estudiante.deleteOne(err => {
            if (err) {
                res.status(500).send({
                    message: `Error en el server ${err}`
                })
            }
            else{
                res.status(200).send({
                    message:'El estudiante ha sido eliminado con exito'
                })
            }
        })
    })

};

let updateEstudiante = (req, res) => {
    let { id } = req.params;
    let update = req.body;
    Estudiante.findByIdAndUpdate(id, update, { new: true }, (err, estudianteUpdated) => {
        if (err) {
            res.status(500).json({
                ok: false,
                message: `Error al actualizar el estudiante ${err}`
            })
        }
        res.status(200).json({
            estudiante:estudianteUpdated
        })
        // res.render('r_estudiante', { estudiante: estudianteUpdated })
    })
}

module.exports = {
    getEstudiantes,
    getEstudiante,
    newEstudiante,
    deleteEstudiante,
    updateEstudiante
}